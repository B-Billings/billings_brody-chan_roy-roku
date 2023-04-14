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
      <p>YouTube Trailer:</p>
      <iframe width="560" height="315" :src="youtubeEmbedUrl" frameborder="0" allowfullscreen></iframe>
      <p>Released: {{ movie.description }}</p>
      <p>Genre: {{ movie.genres }}</p>
      <p>Plot: {{ movie.plot }}</p>
      <p>Cast: {{ movie.stars }}</p>
      <p>Content Rating: {{ movie.contentRating }}</p>
      <p>IMDB Rating: {{ movie.imDbRating }}</p>
      <p>Votes: {{ movie.imDbRatingVotes }}</p>
 
      <img :src="movie.image" alt="Movie Image">
      <button @click="shareMovie">Share</button> <!-- Add Share button with click event listener -->
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
  methods: {
    shareMovie() {
      // Check if the navigator.share() method is supported by the browser
      if (navigator.share) {
        // Create a shareable object with movie details
        const shareData = {
          title: this.movie.title,
          text: `Check out this movie: ${this.movie.title} (${this.movie.releaseDate})`,
          url: window.location.href
        };
        
        // Call the navigator.share() method to share the movie details
         navigator.share(shareData)
          .then(() => {
            console.log('Movie details shared successfully!');
          })
          .catch((error) => {
            console.log('Error sharing movie details:', error);
          });
      } else {
        // Fallback option for browsers that do not support navigator.share()
        // You can display a message or provide alternative sharing options here
        console.log('Sharing is not supported by this browser. You can manually copy the movie details for sharing.');
      }
    }
  },
  created() {
    // Fetch movie details based on movie title parameter
    fetch(`https://imdb-api.com/API/AdvancedSearch/k_mdq0yq5j?title=${encodeURIComponent(this.$route.params.title)}&certificates=us:PG`)
      .then(response => response.json())
      .then(data => {
        if (data.results && data.results.length > 0) {
          this.movie = data.results[0]; // Assuming the API response contains an array of results, and we only need the first result as movie details

          // Fetch YouTube trailer URL for the movie
          fetch(`https://imdb-api.com/en/API/YouTubeTrailer/k_mdq0yq5j/${this.movie.id}`)
            .then(response => response.json())
            .then(data => {
              if (data && data.videoUrl) {
                this.movie.videoUrl = data.videoUrl; // Set the YouTube trailer URL to the movie object
              }
            })
            .catch(error => {
              console.log('Error fetching YouTube trailer:', error);
            });
        }
      })
      .catch(error => {
        console.log('Error fetching movie details:', error);
      });
  }
  
}
