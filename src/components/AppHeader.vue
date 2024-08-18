<template>
  <v-app-bar app color="light-grey" elevate-on-scroll>
    <v-toolbar-title>AudioPlayer</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn text to="/">Home</v-btn>
    <v-btn text to="/library">Library</v-btn>
    <v-btn text to="/playlist/1">Playlist</v-btn>
    <v-btn text to="/album/1">Album</v-btn>
    
    <v-form @submit.prevent="handleSearch">
      <v-text-field
        v-model="searchQuery"
        prepend-inner-icon="mdi-magnify"
        label="Search"
        hide-details
        solo-inverted
        flat
      ></v-text-field>
    </v-form>
    
    <v-spacer></v-spacer>
    <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-avatar
          v-bind="attrs"
          v-on="on"
          size="32"
          class="grey darken-1"
        ></v-avatar>
      </template>
      <v-list>
        <v-list-item link to="/login">
          <v-list-item-title>Login</v-list-item-title>
        </v-list-item>
        <v-list-item link to="/register">
          <v-list-item-title>Register</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: '',
    };
  },
  methods: {
    handleSearch() {
      if (this.searchQuery) {
        this.$router.push({ path: '/explore', query: { q: this.searchQuery } });
      }
    },
  },
};
</script>
