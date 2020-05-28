/* Add your Application JavaScript */
Vue.use(Vuex)

const store = new Vuex.Store({
  plugins: [createPersistedState({
        storage: window.sessionStorage
  })],
  state: {
    isLoggedIn: false,
    page: 0
  },
  mutations: {
    loggedIn(state){
      this.state.isLoggedIn = true
    },
    loggedOut(state){
      this.state.isLoggedIn = false
    },
    thisPageToHome({commit}){
      this.state.page = 0
    },
    thisPageToPost(state){
      this.state.page = 1
    },
    thisPageToProfile(state){
      this.state.page = 2
    },
    thisPageToSuggestions(state){
      this.state.page = 3

    }
  },
  actions: {
    setLoggedIn({commit}){
      commit('loggedIn')
    },
    setLoggedOut({commit}){
      commit('loggedOut')
    },
    setPageToHome({commit}){
      commit('thisPageToHome')
    },
    setPageToPost({commit}){
      commit('thisPageToPost')
    },
    setPageToProfile({commit}){
      commit('thisPageToProfile')
    },
    setPageToSuggestions({commit}){
      commit('thisPageToSuggestions')
    }
  }
})

Vue.component('app-header', {
    template: `
    <nav class="navbar navbar-expand-lg navbar-dark primary-color fixed-top" v-if="isLoggedIn">
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
              <router-link @click.native="setPageToHome" class="nav-link" to="/explore"> 
                <svg v-if="getPage == 0" class="bi bi-house-door-fill" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6.5 10.995V14.5a.5.5 0 0 1-.5.5H2a.5.5 0 0 1-.5-.5v-7a.5.5 0 0 1 .146-.354l6-6a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 .146.354v7a.5.5 0 0 1-.5.5h-4a.5.5 0 0 1-.5-.5V11c0-.25-.25-.5-.5-.5H7c-.25 0-.5.25-.5.495z"/>
                  <path fill-rule="evenodd" d="M13 2.5V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z"/>
                </svg>
                <svg v-else class="bi bi-house-door" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" d="M7.646 1.146a.5.5 0 01.708 0l6 6a.5.5 0 01.146.354v7a.5.5 0 01-.5.5H9.5a.5.5 0 01-.5-.5v-4H7v4a.5.5 0 01-.5.5H2a.5.5 0 01-.5-.5v-7a.5.5 0 01.146-.354l6-6zM2.5 7.707V14H6v-4a.5.5 0 01.5-.5h3a.5.5 0 01.5.5v4h3.5V7.707L8 2.207l-5.5 5.5z" clip-rule="evenodd"/>
                  <path fill-rule="evenodd" d="M13 2.5V6l-2-2V2.5a.5.5 0 01.5-.5h1a.5.5 0 01.5.5z" clip-rule="evenodd"/>
                </svg>
              </router-link>
            </li>
            <li class="nav-item active">
              <router-link @click.native="setPageToPost" class="nav-link post" to="/posts/new">
                <svg v-if="getPage == 1" class="bi bi-plus-square-fill" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4a.5.5 0 0 0-1 0v3.5H4a.5.5 0 0 0 0 1h3.5V12a.5.5 0 0 0 1 0V8.5H12a.5.5 0 0 0 0-1H8.5V4z"/>
                </svg>
                <svg v-else class="bi bi-plus-square" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" d="M8 3.5a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5H4a.5.5 0 0 1 0-1h3.5V4a.5.5 0 0 1 .5-.5z"/>
                  <path fill-rule="evenodd" d="M7.5 8a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0V8z"/>
                  <path fill-rule="evenodd" d="M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                </svg>
              </router-link>
            </li>
            <li class="nav-item active profile">
              <router-link @click.native="setPageToProfile" class="nav-link" :to="{path: '/user/' + id}">
                <img :src="profile_pic" :class="{'border-style':toggle}">
              </router-link>
            </li>
            <li class="nav-item active logout">
              <router-link @click.native="setPageToHome" class="nav-link" to="/logout">
                <svg class="bi bi-door-closed" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" d="M3 2a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2zm1 0v13h8V2H4z"/>
                  <path d="M7 9a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                  <path fill-rule="evenodd" d="M1 15.5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13a.5.5 0 0 1-.5-.5z"/>
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
      },
      getPage(){
        return store.state.page
      }
    },
    methods: {
      setPageToHome(){
        store.dispatch('setPageToHome')
        this.toggle=false
      },
      setPageToPost(){
        store.dispatch('setPageToPost')
        this.toggle=false
      },
      setPageToProfile(){
        store.dispatch('setPageToProfile')
        this.toggle=true
      },
    },
    data: ()=>{
      return{
        id: localStorage.getItem('user_id'),
        profile_pic: localStorage.getItem('profile_pic'),
        toggle: false
      }
    },
    mounted: function(){
      this.$root.$on('refresh', ()=>{
        this.id = localStorage.getItem('user_id')
        this.profile_pic = localStorage.getItem('profile_pic')
        this.$forceUpdate()
      })
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
          if(jsonResponse.authenticated){
            localStorage.setItem('access_token', JSON.stringify(jsonResponse.access_token))
            router.push("/explore");
            store.dispatch('setLoggedIn')
          }
        })
        .catch(function(error){
          console.log(error);
        });
      }
    }
})

const Login = Vue.component('login',{
  template: `
    <div class="row">
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
    created(){
      store.dispatch('setLoggedOut')
    },
    methods:{
      loginForm: ()=>{
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
          return response.json()
        })
        .then(jsonResponse=>{
          if(jsonResponse.authenticated){
            localStorage.setItem('access_token', JSON.stringify(jsonResponse.access_token))
            router.push('/explore')
            store.dispatch('setLoggedIn')
          }
        })
      }
    }
})

