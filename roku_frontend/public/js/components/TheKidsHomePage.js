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
  <section id="page-topper">
  <div id="topper-header">
    <h1>This is the kids homepage</h1>
  </div>
  <div>
    <nav id="routes-onpage">
      <ul>
        <li>
        <router-link to="/kidshomevideo"> <i class="fas fa-film"></i> MOVIES </router-link>
        <router-link to="/kidshomemusic"> <i class="fas fa-music"></i> MUSIC </router-link>
        </li>
      </ul>
    </nav>
  </div>
  `,

}
