<template>
  <v-container>
    <v-row>
      <v-col v-for="(track, index) in tracks" :key="index" cols="12" sm="4" md="3">
        <v-card @click="playTrack(track)" class="music-card">
          <v-img :src="track.albumArt || ''" aspect-ratio="1" class="grey--text text--darken-2" alt="Album Art">
            <template v-slot:placeholder>
              <v-skeleton-loader type="image" />
            </template>
          </v-img>
          <v-card-text>{{ track.title }}</v-card-text>
          <!-- add to library -->
          <v-icon small color="yellow" class="favorite-icon" @click.stop="toggleFavorite(track)">
            {{ track.isFavorite ? 'mdi-star' : 'mdi-star-outline' }}
          </v-icon>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from '../axios'; 
import { mapGetters } from 'vuex';

export default {
  props: ['tracks'],
  computed: {
    ...mapGetters(['isAuthenticated']),
  },
  methods: {
    playTrack(track) {
      this.$emit('play-track', track);
    },
    async toggleFavorite(track) {
      if (!this.isAuthenticated) {
        this.$router.push('/login'); 
        return;
      }

      try {
        const favoriteData = {
          type: track.type || 'track',
          id: track.id,
          added_date: new Date().toISOString(),
        };

        // to backend
        await axios.post(`http://localhost:3000/api/library/favorite`, favoriteData);

        track.isFavorite = !track.isFavorite;
      } catch (error) {
        console.error('Error toggling favorite:', error);
      }
    },
  },
};
</script>

<style scoped>
.music-card {
  cursor: pointer;
  text-align: center;
  position: relative;
}

.v-img {
  background-color: grey;
}

.favorite-icon {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
}
</style>
