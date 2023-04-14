export default {
  name: 'TheKidsHomePageComponent',

  data() {
    return {
      searchQuery: '',
      allMovies: [], // Store all movies data
    }
  },

  template: `
  <div>
    <h1>This is the kids homepage</h1>
    <input v-model="searchQuery" @input="filterMovies" placeholder="Search for movies">
    <section id="kidscontent">
      <div id="movieList">
        <div v-for="movie in filteredMovies" :key="movie.id" @click="viewMovie(movie.title)">
          <h2>{{ movie.title }}</h2>
          <img :src="movie.image" alt="Movie Image">
          <p>Released: {{ movie.releaseDate }}</p>
          <p>Rating: {{ movie.imDbRating }}</p>
          <p>Content Rating: {{ movie.contentRating }}</p>
        </div>
      </div>
    </section>
  </div>
  `,

  computed: {
    filteredMovies() {
      // Filter movies based on the search query
      return this.allMovies.filter(movie => movie.title.toLowerCase().includes(this.searchQuery.toLowerCase()));
    }
  },

  created() {
    fetch("https://imdb-api.com/API/AdvancedSearch/k_qgp7806t?title_type=feature&certificates=us:PG")
      .then(response => response.json())
      .then(data => {
        this.allMovies = data.results; // Store all movies data
      })
      .catch(error => {
        console.log(error);
      });
  },

  methods: {
    filterMovies() {
      // No need to make additional API requests, as we can filter the movies data locally using computed property
    },
    viewMovie(movieTitle) {
      // Navigate to a new route for displaying more information about the clicked movie
      this.$router.push({ name: 'MovieDetails', params: { title: movieTitle } });
    }
  }
}
