<template>
    <v-container>
        <v-row>
            <v-col v-for="album in albums" :key="album.pid" cols="12" sm="6" md="4" lg="3">
                <v-card @click="goToalbum(album.pid)" class="album-card">
                    <v-img :src="album.image || 'https://via.placeholder.com/150'" aspect-ratio="1"
                        alt="album Image"></v-img>
                    <v-card-title>{{ album.name }}</v-card-title>
                    <v-card-subtitle>Last updated: {{ album.last_update }}</v-card-subtitle>
                    <v-card-text>{{ album.type }}</v-card-text>
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
            albums: [],
        };
    },
    computed: {
        ...mapGetters(['isAuthenticated']),
    },
    mounted() {
        if (this.isAuthenticated) {
            this.fetchalbums();
        } else {
            this.$router.push('/login'); 
        }
    },
    methods: {
        async fetchalbums() {
            try {
                const response = await axios.get('http://localhost:3000/api/album');
                this.albums = response.data;
            } catch (error) {
                console.error('Error fetching albums:', error);
                if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                    this.$router.push('/login'); 
                }
            }
        },
        goToalbum(pid) {
            this.$router.push(`/album/${pid}`); // go to specific pid
        },
    },
};
</script>

<style scoped>
.v-card {
    margin-bottom: 20px;
    cursor: pointer;
}

.album-card {
    cursor: pointer;
}
</style>