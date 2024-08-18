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


Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [
        { path: '/', component: App },
        { path: '/login', component: Login },
        { path: '/register', component: Register },
        { path: '/explore', component: Explore },
        { path: '/library', component: Library },
        { path: '/playlist/:pid', component: Playlist },
        { path: '/album/:pid', component: Album },
    ],
});
