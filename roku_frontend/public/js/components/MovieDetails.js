export default {
  name: 'MovieDetails',
  data() {
    return {
      movie: null, 
      comments: [], 
      commentText: '' ,
      username: '',
      videoLikes: 0, 
      isLiked: false
    }
  },
  template: `
  <div>
  <div movie-info-area>
  <div v-if="movie">
    <h1 id="movie-details-header">{{ movie.title }}</h1>
    <p>YouTube Trailer:</p>
    <div class="video-container">
    <iframe width="1280" height="720" :src="youtubeEmbedUrl" frameborder="0" allowfullscreen ></iframe>
    </div>
    <p>Released: {{ movie.description }}</p>
    <p>Genre: {{ movie.genres }}</p>
    <p>Plot: {{ movie.plot }}</p>
    <p>Cast: {{ movie.stars }}</p>
    <p>Content Rating: {{ movie.contentRating }}</p>
    <p>IMDB Rating: {{ movie.imDbRating }}</p>
    <p>Votes: {{ movie.imDbRatingVotes }}</p>
    <div class="poster-container">
    <img id="movie-poster-area":src="movie.image" alt="Movie Image">
    </div>
  </div>
  </div>
  <div id="video-share-area">
  <button @click="shareOnEmail">Share this movie via Email</button>
  <button @click="shareOnFacebook">Share this movie on Facebook</button>
  </div>

  <div id="youtube-comments-area">
  <h1>YouTube Comments On Our IMDB Latest Video</h1>
  <p>Video Likes: {{ videoLikes }}</p>
  <button id="like-video-button" @click="likeVideo">Like Video</button>
  <ul id="comments-list">
    <li v-for="comment in comments" :key="comment.id">
      <strong class="comment-author">{{ comment.snippet.topLevelComment.snippet.authorDisplayName }}:</strong> {{ comment.snippet.topLevelComment.snippet.textDisplay }}
    </li>
  </ul>
  <form id="comment-form-area" @submit.prevent="addComment">
    <input v-model="username" placeholder="Your username...">
    <input v-model="commentText" placeholder="Add a comment...">
    <button id="add-comment-button" type="submit">Add Comment</button>
  </form>
</div>


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
    this.fetchComments();
  },
  methods: {
    fetchComments() {
   
      const apiKey = 'AIzaSyAFi7KHEzDwFpMczxrrfSjP13HiOjo20nU'; 

      fetch(`https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=ZS8iWraSHm8&maxResults=10&key=${apiKey}`)
      .then((response) => response.json())
      .then((data) => {
        this.comments = data.items;

        fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=ZS8iWraSHm8&key=${apiKey}`)
          .then((response) => response.json())
          .then((data) => {
            const video = data.items[0];
            const likes = video.statistics.likeCount;
            this.videoLikes = likes;
          })
          .catch((error) => {
            console.error('Error loading video likes:', error);
          });
      })
      .catch((error) => {
        console.error('Error loading YouTube API:', error);
      });
 
  },

    addComment() {

      const newComment = {
        id: 'fake-comment-id',
        snippet: {
          topLevelComment: {
            snippet: {
              authorDisplayName: this.username, 
              textDisplay: this.commentText 
            }
          }
        }
      };


      this.comments.push(newComment);


      this.commentText = '';
      this.username = '';
    },

    likeVideo() {
      if (!this.isLiked) { 
        this.videoLikes = parseInt(this.videoLikes, 10) + 1; 
        this.isLiked = true; 
      } else {
    
        console.log("Video has already been liked!");
      }},
    shareOnFacebook() {

      const movieTitle = this.movie.title;
      const shareText = `I found this movie named ${movieTitle} on Roku!`;
    
 
      const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareText)}`;
    
 
      window.open(shareUrl, '_blank');
    },
    shareOnEmail() {
   
      const movieTitle = this.movie.title;
      const subjectTemplate = "Check out this movie on Roku: {MOVIE_TITLE}";
      const bodyTemplate = `I found this movie named "{MOVIE_TITLE}" on Roku! Check it out: {MOVIE_URL}`;

      const subject = subjectTemplate.replace('{MOVIE_TITLE}', movieTitle);
      const body = bodyTemplate.replace('{MOVIE_TITLE}', movieTitle).replace('{MOVIE_URL}', window.location.href);


      const mailtoUrl = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;


      window.location.href = mailtoUrl;
    }
  }
}







