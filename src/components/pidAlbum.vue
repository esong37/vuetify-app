<template>
  <v-container class="album-container">
    <v-card class="pa-5">
      <v-card-title>{{ albumName }}</v-card-title>
      <v-card-text>
        <v-list>
          <v-list-item v-for="(track, index) in tracks" :key="track.track_id" @click="playTrack(track)"
            class="track-item">
            <v-list-item-content>
              <v-list-item-title>{{ index + 1 }}. {{ track.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import axios from '../axios'; // 使用配置了 JWT 拦截器的 Axios 实例
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      albumName: '',
      tracks: [], // 存储 mp3 信息
    };
  },
  computed: {
    ...mapGetters(['isAuthenticated']),
  },
  mounted() {
    if (this.isAuthenticated) {
      this.fetchAlbum();
    } else {
      this.$router.push('/login'); // 如果未认证，重定向到登录页面
    }
  },
  methods: {
    async fetchAlbum() {
      const { pid } = this.$route.params; // 获取 pid
      try {
        const response = await axios.get(`http://localhost:3000/api/album/${pid}`);
        this.albumName = response.data.albumName; // 获取专辑名称
        this.tracks = response.data.tracks; // 获取 mp3 文件
      } catch (error) {
        console.error('Error fetching album:', error);
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
          this.$router.push('/login'); // JWT 失效时重定向到登录页面
        }
      }
    },
    playTrack(track) {
      this.$emit('play-track', track); // 触发播放事件
    },
  },
};
</script>

<style scoped>


.track-item {
  cursor: pointer;
}
</style>
