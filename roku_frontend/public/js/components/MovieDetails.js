export default {
  name: 'MovieDetails',
  data() {
    return {
      movie: null, // Store movie data
    }
  },
  template: `
    <div v-if="movie">
      <h1>{{ movie.title }}</h1>
      <img :src="movie.image" alt="Movie Image">
      <p>Released: {{ movie.releaseDate }}</p>
      <p>Rating: {{ movie.imDbRating }}</p>
      <p>Content Rating: {{ movie.contentRating }}</p>
      <p>YouTube Trailer:</p>
      <iframe width="560" height="315" :src="youtubeEmbedUrl" frameborder="0" allowfullscreen></iframe>
      <!-- Display additional movie details here -->
    </div>
    <div v-else>
      <p>Loading...</p>
    </div>
  `,
  computed: {
    youtubeEmbedUrl() {
      // Compute the embedded YouTube video URL
      if (this.movie && this.movie.videoUrl) {
        // Replace "watch" with "embed" in the YouTube video URL
        return this.movie.videoUrl.replace('/watch?v=', '/embed/');
      }
      return '';
    }
  },
  created() {
    // Fetch movie details based on movie title parameter
    fetch(`https://imdb-api.com/API/AdvancedSearch/k_qgp7806t?title=${encodeURIComponent(this.$route.params.title)}&certificates=us:PG`)
      .then(response => response.json())
      .then(data => {
        if (data.results && data.results.length > 0) {
          this.movie = data.results[0]; // Assuming the API response contains an array of results, and we only need the first result as movie details

          // Fetch YouTube trailer URL for the movie
          fetch(`https://imdb-api.com/en/API/YouTubeTrailer/k_qgp7806t/${this.movie.id}`)
            .then(response => response.json())
            .then(data => {
              if (data && data.videoUrl) {
                this.movie.videoUrl = data.videoUrl; // Set the YouTube trailer URL as a property of the movie data
              }
            })
            .catch(error => {
              console.log(error);
            });
        }
      })
      .catch(error => {
        console.log(error);
      });
  }
}
