export default {
  name: 'MovieDetails',
  data() {
    return {
      movie: null, 
    }
  },
  template: `
    <div v-if="movie">
      <h1>{{ movie.title }}</h1>
      <p>YouTube Trailer:</p>
      <iframe width="1280" height="720" :src="youtubeEmbedUrl" frameborder="0" allowfullscreen ></iframe>
      <p>Released: {{ movie.description }}</p>
      <p>Genre: {{ movie.genres }}</p>
      <p>Plot: {{ movie.plot }}</p>
      <p>Cast: {{ movie.stars }}</p>
      <p>Content Rating: {{ movie.contentRating }}</p>
      <p>IMDB Rating: {{ movie.imDbRating }}</p>
      <p>Votes: {{ movie.imDbRatingVotes }}</p>
 
      <img :src="movie.image" alt="Movie Image">
      <button @click="shareMovie">Share</button> 
    </div>
    <div v-else>
      <p>Loading...</p>
    </div>
  `,
  computed: {
    youtubeEmbedUrl() {

      if (this.movie && this.movie.videoUrl) {
 
        return this.movie.videoUrl.replace('/watch?v=', '/embed/');
      }
      return '';
    }
  },
  methods: {
    shareMovie() {

      if (navigator.share) {
   
        const shareData = {
          title: this.movie.title,
          text: `Check out this movie: ${this.movie.title} (${this.movie.releaseDate})`,
          url: window.location.href
        };
        
 
         navigator.share(shareData)
          .then(() => {
            console.log('Movie details shared successfully!');
          })
          .catch((error) => {
            console.log('Error sharing movie details:', error);
          });
      } else {

        console.log('Sharing is not supported by this browser. You can manually copy the movie details for sharing.');
      }
    }
  },
  created() {

    fetch(`https://imdb-api.com/API/AdvancedSearch/k_mdq0yq5j?title=${encodeURIComponent(this.$route.params.title)}`)
      .then(response => response.json())
      .then(data => {
        if (data.results && data.results.length > 0) {
          this.movie = data.results[0]; 
          fetch(`https://imdb-api.com/en/API/YouTubeTrailer/k_mdq0yq5j/${this.movie.id}`)
            .then(response => response.json())
            .then(data => {
              if (data && data.videoUrl) {
                this.movie.videoUrl = data.videoUrl; 
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
