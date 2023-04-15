export default{
    name: 'TheSettingsComponent',

    template: `
    <section id="home-page-box">
    <h1>This is the default Music homepage</h1>
    <nav>
<ul>
<li>
<button @click="goBack"> <i class="fas fa-arrow-circle-left"></i> Want To go Back?</button>


</li>
</ul>
    </nav>
    </section>
    `,
    
    methods: {
        goBack() {
          this.$router.go(-1)
        }
      }
    }
 