const Post = Vue.component('post',{
  template: `
    <div class="row">
      <div class="col-md-4"></div>
      <div class="col-md-4" id="post">
        <form @submit.prevent="postForm" id="postForm" role="form" method="POST" name="form">
          <span id="label">Photo</span>
          <label for="photo" id="photo-label" name="photo-label">Browse</label>
          <input type="file" name="photo" id="photo" class="form-control">
          <label for="caption" id="caption-label" name="caption-label">Caption</label>
          <textarea id="caption" name="caption" rows="4" cols="50"></textarea>
          <button class="btn btn-primary">Share</button>
        </form>
     </div>
     <div class="col-md-4"></div>
  </div>
  `,
  methods:{
    postForm:()=>{
      let uploadForm = document.getElementById('postForm');
      let form_data = new FormData(uploadForm);
      fetch('/api/users/' + localStorage.getItem('user_id') + '/posts',{
        method: 'POST',
        body: form_data,
        headers:{
          'Authorization': 'Bearer ' +  JSON.parse(localStorage.getItem('access_token')),
          'X-CSRFToken': token
        },
        credentials: 'same-origin'
      })
      .then(response=>{
        return response.json()
      })
      .then(data=>{
        console.log(data)
      })
      store.dispatch('setPageToHome')
      router.push('/explore')
    }
  }
})

