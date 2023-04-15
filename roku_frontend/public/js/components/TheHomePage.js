export default {

    name: 'TheHomePageComponent',
  
    data() {
      return {
        comments: [], // Store comments data
        commentText: '', // Store user input for new comment
        username: '' // Store user input for username
      };
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
      <div>
        <h1>YouTube Comments</h1>
        <ul>
          <li v-for="comment in comments" :key="comment.id">
            <strong>{{ comment.snippet.topLevelComment.snippet.authorDisplayName }}:</strong> {{ comment.snippet.topLevelComment.snippet.textDisplay }}
          </li>
        </ul>
        <form @submit.prevent="addComment">
          <input v-model="username" placeholder="Your username...">
          <input v-model="commentText" placeholder="Add a comment...">
          <button type="submit">Add Comment</button>
        </form>
      </div>
      </section>
    `,
  
    created() {
      this.fetchComments();
    },
  
    methods: {
      fetchComments() {
        // Define your YouTube API key
        const apiKey = 'AIzaSyAFi7KHEzDwFpMczxrrfSjP13HiOjo20nU'; // Replace with your actual API key
  
        // Fetch comments for the video using YouTube Data API
        fetch(`https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=EEMwA8KZAqg&maxResults=10&key=${apiKey}`)
          .then(response => response.json())
          .then(data => {
            this.comments = data.items;
          })
          .catch(error => {
            console.error('Error loading YouTube API:', error);
          });
      },
  
      addComment() {
        // Create a new comment object
        const newComment = {
          snippet: {
            topLevelComment: {
              snippet: {
                authorDisplayName: this.username,
                textDisplay: this.commentText
              }
            }
          }
        };
  
        // Add the new comment to the comments array
        this.comments.push(newComment);
  
        // Clear input fields
        this.username = '';
        this.commentText = '';
      }
    }
  }
  