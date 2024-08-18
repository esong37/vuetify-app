<template>
    <v-container class="playlist-container">
      <v-card class="pa-5">
        <v-card-title>{{ playlistName }}</v-card-title>
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
        playlistName: '',
        tracks: [], // store mp3
      };
    },
    mounted() {
      this.fetchPlaylist();
    },
    methods: {
      async fetchPlaylist() {
        const { pid } = this.$route.params; 
        try {
          const response = await axios.get(`http://localhost:3000/api/playlist/${pid}`);
          this.playlistName = response.data.playlistName; 
          this.tracks = response.data.tracks; 
        } catch (error) {
          console.error('Error fetching playlist:', error);
        }
      },
      playTrack(track) {
        this.$emit('play-track', track); 
      },
    },
  };
  </script>
  
  <style scoped>
  .track-item {
    cursor: pointer;
  }
  .playlist-container {
    margin-top: 100px;
  }
  </style>
  