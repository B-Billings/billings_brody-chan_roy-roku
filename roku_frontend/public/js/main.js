// imports always go at the top
import LogInPage from './components/TheLoginComponent.js';
import AllUserPage from './components/TheAllUsersComponent.js';
import Defaulthome from './components/TheHomePage.js';
import kidshome from './components/TheKidsHomePage.js';
import MovieDetails from './components/MovieDetails.js';
import homemusic from './components/TheHomePageMusic.js';
import kidshomemusic from './components/TheKidsHomePageMusic.js';
import kidshomevideo from './components/TheKidsHomePageVideos.js';
import createuser from './components/TheCreateUserPage.js';
import settingspage from './components/TheSettingsPage.js';
import SongDetails from './components/SongDetails.js';

//import ErrorPage from './modules/ErrorPage.js';

const { createApp } = Vue; //import the createApp method from the Vue library

const router = VueRouter.createRouter({
    // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
    history: VueRouter.createWebHashHistory(),
    routes: [
       { 
          path: '/', //brower location bar looks like this
           name: 'login', //for programmatiuc navigation
         component: LogInPage // the component to render
       },
       
       {
        path: '/movie/:title', // Update the URL parameter name to 'title'
        name: 'MovieDetails',
        component: MovieDetails,
      },
      {
        path: '/song/:songId', // Update the URL song parameter name to 'id'
        name: 'SongDetails',
        component: SongDetails,
      },

        { 
            path: '/users', //brower location bar looks like this
            name: 'allusers', //for programmatiuc navigation
            component: AllUserPage // the component to render
        },


        {
            path:'/home', //this would be the adult homepage
            name: 'home',
            component: Defaulthome
        },

        {
            path:'/kidshome', //this would be the adult homepage
            name: 'kidshome',
            component: kidshome
        },
        
        {
            path:'/users', //this would be the adult homepage
            name: 'allusers',
            component: AllUserPage
        },

        {
            path:'/homemusic', //this would be the adult homepage for music
            name: 'homemusic',
            component: homemusic
        },
        {
            path:'/kidshomemusic', //this would be the adult homepage for music
            name: 'kidshomemusic',
            component: kidshomemusic
        },
        {
            path:'/kidshomevideo', //this would be the adult homepage for music
            name: 'kidshomevideo',
            component: kidshomevideo
        },
        {
            path:'/createuser', //this would be the adult homepage for music
            name: 'createuser',
            component: createuser
        },
        {
            path:'/settingspage', //this would be the adult homepage for music
            name: 'settingspage',
            component: settingspage
        },








        //put a catch-all for broken routes at the very bottom of your routes stack
        //if vue router cant match a give route, itll display a generic error component
        // { 
        //     path: '/:pathMatch(.*)*', //brower location bar looks like this
        //     name: 'error', //for programmatiuc navigation
        //     component: ErrorPage // the component to render
        // }
    ] // short for `routes: routes`
  })
  
  // 5. Create and mount the root instance.
  const app = Vue.createApp({
    mounted() {
        if (window.localStorage.getItem('user')){
            this.authenticated = true;
            this.$router.push({name: 'allusers'});
        }
    },

    data () {
        return{
            authenticated: false
            }        
        },
        methods: {
            toggleBackgroundColor() {
                this.backgroundColor = this.backgroundColor === 'red' ? 'blue' : 'red'
              },
            logUserOut(){
                this.authenticated = false;
                window.localStorage.removeItem('user');
                this.$router.push({name: 'login'})
            },

            loggedin(){
                this.authenticated = true;
            },
            gotoprofiles() {
                this.$router.push({ name: 'allusers' });
            },
            showsettings(){
                this.$router.push({ name: 'settingspage' });
            }
            
        }
    });
  // Make sure to _use_ the router instance to make the
  // whole app router-aware.
  app.use(router);
  
  app.mount('#app');


  