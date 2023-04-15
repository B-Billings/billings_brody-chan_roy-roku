export default{
    name: 'TheHomePageMusicComponent',

    template: `
    <section id="home-page-box">
    <h1>This is the default Music homepage</h1>
    <nav>
<ul>
<li>
<router-link to="/home">Go to Home </router-link>
<router-link to="/homemusic">Go to Home Music</router-link>

</li>
</ul>
    </nav>
    </section>
    `,
    
    created() {
        // fetch('hit the IMDB API using the ref video')
        //this will load video content, your video thumbnails etc
        //go to rapid api get a key find the imdb aoi start exploring
        //https://www.youtube.com/watch?v=ytNyibPQFhw
     }
 }