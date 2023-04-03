export default {
  name: 'TheLoginComponent',
  template: `
<section class="container">

  <div class="jumbotron">
      <h1>Welcome to Flashblack!</h1>
      <p class="lead">
      Before revisiting your favourite movies, tv shows or music from yesteryear, please log in with a valid username and password.
      </p>
  </div>

  <section class="log-in">
    <label class="sr-only" for="inlineFormInputName">Name</label>
    <input ref="username" v-model="username" type="text" class="form-control" id="inlineFormInputName" placeholder="username" required>

    <label class="sr-only" for="inlineFormPassword">Password</label>
    <input  ref="password" v-model="password" type="password" class="form-control" id="inlineFormPassword" placeholder="password" required>
  </section>

  <button @click="tryLogIn"
      type="submit" 
      class="btn btn-primary login-submit"
    >Go!
  </button>

  <button v-if="signup" @click="trysignup"
  type="submit" 
  class="btn btn-primary login-submit signup"
>JOIN!
</button>
</section>`,

data() {
  return {
    password: '',
    username: '',
    authenticated: false,
    signup: false
  }
},

methods: {
  trysignup(){ debugger;},
 tryLogIn() {
  //check to see if there are a username and password
  //and make sure there' no extra white space

  if (this.username.trim().length == 0) {
    //this means the username unput is empty
    //the trim() method gets rid of any white space before or after text
    console.log('username is empty, plz mark the field and let the user know');
    this.$refs['username'].classList.add('missing-field');
    return;
  }else if (this.password.trim().length == 0) {
    //this means the username unput is empty
    //the trim() method gets rid of any white space before or after text
    console.log('password is empty, plz mark the field and let the user know');
    this.$refs['password'].classList.add('missing-field');
    return;
  }

  // end the input checks and remove marked fields css classes
  this.$refs['username'].classList.remove('missing-field');
  this.$refs['password'].classList.remove('missing-field');

  //try writing a temp fetch call to the back end login service
  console.log('login script should be good to go');

  //create a user object with theusername and password
  //and then pass that to the back end validation service

  let user = {
    username: this.username,
    password: this.password
  }

  // let formData = new FormData();

  // formData.append("username", this.username);
  // formData.append("password", this.password);
  //gonna work on the formdata next week

  fetch('/ums/login', {
    method: 'POST',
    headers: {
      'Accept':'application/json, text/plain, */*',
      'Content-type':'application/json'
      //'Content-type':'application/x-www-form-urlencoded'
    },
    body: JSON.stringify(user)
  })
  .then(res => res.json())
  .then(data => {
    if (data.message == 'no user') {
      //check for no user then provide sign up btn
      this.signup = true;
    } else if (data.message == 'wrong password'){
      //passwords dont match try again
      this.$refs['password'].classList.add('missing-field');
    }
     else   {
      this.$emit('setauthenticated');
      window.localStorage.setItem('user', JSON.stringify(data.user));

      this.$router.push({ name: 'allusers'});
    }
  })
  .catch(error => console.error(error))
 }
 //end fetch call
}
}