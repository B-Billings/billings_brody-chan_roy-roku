export default{
    name: 'TheCreateUserComponent',

    template: `
    <section id="home-page-box">
    <h1 id="create-header">Create a new user</h1>
    <p id="create-psrs">Welcome to the create user page please fill out the form below!</p>
    <form id="user-form" @submit.prevent="trysignup">
    <router-link to="/" id="larger-icon">  <i class="fas fa-arrow-circle-left"></i> </router-link>
      <div class="form-spacing">
        <label for="fname">First Name:</label>
        <input type="text" id="fname" v-model="fname" required>
      </div>
      <div class="form-spacing">
        <label for="lname">Last Name:</label>
        <input type="text" id="lname" v-model="lname" required>
      </div>
      <div class="form-spacing">
      <label for="username">Username:</label>
      <input type="text" id="username" v-model="username" required>
    </div>
      <div class="form-spacing">
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" required>
      </div>
      <div id="avatar-over">
        <label>Avatar:</label>
        <div class="form-spacing" id="avatar-area">
          <label class="avatar-option">
            <input type="radio" name="avatar" v-model="avatar" value="count_olaf.jpg">
            <img src="/images/count_olaf.jpg" alt="Avatar 1" class="avatar-image">
            </label>
          <label class="avatar-option">
            <input type="radio" name="avatar" v-model="avatar" value="temp_avatar.jpg">
            <img src="/images/temp_avatar.jpg" alt="Avatar 2" class="avatar-image">
            </label>
          <label class="avatar-option">
            <input type="radio" name="avatar" v-model="avatar" value="count_olaf.jpg">
            <img src="/images/count_olaf.jpg" alt="Avatar 3" class="avatar-image">
            </label>
        </div>
      </div>
      <div class="form-spacing">
      <label for="permissions">Child Account?:</label>
      <input type="checkbox" id="permissions" v-model="permissions">
    </div>
    
      <button id="form-button" type="submit" class="btn btn-primary login-submit signup">
        JOIN!
      </button>
    </form>
    <div id="success-message">
  User has been added!
  <br>
  Click go back to login screen and re-login!
  <br>
  <router-link to="/"> Go Back To Login </router-link>

</div>
  </section>
</template>
    `,
    
    methods: {
        trysignup() {
          let permissionsValue = this.permissions ? 1 : 5; 
      
          let user = {
            fname: this.fname,
            lname: this.lname,
            password: this.password,
            avatar: this.avatar,
            username: this.username,
            permissions: permissionsValue,
          }
      
          fetch('/ums/signup', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
          })
          .then(res => res.text())
          .then(data => {
            console.log(data);
            document.getElementById("success-message").style.display = "block";
          })
          .catch(error => console.error(error))
        }
      }
    }      