const User = Vue.component('user',{
  template: `
    <div class="row">
      <div class="col-md-1"></div>
      <div class="col-md-10">
        <div id="profile-header">
          <img class="profile-pic" v-bind:src="user.profile_pic"> 
          <div class="wrapper">
            <div class="group one">
              <span class="username">{{user.username}}</span>
              <router-link v-if="current_user" class="nav-link" to="/users/edit">
                <button class="btn btn-primary">Edit Profile</button>
              </router-link>
            </div>
            <div class="group two">
              <span class="post-count"><b>{{count}}</b> posts</span>
              <span class="follower-count"><b>{{user.follower_count}}</b> followers</span>
            </div>
            <span class="location">{{user.location}}</span>
            <span class="created-on">Member since {{user.created_on}}</span>
            <span class="biography">{{user.biography}}</span>
          </div>
        </div>
        <div id="profile-photos">
          <div class="photo-container" v-for="photo in photos">
            <img class="photo" v-bind:src="photo">
          </div>
        </div>
      </div>
      <div class="col-md-1"></div>
    </div>
  `,
  async created(){
    await fetch('/api/posts',{
      method: 'GET',
      headers:{
        'Authorization': 'Bearer ' +  JSON.parse(localStorage.getItem('access_token'))
      }
    })
    .then(response=>{
      return response.json();
    })
    .then(data=>{
      if(data){
        this.setUsers(data)
        if(this.$route.params.user_id != localStorage.getItem('user_id')){
          this.setUser()
          this.isCurrent(false)
        }
        else
          this.isCurrent(true)
      }
    })
    await fetch('/api/users/' + this.$route.params.user_id + '/posts',{
      method: 'GET',
      headers:{
        'Authorization': 'Bearer ' +  JSON.parse(localStorage.getItem('access_token'))
      }
    })
    .then(response=>{
      return response.json()
    })
    .then(data=>{
      this.setPosts(data)
      this.getPhotos()
    })
  },
  methods:{
    setUsers(data){
      if(this.$route.params.user_id == localStorage.getItem('user_id'))
        this.user = data.user
      else
        this.users = data.users
    },
    setUser(){
      let user;
      for(user of this.users){
        if(this.$route.params.user_id == user.id){
          this.user = user
          break;
        }
      }
    },
    setPosts(data){
      this.posts = data.posts
    },
    getPhotos(){
      for(post of this.posts){
         if(post.username == this.user.username){
            this.photos.push(post.photo)
            this.count++
         }
      }
    },
    isCurrent(boolean){
      this.current_user = boolean
    }
  },
  data:()=>{
    return{
      users: [],
      user: [],
      posts: [],
      photos: [],
      count: 0,
      current_user: false
    }
  }
})

const Edit = Vue.component('edit',{
  template: `
    <div class="row">
      <div class="col-md-3"></div>
      <div class="col-md-6" id="edit">
        <form @submit.prevent="editForm" id="editForm" role="form" method="POST" name="form">
          <div class="top">
            <img :src="profile_pic">
            <span>{{username}}</span>
            <label for="photo" id="photo-label" name="photo-label">Change Profile Photo</label>
            <input type="file" name="photo" id="photo" class="form-control">
          </div>
          <div class="form-group">
            <span class="fn-label">First Name</span>
            <input v-model="firstname" type="text" id="firstname" name="firstname" class="form-control">
          </div>
          <div class="form-group">
            <span class="ln-label">Last Name</span>
            <input v-model="lastname" type="text" id="lastname" name="lastname" class="form-control">
          </div>
          <div class="form-group">
            <span class="un-label">Username</span>
            <input v-model="username" type="text" id="username" name="username" class="form-control">
          </div>
          <div class="form-group">
            <span class="bio-label">Biography</span>
            <textarea v-model="biography" id="biography" name="biography"></textarea>
          </div>
          <div class="form-group">
            <span class="local-label">Location</span>
            <input v-model="location" type="text" id="location" name="location" class="form-control">
          </div>
          <button type="submit" class="btn btn-primary">Submit</button>
        </form>
      </div>
      <div class="col-md-3"></div>
    </div>
  `,
  methods:{
    editForm:()=>{
      let editForm = document.getElementById('editForm');
      let form_data = new FormData(editForm);
      fetch('/api/user/edit',{
        method: 'POST',
        body: form_data,
        headers:{
          'Authorization': 'Bearer ' +  JSON.parse(localStorage.getItem('access_token')),
          'X-CSRFToken': token
        },
        credentials: 'same-origin'
      })
      .then(response=>{
        router.push('/explore')
        return response.json()
      })
    }
  },
  data: ()=>{
    return{
      username: localStorage.getItem('username'),
      profile_pic: localStorage.getItem('profile_pic'),
      firstname: localStorage.getItem('firstname'),
      lastname: localStorage.getItem('lastname'),
      biography: localStorage.getItem('biography'),
      location: localStorage.getItem('location')
    }
  }
})

