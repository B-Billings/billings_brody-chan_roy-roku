export default {
  name: 'SongDetails',
  template: `
  <section id="song-details">
  <div v-if="loading">Loading...</div>
  <h1 id="song-details-header">{{ song.title }}</h1>
  <div v-if="song.images && song.images.coverart">
    <img  id="album-cover" :src="song.images.coverart" alt="Cover Art">
  </div>
  <div id="song-info-area">
  <p v-if="song.subtitle">{{ song.subtitle }}</p>
  <p>{{ song.description }}</p>
  <p v-if="song.genres && Object.keys(song.genres).length > 0">
    <strong>Genre:</strong> {{ Object.values(song.genres).join(', ') }}
    </div>
    <div id="share-button-area">
    <button class="button-share-songs" @click="openInShazam" v-if="song.url">Open in Shazam</button>
    <br>
    <button class="button-share-songs" @click="shareOnTwitter">Share on Twitter</button>
    <button class="button-share-songs" @click="shareOnFacebook">Share on Facebook</button>
    <button class="button-share-songs" @click="shareViaEmail">Share via Email</button>
    </div>
  </p>
</section>

  `,
  data() {
      return {
        song: {},
        loading: true 
      };
    },
    created() {
      const songId = this.$route.params.songId;
      const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': 'd96c2efd5dmshb6a4098c111443fp11eb83jsndd8be69bc701',
          'X-RapidAPI-Host': 'shazam.p.rapidapi.com'
        }
      };
  
      fetch(`https://shazam.p.rapidapi.com/songs/get-details?key=${songId}`, options)
      .then(response => response.json())
      .then(response => {
        this.song = response;
        this.loading = false; 
      })
      .catch(err => {
        console.error(err);
        this.loading = false; 
      });
  },

    methods: {
      openInShazam() {
        if (this.song.url) {
          window.open(this.song.url);
        }
      },
      shareOnTwitter() {

        const { text, twitter } = this.song.share;
  

        const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(twitter)}`;
  

        window.open(shareUrl, '_blank');
      },
      shareOnFacebook() {

        const { href } = this.song.share;
  

        const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(href)}`;
  

        window.open(shareUrl, '_blank');
      },
      shareViaEmail() {

        const { subject, text, href } = this.song.share;
  

        const emailBody = `I used Shazam to discover ${subject} by ${text}. Check it out: ${href}`;
        const emailSubject = `Discovering ${subject} on Shazam`;
 
        const mailtoUrl = `mailto:?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

        window.location.href = mailtoUrl;
      }
    }
  };
      


      
    
