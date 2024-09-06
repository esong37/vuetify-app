// src/router/index.js
import Vue from 'vue';
import Router from 'vue-router';
import App from '../components/App.vue';
import Login from '../components/UserLogin.vue';
import Register from '../components/UserRegister.vue';
import Explore from '../components/UserExplore.vue';
import Library from '../components/UserLibrary.vue';
import Playlist from '../components/pidPlayList.vue';
import Album from '../components/pidAlbum.vue';
import AllPlaylists from '../components/AllPlaylists.vue';
import AllAlbum from '@/components/AllAlbum.vue';
import UserInfo from '../components/UserInfo.vue';
import CreatePlaylist from '@/components/CreatePlaylist.vue';


Vue.use(Router);


const router = new Router({
    mode: 'history',
    routes: [
        { path: '/', component: App },
        { path: '/login', component: Login },
        { path: '/register', component: Register },
        { path: '/explore', component: Explore },
        { path: '/library', component: Library },
        { path: '/playlist/', component: AllPlaylists },
        { path: '/playlist/:pid', component: Playlist },
        { path: '/album/', component: AllAlbum },
        { path: '/album/:pid', component: Album },
        { path: '/info', component: UserInfo},
        { path: '/create-playlist', component: CreatePlaylist},

    ],
});

// Global Navigation Guard
router.beforeEach((to, from, next) => {
    const isAuthenticated = localStorage.getItem('token'); // check jwt token
  
    if (to.path !== '/login' && to.path !== '/register' && !isAuthenticated) {
      // if not login, redirect
      if (to.path !== '/login') {
        next('/login');
      } else {
        next();
      }
    } else {
      next(); 
    }
  });
  

export default router;
