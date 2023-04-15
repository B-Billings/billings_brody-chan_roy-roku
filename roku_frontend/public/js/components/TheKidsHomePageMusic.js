export default {
  name: 'TheKidsHomePageMusicComponent',

  template: `
  <section id="page-topper"  class="kids-background">
  <div id="topper-header">
    <h1>This is the kids homepage</h1>
    <h2>This is the default Music homepage</h2>
  </div>
  <div>
    <nav id="routes-onpage-videos">
      <ul>
        <li>
          <router-link to="/kidshome"> <i class="fas fa-home"></i> HOME </router-link>
          <router-link to="/kidshomevideo"> <i class="fas fa-film"></i> MOVIES </router-link>
        </li>
      </ul>
    </nav>
  </div>
  </section>
  `,

  created() {

  }
}
