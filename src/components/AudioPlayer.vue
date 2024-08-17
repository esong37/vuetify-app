<template>
    <v-footer app fixed padless>
      <v-col class="player-container">
        <v-audio-player
          v-if="currentTrack"
          :src="currentTrack ? currentTrack.src : ''"
          :track-title="currentTrack ? currentTrack.title : ''"
          :album-art="currentTrack ? currentTrack.albumArt : ''"
          allow-previous
          allow-next
          :compact="$vuetify.breakpoint.smAndDown"
          :autoplay="true"
          prev-track-icon="mdi-skip-previous"
          next-track-icon="mdi-skip-next"
          back-forward-icon="mdi-rewind-5"
          fast-forward-icon="mdi-fast-forward-5"
          play-icon="mdi-play"
          pause-icon="mdi-pause"
          mute-volume-icon="mdi-volume-off"
          low-volume-icon="mdi-volume-low"
          medium-volume-icon="mdi-volume-medium"
          high-volume-icon="mdi-volume-high"
        />
      </v-col>
    </v-footer>
</template>
  
  <script>
  export default {
    props: ['currentTrack'],
    components: {
    VAudioPlayer: () => import("@woodydark/vuetify-audio-player"),
  },
  };
  </script>
  
  <style scoped>
  .player-container {
    width: 100%;
    background-color: #fff;
    box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1);
  }
  </style>
  