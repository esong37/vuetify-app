<template>
    <v-container class = "album-container">
      <v-card class="pa-5">
        <v-card-title>{{ albumName }}</v-card-title>
        <v-card-text>
          <v-list>
            <v-list-item
              v-for="(track, index) in tracks"
              :key="track.track_id"
              @click="playTrack(track)"
              class="track-item"
            >
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
  import axios from 'axios';
  
  export default {
    data() {
      return {
        albumName: '',
        tracks: [], // store mp3 info
      };
    },
    mounted() {
      this.fetchAlbum();
    },
    methods: {
      async fetchAlbum() {
        const { pid } = this.$route.params; // get pid
        try {
          const response = await axios.get(`http://localhost:3000/api/album/${pid}`);
          this.albumName = response.data.albumName; // album name
          this.tracks = response.data.tracks; // get mp3 files
        } catch (error) {
          console.error('Error fetching album:', error);
        }
      },
      playTrack(track) {
        this.$emit('play-track', track); // Triggering a playback event
      },
    },
  };
  </script>
  
  <style scoped>
  .album-container{
    margin-top: 100px;
  }
  .track-item {
    cursor: pointer;
  }
  
  </style>
  