const Logout = Vue.component('logout',{
  template: `<div></div>`,
  created:()=>{
    fetch('/api/auth/logout',{
      method: 'GET',
      headers:{
        'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('access_token'))
      }
    })
    .then(response=>{
      return response.json()
    });
    localStorage.removeItem('access_token');
    localStorage.removeItem('user_id');
    localStorage.removeItem('username');
    localStorage.removeItem('profile_pic');
    localStorage.removeItem('firstname');
    localStorage.removeItem('lastname');
    localStorage.removeItem('biography');
    localStorage.removeItem('location')
    router.push("/login");
    store.dispatch('setLoggedOut')
    }
})

const HomePage = Vue.component('homepage',{
  template: `
  <div class="container">
    <div class="row">
      <div class="col-md-1"></div>
      <div id="dashboard" class="col-md-7">
        <div id="user-header">
          <div v-for="user_ in users">
            <div id="user-view" v-if="user_.check_follow">
              <router-link :to="{path: '/user/' + user_.id}">
                <img v-bind:src="user_.profile_pic">
              </router-link>
              <span class="username">{{user_.username}}</span>
            </div>
          </div>
        </div>
        <div id="user-posts" v-for="post in posts">
          <div class="header">
            <img class="profile_pic" v-bind:src="post.profile_pic"> 
            <span class="username">{{post.username}}</span>
          </div>
          <img class="photo" v-bind:src="post.photo">
          <span class="caption">{{post.caption}}</span>
          <div class="footer">
            <button v-if="!toggle_.includes(post)" @click="toggle(post); likePost(post); like++" class="btn btn-primary">
              <svg class="bi bi-heart" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M8 2.748l-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
              </svg>
            </button>
            <button v-else class="btn btn-primary" style="animation: pulse 0.35s linear 1; color: red;">
              <svg class="bi bi-heart-fill" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
              </svg>
            </button>
            <span class="likes">{{post.likes + like}} likes</span>
            <span class="created_on">{{post.created_on}}</span>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div id="rhs">
          <div id="user">
            <img v-bind:src="user.profile_pic">
            <span class="username">{{user.username}}</span>
            <span class="name">{{user.firstname}} {{user.lastname}}</span>
          </div>
          <span id="h6">Suggestions For You</span>
          <span><router-link id="see-all" @click.native="setPageToSuggestions" to="/suggestions">See All</router-link></span>
          <div v-if="num>=5">
            <div id="suggestion-view" v-for="index in 5" :key="index-=1">
              <img v-bind:src="users[index].profile_pic"> 
              <span class="username">{{users[index].username}}</span>
              <button @click="followUser(users[index].id); toggle(users[index])" class="btn btn-primary follow" :class="{'following':toggle_.includes(users[index])}" v-if="!users[index].check_follow"></button>
              <button class="btn btn-primary following" v-if="users[index].check_follow"></button>
            </div>
          </div>
          <div v-else>
            <div id="suggestion-view" v-for="index in num" :key="index-=1">
              <img v-bind:src="users[index].profile_pic"> 
              <span class="username">{{users[index].username}}</span>
              <button @click="followUser(users[index].id); toggle(users[index])" class="btn btn-primary follow" :class="{'following':toggle_.includes(users[index])}" v-if="!users[index].check_follow"></button>
              <button class="btn btn-primary following" v-if="users[index].check_follow"></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  `,
  async created(){
    await fetch('/api/posts',{
      method: 'GET',
      headers:{
        'Authorization': 'Bearer ' +  JSON.parse(localStorage.getItem('access_token'))
      }
    })
    .then(response=>{
      return response.json();
    })
    .then(data=>{
      if(data){
        localStorage.setItem('user_id', data.user.id)
        localStorage.setItem('profile_pic', data.user.profile_pic)
        localStorage.setItem('username', data.user.username)
        localStorage.setItem('firstname', data.user.firstname)
        localStorage.setItem('lastname', data.user.lastname)
        localStorage.setItem('biography', data.user.biography)
        localStorage.setItem('location', data.user.location)
        this.setUser(data)
        this.setUsers(data)
        this.$root.$emit('refresh')
      }
    })

    await fetch('/api/users/' + localStorage.getItem('user_id') + '/posts',{
      method: 'GET',
      headers:{
        'Authorization': 'Bearer ' +  JSON.parse(localStorage.getItem('access_token'))
      }
    })
    .then(response=>{
      return response.json()
    })
    .then(data=>{
      this.setPosts(data)
      this.$forceUpdate();
    })

    if(!this.user)
      router.push('/logout')

    this.$forceUpdate();
  },
  data: ()=>{
    return{
      user: [],
      users: [],
      toggle_: [],
      see: false,
      posts: [],
      likes: 0,
      like: 0,
      num: 0
    }
  },
  methods:{
    setUser(response){
      this.user = response.user
    },
    setUsers(response){
      this.users = response.users
      this.num = this.users.length
    },
    setPosts(response){
      this.posts = response.posts
    },
    toggle(item){
      const index = this.toggle_.indexOf(item)
      if (index >= 0)
        this.toggle_.splice(index,1)
      else
        this.toggle_.push(item)
    },
    followUser(user_id){
      fetch('/api/users/'+user_id+'/follow',{
        method: 'POST',
        headers:{
          'Authorization': 'Bearer ' +  JSON.parse(localStorage.getItem('access_token')),
          'X-CSRFToken': token
        },
        credentials: 'same-origin'
      })
      .then(response=>{
        return response.json()
      });
    },
    likePost(post){
      fetch('/api/posts/'+post.post_id+'/like',{
        method: 'POST',
        headers:{
          'Authorization': 'Bearer ' +  JSON.parse(localStorage.getItem('access_token')),
          'X-CSRFToken': token
        },
        credentials: 'same-origin'
      })
      .then(response=>{
        return response.json()
      })
    },
    setPageToSuggestions(){
      store.dispatch('setPageToSuggestions')
    }
  }
})
  
