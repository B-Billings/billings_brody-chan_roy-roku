export default{
    name: 'TheHomePageMusicComponent',

    template: `
    <section id="home-page-box" class="adults-background">
    <h1>This is the default Music homepage</h1>
    <div id="adult-nav">
      <ul>
        <li>
        <router-link to="/home"> <i class="fas fa-film"></i> MOVIES </router-link>
        <router-link to="/homemusic"> <i class="fas fa-music"></i> MUSIC </router-link>
        </li>
      </ul>
  </div>
  <div id="kids-songs-list">
  <h3 class="songs-list-title">Adult Songs</h3>
  <input v-model="searchQuery" class="search-input" placeholder="Search by song name and artist name">
  <ul class="song-grid">
    <li v-if="loading" class="loading-text">Loading...</li>
    <li v-for="song in filteredSongs" :key="song.key" @click="navigateToSongDetails(song.key, song.title)" class="song-item">
      <img v-if="song.images && song.images.coverart" :src="song.images.coverart" alt="Cover Art" class="cover-art">
      <div class="song-details">
        <p class="song-title">{{ song.title }}</p>
        <p v-if="song.subtitle" class="subtitle">{{ song.subtitle }}</p>
      </div>
    </li>
  </ul>
</div>
</section>
    `,
    data() {
      return {
        songs: [],
        loading: true,
        searchQuery: ''
      };
    },
    computed: {
      filteredSongs() {
      
        return this.songs.filter(song => 
          song.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          (song.subtitle && song.subtitle.toLowerCase().includes(this.searchQuery.toLowerCase()))
        );
      }
    },
    created() {
      const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': 'd96c2efd5dmshb6a4098c111443fp11eb83jsndd8be69bc701',
          'X-RapidAPI-Host': 'shazam.p.rapidapi.com'
        }
      };
  
      fetch('https://shazam.p.rapidapi.com/charts/track?listId=ip-country-chart-US&pageSize=20&startFrom=0', options)
        .then(response => response.json())
        .then(response => {
          this.songs = response.tracks;
          this.loading = false; 
        })
        .catch(err => {
          console.error(err);
          this.loading = false;
        });
    },
    methods: {
      navigateToSongDetails(songId, title) {
        this.$router.push({ name: 'SongDetails', params: { songId, title } });
      }
    }
  };