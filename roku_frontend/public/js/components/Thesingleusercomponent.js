
export default {
    name: 'TheUserComponent',
    props: ['user'],
  
    template: `
    <div>
    <div @click="navToHomePage" class="card rounded user-panel">
      <div class="card-body text-center">
        <img :src='"images/" + user.avatar' class="rounded-circle img-fluid">
        <p>{{ user.username }}</p>
      </div>
    </div>
    <div class="modal" :class="{ 'is-active': popup }">
      <div class="modal-background" @click="hideModal"></div>
      <div class="modal-content">
        <div class="box">
        <p id="wrong-info">Information is invalid</p>
          <p>Please confirm your username to proceed to the adult page</p>
          <input v-model="usernameInput" class="input" type="text">
          <button @click="submitUsername" class="button is-primary">Confirm</button>
          <button @click="hideinfo" class="button">Cancel</button>
        </div>
      </div>
      <button class="close" @click="hideinfo"></button>
    </div>
  </div>
`,
  
data() {
    return {
        popup: false,
      usernameInput: '',
    };
  },

  computed: {
    targetHomePage() {
      if (this.user.permissions < 4) {
        return { name: 'kidshome' };
      } else {
        return { name: 'home' };
      }
    },
  },

  methods: {
    async navToHomePage() {
      if (this.user.permissions === 5) {
        this.popup = true;
      } else {
        this.$router.push(this.targetHomePage);
      }
    },
//originally in our design we wanted to have a pin but that would require another column in the data base
//i also looked into passing the password along but hashing it so users cant see what it is in the console or vue
//i defaulted to basically asking are you sure? confirm username as it was already passed in the array
    submitUsername() {
        if (this.usernameInput === this.user.username) {
          this.$router.push(this.targetHomePage);
          this.hideinfo();
        } else {
          document.getElementById('wrong-info').style.display = 'block';
        }
      },
      

    hideinfo() {
      this.popup = false;
      this.usernameInput = '';
    },
  },
};
  
  