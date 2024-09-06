<template>
    <v-container>
        <!-- 添加创建按钮 -->
        <v-btn class="mb-4" color="primary" @click="goToCreatePlaylist">Create Playlist</v-btn>
        <v-row>
            <v-col v-for="playlist in playlists" :key="playlist.pid" cols="12" sm="6" md="4" lg="3">
                <v-card @click="goToPlaylist(playlist.pid)" class="playlist-card">
                    <v-img :src="playlist.image || 'https://via.placeholder.com/150'" aspect-ratio="1"
                        alt="Playlist Image"></v-img>
                    <v-card-title>
                        {{ playlist.name }}
                    </v-card-title>
                    <v-card-subtitle>Last updated: {{ playlist.last_update }}</v-card-subtitle>
                    <v-card-text>{{ playlist.type }}</v-card-text>

                    <!-- 收藏按钮 -->
                    <v-btn class="favourite-button" icon @click.stop="toggleFavorite(playlist)">
                        <v-icon :color="playlist.isFavorite ? 'yellow' : 'grey'">
                            mdi-star
                        </v-icon>
                    </v-btn>
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
                this.playlists = response.data.map(pl => ({ ...pl, isFavorite: false }));
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
        async toggleFavorite(playlist) {
            try {
                if (playlist.isFavorite) {
                    await axios.delete('http://localhost:3000/api/library', {
                        data: {
                            type: 'playlist',
                            id: playlist.pid
                        }
                    });
                    playlist.isFavorite = false;
                } else {
                    const favoriteData = {
                        type: 'playlist',
                        id: playlist.pid,
                        added_date: new Date().toISOString()
                    };
                    await axios.post('http://localhost:3000/api/album/favorite', favoriteData);
                    playlist.isFavorite = true;
                }
            } catch (error) {
                console.error('Error toggling favorite:', error);
            }
        },
        goToCreatePlaylist() {
            this.$router.push('/create-playlist'); // 导航到创建播放列表的界面
        }
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

.favourite-button {
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
}
</style>
