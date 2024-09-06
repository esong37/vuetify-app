<template>
    <v-container>
        <v-row>
            <v-col v-for="album in albums" :key="album.pid" cols="12" sm="6" md="4" lg="3">
                <v-card class="album-card">
                    <v-img :src="album.image || 'https://via.placeholder.com/150'" aspect-ratio="1"
                        alt="Album Image"></v-img>
                    <v-card-title>{{ album.name }}</v-card-title>
                    <v-card-subtitle>Last updated: {{ album.last_update }}</v-card-subtitle>
                    <v-card-text>{{ album.type }}</v-card-text>

                    <!-- 收藏按钮 -->
                    <v-icon small color="yellow" class="favorite-icon" @click.stop="toggleFavorite(album)">
                        {{ album.isFavorite ? 'mdi-star' : 'mdi-star-outline' }}
                    </v-icon>

                    <!-- 点击卡片跳转到特定的 album 页面 -->
                    <v-btn @click="goToalbum(album.pid)" color="primary">View Album</v-btn>
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
                this.albums = response.data.map(album => ({
                    ...album,
                    isFavorite: false, // 默认初始为未收藏状态
                }));
            } catch (error) {
                console.error('Error fetching albums:', error);
                if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                    this.$router.push('/login');
                }
            }
        },
        goToalbum(pid) {
            this.$router.push(`/album/${pid}`); // 导航到特定的 pid
        },
        async toggleFavorite(album) {
            if (!this.isAuthenticated) {
                this.$router.push('/login'); // 如果未认证，重定向到登录页面
                return;
            }

            try {
                const favoriteData = {
                    type: 'album', // 设置类型为 'album'
                    id: album.pid, // 专辑的 pid
                    added_date: new Date().toISOString(),
                };

                if (!album.isFavorite) {
                    // 发送收藏请求到后端
                    await axios.post('http://localhost:3000/api/album/favorite', favoriteData);
                } else {
                    // 发送删除请求到后端
                    await axios.delete('http://localhost:3000/api/album/favorite', { data: favoriteData });
                }

                // 切换本地状态
                album.isFavorite = !album.isFavorite;
            } catch (error) {
                console.error('Error toggling favorite:', error);
            }
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
    position: relative;
}

.favorite-icon {
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
}
</style>