const Suggestions = Vue.component('suggestions',{
  template: `
    <div v-else class="row">
      <div class="col-md-2"></div>
      <div class="col-md-8">
        <h6>Suggestions For You</h6>
        <div id="suggestions">
          <div id="suggestion" v-for="user in users">
            <img v-bind:src="user.profile_pic"> 
            <span class="username">{{user.username}}</span>
            <span class="name">{{user.firstname}} {{user.lastname}}</span>
            <button @click="followUser(user.id); toggle(user)" class="btn btn-primary follow" :class="{'following':toggle_.includes(user)}" v-if="!user.check_follow"></button>
            <button class="btn btn-primary following" v-if="user.check_follow"></button>
          </div>
        </div>
      </div>
      <div class="col-md-2"></div>
    </div>
  `,
  async created(){
    await fetch('/api/posts',{
      method: 'GET',
      headers:{
        'Authorization': 'Bearer ' +  JSON.parse(localStorage.getItem('access_token'))
      }
    })
    .then(response=>{
      return response.json();
    })
    .then(data=>{
      this.setUsers(data)
    })
  },
  methods:{
    setUsers(response){
      this.users = response.users
    },
    followUser(user_id){
      fetch('/api/users/'+user_id+'/follow',{
        method: 'POST',
        headers:{
          'Authorization': 'Bearer ' +  JSON.parse(localStorage.getItem('access_token')),
          'X-CSRFToken': token
        },
        credentials: 'same-origin'
      })
      .then(response=>{
        return response.json()
      });
    },
    toggle(item){
      const index = this.toggle_.indexOf(item)
      if (index >= 0)
        this.toggle_.splice(index,1)
      else
        this.toggle_.push(item)
    }
  },
  data: ()=>{
    return{
      users: []
    }
  }
})

const router = new VueRouter({
    mode: 'history',
    routes: [
        {path: "/", component: Login},
        {path: "/register", component: Registration},
        {path: "/login", component: Login},
        {path: "/explore", component: HomePage},
        {path: "/suggestions", component: Suggestions},
        {path: "/posts/new", component: Post},
        {path: "/user/:user_id", component: User},
        {path: "/users/edit", component: Edit},
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