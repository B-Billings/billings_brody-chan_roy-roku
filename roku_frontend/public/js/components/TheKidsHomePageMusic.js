export default {
  name: 'TheKidsHomePageMusicComponent',

  template: `
  <section id="page-topper"  class="kids-background">
  <div id="topper-header">
    <h1>This is the kids homepage</h1>
    <h2>This is the default Music homepage</h2>
  </div>
  <div>
    <nav id="routes-onpage-videos">
      <ul>
        <li>
          <router-link to="/kidshome"> <i class="fas fa-home"></i> HOME </router-link>
          <router-link to="/kidshomevideo"> <i class="fas fa-film"></i> MOVIES </router-link>
        </li>
      </ul>
    </nav>
  </div>
  <div id="kids-songs-list">
  <h3 class="songs-list-title">Kids Songs</h3>
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
      // Filter songs based on search query and subtitle
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

    fetch('https://shazam.p.rapidapi.com/charts/track?listId=ip-country-chart-JP&pageSize=20&startFrom=0', options)
      .then(response => response.json())
      .then(response => {
        this.songs = response.tracks;
        this.loading = false; // Set loading state to false after data is fetched
      })
      .catch(err => {
        console.error(err);
        this.loading = false; // Set loading state to false in case of error
      });
  },
  methods: {
    navigateToSongDetails(songId, title) {
      this.$router.push({ name: 'SongDetails', params: { songId, title } });
    }
  }
};
