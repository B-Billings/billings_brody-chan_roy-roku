export default {
  name: 'TheSettingsComponent',

  template: `
    <section id="home-page-box">
      <h1>Welcome to the Settings page!</h1>
      <nav>
        <ul>
          <li>
            <button @click="goBack">
              <i class="fas fa-arrow-circle-left"></i> Want To go Back?
            </button>
          </li>
        </ul>
      </nav>
      <form id="colour-changearea">
      <h2> This doesn't work as intended there is a note in TheSettingsPage.js</h2>
        <label for="background-color">Change background color:</label>
        <input type="color" id="background-color" v-model="backgroundColor">
      </form>
    </section>
  `,

  data() {
    return {
      backgroundColor: localStorage.getItem('backgroundColor') 
    };
  },
//I cant render it onto other pages but have got it to work with the settings page. I even tried with cusom ids on the other elements that would be called
// and it still wouldnt move over this will give you an example of what i was looking to do on all the screens depending on the user.
  created() {
    if (localStorage.getItem('backgroundColor')) {
      this.backgroundColor = localStorage.getItem('backgroundColor');
    }
  },

  mounted() {
    const renderContainers = document.querySelectorAll('#render-container');
    renderContainers.forEach(container => {
      container.style.backgroundColor = this.backgroundColor;
    });
  },
  
  watch: {
    backgroundColor(newValue) {
      const renderContainers = document.querySelectorAll('#render-container');
      renderContainers.forEach(container => {
        container.style.backgroundColor = newValue;
      });
      localStorage.setItem('backgroundColor', newValue);
    },
  },
  
  methods: {
    goBack() {
      this.$router.go(-1);
    },
  },

};
