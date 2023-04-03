export default{
    name: 'TheUserComponent',
    props: ['user'],

    template: `

    <div @click="navtohomepage" class="card rounded userpanel">
    <div class="card-body text-center">
        <img :src='"images/" + user.avatar' class="rounded-circle img-fluid">
        <p> {{ user.username }} </p>
    </div>
</div>
    `,

    methods:{
        navtohomepage(){
            console.log('this user has this level:', this.user.permissions);
            // let targethome = 'home';
//everyuser has permission as part of their data (this is coming from the database)
//it is set in the permissions column
//we can use the data to figure out what home page they should have access to
//if less than 3 they dont get the adult content
//if greater than 3 they are full access and get reg home page
            // if (this.user.permissions < 4){
            //     targethome = 'kidshome';
            // } else {
            //     targethome = 'home'
            // }
        let targethome =(this.user.permissions < 4) ? "kidshome" : "home";

            this.$router.push ({ name: targethome});
        }
    }
}