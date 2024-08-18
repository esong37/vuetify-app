<template>
    <v-container>
      <v-row>
        <v-col
          v-for="item in libraryItems"
          :key="item.id"
          cols="12"
          sm="6"
          md="4"
          lg="3"
        >
          <v-card>
            <v-card-title>{{ item.type }}</v-card-title>
            <v-card-subtitle>Added on: {{ item.added_date }}</v-card-subtitle>
            <v-card-text>
              <v-icon v-if="item.type === 'track'">mdi-music</v-icon>
              <v-icon v-else-if="item.type === 'album'">mdi-album</v-icon>
              <v-icon v-else-if="item.type === 'playlist'">mdi-playlist-music</v-icon>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        libraryItems: [], // user personal library
      };
    },
    mounted() {
      this.fetchLibraryItems();
    },
    methods: {
      async fetchLibraryItems() {
        try {
          const response = await axios.get('http://localhost:3000/api/library'); // get library data
          this.libraryItems = response.data;
        } catch (error) {
          console.error('Error fetching library items:', error);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .library-container {
    margin-top: 60px; 
  }
  </style>
  