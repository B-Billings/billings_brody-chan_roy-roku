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
    </section>
    `,
    
    created() {
        // fetch('hit the IMDB API using the ref video')
        //this will load video content, your video thumbnails etc
        //go to rapid api get a key find the imdb aoi start exploring
        //https://www.youtube.com/watch?v=ytNyibPQFhw
     }
 }