<template>
    <v-container>
        <v-row>
            <v-col v-for="playlist in playlists" :key="playlist.pid" cols="12" sm="6" md="4" lg="3">
                <v-card @click="goToPlaylist(playlist.pid)" class="playlist-card">
                    <v-img :src="playlist.image || 'https://via.placeholder.com/150'" aspect-ratio="1"
                        alt="Playlist Image"></v-img>
                    <v-card-title>{{ playlist.name }}</v-card-title>
                    <v-card-subtitle>Last updated: {{ playlist.last_update }}</v-card-subtitle>
                    <v-card-text>{{ playlist.type }}</v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import axios from '../axios';
import { mapGetters } from 'vuex';

export default {
    data() {
        return {
            playlists: [],
        };
    },
    computed: {
        ...mapGetters(['isAuthenticated']),
    },
    mounted() {
        if (this.isAuthenticated) {
            this.fetchPlaylists();
        } else {
            this.$router.push('/login'); 
        }
    },
    methods: {
        async fetchPlaylists() {
            try {
                const response = await axios.get('http://localhost:3000/api/playlist');
                this.playlists = response.data;
            } catch (error) {
                console.error('Error fetching playlists:', error);
                if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                    this.$router.push('/login'); 
                }
            }
        },
        goToPlaylist(pid) {
            this.$router.push(`/playlist/${pid}`); // go to specific pid
        },
    },
};
</script>

<style scoped>
.v-card {
    margin-bottom: 20px;
    cursor: pointer;
}

.playlist-card {
    cursor: pointer;
}
</style>