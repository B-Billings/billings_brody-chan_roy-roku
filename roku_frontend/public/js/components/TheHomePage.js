export default {

    name: 'TheHomePageComponent',
  
    data() {
      return {
        searchQuery: '',
        genreFilter: '', 
        releaseYearFilter: '', 
        allMovies: [], 
      }
    },
  
    template: `
    <section id="adult-video-area" class="adults-background">
    <div id="adult-nav">
      <ul>
        <li>
        <router-link to="/home"> <i class="fas fa-film"></i> MOVIES </router-link>
        <router-link to="/homemusic"> <i class="fas fa-music"></i> MUSIC </router-link>
        </li>
      </ul>
  </div>
  <section id="filter-area">
  <input v-model="searchQuery" @input="filterMovies" placeholder="Search for movies">
  <select v-model="genreFilter" @change="filterMovies">
    <option value="">All Genres</option>
    <option v-for="genre in getUniqueGenres" :value="genre">{{ genre }}</option>
  </select>
  <select v-model="releaseYearFilter" @change="filterMovies">
    <option value="">All Years</option>
    <option v-for="year in getUniqueReleaseYears" :value="year">{{ year }}</option>
  </select>
  </section>
  <section id="aldutcontent">
    <div id="movieList">
      <div v-for="movie in filteredMovies" :key="movie.id" @click="viewMovie(movie.title)">
        <h2>{{ movie.title }}</h2>
        <img :src="movie.image" alt="Movie Image">
        <p>Released: {{ movie.description }}</p>
        <p>Rating: {{ movie.imDbRating }}</p>
      </div>
  </section>
  </section>
    `,
  
    computed: {
      filteredMovies() {
      
        return this.allMovies.filter(movie =>
          movie.title.toLowerCase().includes(this.searchQuery.toLowerCase()) &&
          (this.genreFilter === '' || movie.genres.toLowerCase().includes(this.genreFilter.toLowerCase())) &&
          (this.releaseYearFilter === '' || movie.description.toLowerCase().includes(this.releaseYearFilter.toLowerCase()))
        );
      },
  
      getUniqueGenres() {

        const genres = new Set();
        this.allMovies.forEach(movie => {
          movie.genres.split(',').forEach(genre => {
            genres.add(genre.trim());
          });
        });
        return Array.from(genres);
      },
  
      getUniqueReleaseYears() {
       
        const years = new Set();
        this.allMovies.forEach(movie => {
          years.add(movie.description);
        });
        return Array.from(years).sort();
      }
    },
    created() {
      fetch("https://imdb-api.com/API/AdvancedSearch/k_mdq0yq5j?groups=top_100")
        .then(response => response.json())
        .then(data => {
          this.allMovies = data.results; 
        })
        .catch(error => {
          console.log(error);
        });
    },
  
    methods: {
      viewMovie(movieTitle) {
        
        this.$router.push({ name: 'MovieDetails', params: { title: movieTitle } });
      }
    }
  }
  