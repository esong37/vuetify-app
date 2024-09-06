<template>
    <v-container>
        <v-row>
            <v-col v-for="track in tracks" :key="track.id" cols="12" sm="6" md="4" lg="3">
                <v-card class="track-card">
                    <v-img :src="track.albumArt || 'https://via.placeholder.com/150'" aspect-ratio="1"
                        alt="Track Image"></v-img>
                    <v-card-title>
                        {{ track.title }}
                    </v-card-title>
                    <v-btn class="add-button" icon @click="addTrackToPlaylist(track)">
                        <v-icon>mdi-plus</v-icon>
                    </v-btn>
                </v-card>
            </v-col>
        </v-row>
        <v-btn color="primary" @click="createPlaylist">Create Playlist</v-btn>
    </v-container>
</template>

<script>
import axios from '../axios';

export default {
    data() {
        return {
            tracks: [], // 用户收藏的 track 类型
            selectedTracks: [] // 用户选择添加到播放列表的曲目
        };
    },
    mounted() {
        this.fetchFavoriteTracks();
    },
    methods: {
        async fetchFavoriteTracks() {
            try {
                const response = await axios.get('http://localhost:3000/api/library');
                const trackItems = response.data.filter(item => item.type === 'track');

                // 根据 trackItems 中的 id 获取详细信息
                for (const track of trackItems) {
                    const trackResponse = await axios.get(`http://localhost:3000/api/track/${track.id}`);
                    this.tracks.push(trackResponse.data);
                }
            } catch (error) {
                console.error('Error fetching favorite tracks:', error);
            }
        },
        addTrackToPlaylist(track) {
            if (!this.selectedTracks.includes(track)) {
                this.selectedTracks.push(track);
            }
        },
        async createPlaylist() {
            try {
                await axios.post('http://localhost:3000/api/playlist/create', {
                    tracks: this.selectedTracks
                });
                this.$router.push('/playlist');
            } catch (error) {
                console.error('Error creating playlist:', error);
            }
        }
    }
};
</script>

<style scoped>
.track-card {
    position: relative;
    cursor: pointer;
}

.add-button {
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
}
</style>
