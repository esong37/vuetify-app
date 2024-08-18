<template>
    <v-container class="explore-container">
      <v-card class="pa-5" v-if="topResult">
        <v-card-title>Top result</v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="12" sm="6" md="4" lg="3">
              <v-card @click="playTrack(topResult)" class="music-card">
                <v-img
                  :src="topResult.albumArt"
                  aspect-ratio="1"
                  class="grey--text text--darken-2"
                  alt="Album Art"
                ></v-img>
                <v-card-text>{{ topResult.title }}</v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
      <v-alert v-else type="info">No matching results found for "{{ searchQuery }}".</v-alert>
    </v-container>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        searchQuery: '',
        topResult: null,
      };
    },
    watch: {
      '$route.query.q': 'fetchSearchResults',
    },
    mounted() {
      this.searchQuery = this.$route.query.q || '';
      this.fetchSearchResults();
    },
    methods: {
      async fetchSearchResults() {
        this.searchQuery = this.$route.query.q || '';
        if (this.searchQuery) {
          try {
            const response = await axios.get('http://localhost:3000/api/stream', {
              params: { q: this.searchQuery },
            });
  
            // find track
            const matchingTrack = response.data.tracks.find(track =>
            track.title.toLowerCase().includes(this.searchQuery.toLowerCase())
            );
            if (matchingTrack) {

            this.topResult = {
                ...matchingTrack,
                src: `http://localhost:3000/api/stream/${matchingTrack.track_id}`, // 构建音频流的 URL
                albumArt: `https://picsum.photos/400?random=${Math.random()}`,
            };
            } else {
            this.topResult = null;
            }



          } catch (err) {
            console.error('Error fetching search results:', err);
          }
        }
      },
      playTrack(track) {
        this.$emit('play-track', track);
      },
    },
  };
  </script>
  
  <style scoped>
  .explore-container {
    margin-top: 60px;
  }
  .music-card {
    cursor: pointer;
    text-align: center;
  }
  .v-img {
    background-color: grey;
  }
  </style>
  