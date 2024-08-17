<template>
    <v-container>
      <v-row>
        <v-col
          v-for="(track, index) in tracks"
          :key="index"
          cols="12"
          sm="4"
          md="3"
        >
          <v-card @click="playTrack(track)" class="music-card">
            <v-img
              :src="track.albumArt || ''"
              aspect-ratio="1"
              class="grey--text text--darken-2"
              alt="Album Art"
            >
              <template v-slot:placeholder>
                <v-skeleton-loader type="image" />
              </template>
            </v-img>
            <v-card-text>{{ track.title }}</v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  export default {
    props: ['tracks'],
    methods: {
      playTrack(track) {
        this.$emit('play-track', track);
      },
    },
  };
  </script>
  
  <style scoped>
  .music-card {
    cursor: pointer;
    text-align: center;
  }
  .v-img {
    background-color: grey;
  }
  </style>
  