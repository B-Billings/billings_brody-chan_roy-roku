export default {
  name: 'TheKidsHomePageComponent',

  data() {
    return {
      searchQuery: '',
      genreFilter: '', // Store the selected genre filter
      releaseYearFilter: '', // Store the selected release year filter
      allMovies: [], // Store all movies data
    }
  },

  template: `
  <div>
    <h1>This is the kids homepage</h1>
    <input v-model="searchQuery" @input="filterMovies" placeholder="Search for movies">
    <select v-model="genreFilter" @change="filterMovies">
      <option value="">All Genres</option>
      <option v-for="genre in getUniqueGenres" :value="genre">{{ genre }}</option>
    </select>
    <select v-model="releaseYearFilter" @change="filterMovies">
      <option value="">All Years</option>
      <option v-for="year in getUniqueReleaseYears" :value="year">{{ year }}</option>
    </select>
    <section id="kidscontent">
      <div id="movieList">
        <div v-for="movie in filteredMovies" :key="movie.id" @click="viewMovie(movie.title)">
          <h2>{{ movie.title }}</h2>
          <img :src="movie.image" alt="Movie Image">
          <p>Released: {{ movie.description }}</p>
          <p>Rating: {{ movie.imDbRating }}</p>
        </div>
      </div>
    </section>
  </div>
  `,

  computed: {
    filteredMovies() {
      // Filter movies based on the search query, genre filter, and release year filter
      return this.allMovies.filter(movie =>
        movie.title.toLowerCase().includes(this.searchQuery.toLowerCase()) &&
        (this.genreFilter === '' || movie.genres.toLowerCase().includes(this.genreFilter.toLowerCase())) &&
        (this.releaseYearFilter === '' || movie.description.toLowerCase().includes(this.releaseYearFilter.toLowerCase()))
      );
    },

    getUniqueGenres() {
      // Get unique genres from all movies data
      const genres = new Set();
      this.allMovies.forEach(movie => {
        movie.genres.split(',').forEach(genre => {
          genres.add(genre.trim());
        });
      });
      return Array.from(genres);
    },

    getUniqueReleaseYears() {
      // Get unique release years from all movies data and sort in ascending order
      const years = new Set();
      this.allMovies.forEach(movie => {
        years.add(movie.description);
      });
      return Array.from(years).sort();
    }
  },

  created() {
    fetch("https://imdb-api.com/API/AdvancedSearch/k_mdq0yq5j?certificates=us:PG")
      .then(response => response.json())
      .then(data => {
        this.allMovies = data.results; // Store all movies data
      })
      .catch(error => {
        console.log(error);
      });
  },

  methods: {
    viewMovie(movieTitle) {
      // Navigate to a new route for displaying more information about the clicked movie
      this.$router.push({ name: 'MovieDetails', params: { title: movieTitle } });
    }
  }
}
