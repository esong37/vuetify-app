<template>
  <v-container>
    <v-row>
      <v-col v-for="item in libraryItems" :key="item.id" cols="12" sm="6" md="4" lg="3">
        <v-card>
          <v-card-title>{{ item.type }}</v-card-title>
          <v-card-subtitle>Added on: {{ formatDate(item.added_date)  }}</v-card-subtitle>
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
import axios from '../axios';
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      libraryItems: [], // user personal library
    };
  },
  computed: {
    ...mapGetters(['isAuthenticated']),
  },
  mounted() {
    if (this.isAuthenticated) {
      this.fetchLibraryItems();
    } else {
      this.$router.push('/login'); // not login, redirect
    }
  },
  methods: {
    async fetchLibraryItems() {
      try {
        const response = await axios.get('http://localhost:3000/api/library'); // get data
        this.libraryItems = response.data;
      } catch (error) {
        console.error('Error fetching library items:', error);
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
          this.$router.push('/login');
        }
      }
    },
    formatDate(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(date).toLocaleDateString(undefined, options);
    },
  },
};
</script>


