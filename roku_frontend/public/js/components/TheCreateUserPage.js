export default {
    name: 'TheCreateUserPage',
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
}