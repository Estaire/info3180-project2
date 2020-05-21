/* Add your Application JavaScript */
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    isLoggedIn: 0
  },
  mutations: {
    loggedIn(state){
      state.isLoggedIn = 1
    },
    loggedOut(state){
      state.isLoggedIn = 0
    }
  }
})

Vue.component('app-header', {
    template: `
    <nav class="navbar navbar-expand-lg navbar-dark primary-color fixed-top" v-if="isLoggedIn==1">
      <div class="container">

        <a class="navbar-brand photogram" href="#">Photogram</a>

        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#basicExampleNav"
          aria-controls="basicExampleNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="basicExampleNav">
          <form class="form-inline">
            <div class="md-form my-0 has-search">
              <span class="fa fa-search form-control-feedback"></span>
              <span class="search-label">Search</span>
              <input class="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search">
            </div>
          </form>

          <ul class="navbar-nav mr-auto">
            <li class="nav-item active home">
              <router-link class="nav-link" to="/explore"> 
                <svg class="bi bi-house-door" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" d="M7.646 1.146a.5.5 0 01.708 0l6 6a.5.5 0 01.146.354v7a.5.5 0 01-.5.5H9.5a.5.5 0 01-.5-.5v-4H7v4a.5.5 0 01-.5.5H2a.5.5 0 01-.5-.5v-7a.5.5 0 01.146-.354l6-6zM2.5 7.707V14H6v-4a.5.5 0 01.5-.5h3a.5.5 0 01.5.5v4h3.5V7.707L8 2.207l-5.5 5.5z" clip-rule="evenodd"/>
                  <path fill-rule="evenodd" d="M13 2.5V6l-2-2V2.5a.5.5 0 01.5-.5h1a.5.5 0 01.5.5z" clip-rule="evenodd"/>
                </svg>
              </router-link>
            </li>
            <li class="nav-item active logout">
              <router-link class="nav-link" to="/logout">
                <svg class="bi bi-box-arrow-right" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" d="M11.646 11.354a.5.5 0 010-.708L14.293 8l-2.647-2.646a.5.5 0 01.708-.708l3 3a.5.5 0 010 .708l-3 3a.5.5 0 01-.708 0z" clip-rule="evenodd"/>
                  <path fill-rule="evenodd" d="M4.5 8a.5.5 0 01.5-.5h9a.5.5 0 010 1H5a.5.5 0 01-.5-.5z" clip-rule="evenodd"/>
                  <path fill-rule="evenodd" d="M2 13.5A1.5 1.5 0 01.5 12V4A1.5 1.5 0 012 2.5h7A1.5 1.5 0 0110.5 4v1.5a.5.5 0 01-1 0V4a.5.5 0 00-.5-.5H2a.5.5 0 00-.5.5v8a.5.5 0 00.5.5h7a.5.5 0 00.5-.5v-1.5a.5.5 0 011 0V12A1.5 1.5 0 019 13.5H2z" clip-rule="evenodd"/>
                </svg>
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    `,
    computed: {
      isLoggedIn(){
          return store.state.isLoggedIn
      }
    }
});

Vue.component('app-footer', {
    template: `
    <footer>
        <div class="container">
        </div>
    </footer>
    `
});

const Home = Vue.component('home', {
   template: `
    <div class="jumbotron">
        <h1>Project 2</h1>
        <p class="lead">It's a work in progress</p>
    </div>
   `,
    data: function() {
       return {}
    }
});

const NotFound = Vue.component('not-found', {
    template: `
    <div>
        <h1>404 - Not Found</h1>
    </div>
    `,
    data: function () {
        return {}
    }
})

