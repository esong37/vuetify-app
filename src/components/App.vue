<template>
    <v-app>
        <!-- Header -->
        <AppHeader />

        <router-view @play-track="playTrack" />

        <!-- based on router -->
        <template v-if="
            $route.path !== '/login'
            && $route.path !== '/register'
            && $route.path !== '/explore'
            && $route.path !== '/library'
            && !$route.path.startsWith('/playlist')
        ">

            <MusicLibrary :tracks="tracks" @play-track="playTrack" />

        </template>
        <AudioPlayer :currentTrack="currentTrack" />

    </v-app>
</template>

<script>
import AppHeader from './AppHeader.vue';
import AudioPlayer from './AudioPlayer.vue';
import MusicLibrary from './MusicLibrary.vue';
//import axios from 'axios';
import axios from '../axios';
import { mapGetters } from 'vuex';


export default {
    components: {
        AppHeader,
        AudioPlayer,
        MusicLibrary,
    },
    data() {
        return {
            tracks: [],
            currentTrack: null,
        };
    },


    computed: {
        ...mapGetters(['isAuthenticated']),
        showMusicLibrary() {
            return this.isAuthenticated && this.$route.path === '/';
        },
    },

    watch: {
        isAuthenticated(newVal) {
            if (newVal) {
                this.loadTracks();
            }
        },
    },

    // After the component is mounted, the mounted hook will be called, 
    // and the loadTracks method will be called to load the audio file.
    mounted() {
        if (this.isAuthenticated) {
            this.loadTracks();
        }
    },

    methods: {

        async loadTracks() {
            try {
                const response = await axios.get('http://localhost:3000/api/stream');
                this.tracks = response.data.tracks.map(track => ({
                    id: track._id,
                    title: track.title,
                    src: `http://localhost:3000/api/stream/${track.track_id}`,
                    albumArt: `https://picsum.photos/400?random=${Math.random()}`,
                }));
            } catch (error) {
                console.error('Error loading tracks:', error);
            }
        },



        // When the user clicks a track in the music library, this method is triggered, 
        //currentTrack is set to the selected track, and the track is passed to the 
        // AudioPlayer component for playback.

        playTrack(track) {
            this.currentTrack = track;
        },
    },
};
</script>