const Registration = Vue.component('registration', {
    template: `
    <div class="row">
      {{ isLoggedIn }}
      <div class="col-md-4"></div>
      <div class="col-md-4" id="register">
        <form @submit.prevent="uploadForm" id="uploadForm" role="form" method="POST" name="form">
          <h1 class="photogram">Photogram</h1>
          <div>
            <input type="email" id="email" name="email" class="form-control" required>
            <span class="email-label">Email</span>
          </div>
          <div>
            <input type="text" id="firstname" name="firstname" class="form-control" required>
            <span class="fn-label">First Name</span>
          </div>
          <div>
            <input type="text" id="lastname" name="lastname" class="form-control" required>
            <span class="ln-label">Last Name</span>
          </div>
          <div>
            <input type="text" id="username" name="username" class="form-control" required>
            <span class="un-label">Username</span>
          </div>
          <div>
            <input type="password" id="password" name="password" class="form-control" required>
            <span class="pw-label">Password</span>
          </div>
          <button type="submit" class="btn btn-primary">Sign up</button>
        </form>
        <div class="alt">
          <span>Have an account?</span>
          <router-link to="/login">Log in</router-link>
        </div>
      </div>
      <div class="col-md-4"></div>
    </div>
    `,
    methods:{
      uploadForm: ()=>{
        let self = this;
        let uploadForm = document.getElementById('uploadForm');
        let form_data = new FormData(uploadForm);
        fetch("/api/users/register", {
          method: "POST",
          body: form_data,
          headers: {
            'X-CSRFToken': token
          },
          credentials: 'same-origin'
        })
        .then(function(response){
          return response.json();
        })
        .then(function(jsonResponse){
          if(jsonResponse){
            router.push("/explore");
          }
        })
        .catch(function(error){
          console.log(error);
        });
      }
    },
    computed: {
      isLoggedIn(){
        store.commit('loggedOut')
      }
    }
})

const Login = Vue.component('login',{
  template: `
    <div class="row">
      {{ isLoggedIn }}
      <div class="col-md-4"></div>
      <div class="col-md-4" id="login">
        <form @submit.prevent="loginForm" id="loginForm" role="form" method="POST" name="form">
          <h1 class="photogram">Photogram</h1>
          <div>
            <input type="text" id="username" name="username" class="form-control" required>
            <span class="un-label">Username</span>
          </div>
          <div>
            <input type="password" id="password" name="password" class="form-control" required>
            <span class="pw-label">Password</span>
          </div>
          <button type="submit" class="btn btn-primary">Log in</button>
        </form>
        <div class="alt">
          <span>Don't have an account?</span>
          <router-link to="/register">Sign up</router-link>
        </div>
      </div>
      <div class="col-md-4"></div>
    </div>
    `,
    methods:{
      loginForm: ()=>{
        let self = this;
        let uploadForm = document.getElementById('loginForm');
        let form_data = new FormData(uploadForm);
        fetch('/api/auth/login', {
          method: 'POST',
          body: form_data,
          headers: {
            'X-CSRFToken': token
          },
          credentials: 'same-origin'
        })
        .then(response=>{
          return response.json();
        })
        .then(jsonResponse=>{
          if(jsonResponse.authenticated){
            localStorage.setItem('access_token', JSON.stringify(jsonResponse.access_token));
          }
        });
      }
    },
    computed: {
      isLoggedIn(){
        store.commit('loggedOut')
      }
    }
})
 
const Logout = Vue.component('logout',{
  created:()=>{
    fetch('/api/auth/logout',{
      method: 'GET',
      headers:{
        'Authorization': 'Bearer ' + localStorage.getItem('access_token')
      }
    })
    .then(response=>{
      response.json()
    });
    localStorage.removeItem('access_token');
    router.push("/login");
    }
})
    
const router = new VueRouter({
    mode: 'history',
    routes: [
        {path: "/", component: Login},
        {path: "/register", component: Registration},
        {path: "/login", component: Login},
        {path: "/explore", component: HomePage},
        {path: "/logout", component: Logout},
        {path: "*", component: NotFound}
    ]
});

// Instantiate our main Vue Instance
let app = new Vue({
    el: "#app",
    router,
    store
});