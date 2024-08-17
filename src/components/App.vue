<template>
    <v-app>
      <!-- Header -->
      <AppHeader />
  
      <!-- 音乐库 -->
       <!-- 引用了 MusicLibrary 组件，
        将 tracks 数据传递给它。
        @play-track="playTrack" 是一个事件绑定，当用户点击某个音轨时，触发 playTrack 方法。 -->
      <MusicLibrary :tracks="tracks" @play-track="playTrack" />
  
      <!-- 固定在页面底部的播放器 -->
       <!-- 将 currentTrack 数据传递给它 -->
      <AudioPlayer :currentTrack="currentTrack" />
    </v-app>
  </template>
  
  <script>
    import AppHeader from './AppHeader.vue';
    import AudioPlayer from './AudioPlayer.vue';
    import MusicLibrary from './MusicLibrary.vue';

  
  export default {
    // 将导入的组件注册为当前组件的子组件，以便在模板中使用它们
    components: {
      AppHeader,
      AudioPlayer,
      MusicLibrary,
    },
    data() {
      return {
        tracks: [],
        currentTrack: null,
      };
    },
    // 组件挂载完成后，mounted 钩子会被调用，此时会调用 loadTracks 方法加载音频文件。
    mounted() {
      this.loadTracks();
    },
    methods: {
        // 加载音频文件数据并将其存储在 tracks 数组中，供 MusicLibrary 组件使用。
      loadTracks() {
        this.tracks = [
          { title: 'Track 1', src: '/library/nt4.mp3', albumArt: "https://fastly.picsum.photos/id/896/400/400.jpg?hmac=t5cSR3FAX0B8F6RdKvfOrL0y7Ams72GPlnRbmN_arA4" },
          { title: 'Track 2', src: '/library/oxp.mp3', albumArt: "https://fastly.picsum.photos/id/236/400/400.jpg?hmac=I-dzKO4vSyJQINuwJmpfiLsdHeRGLz5AWI9FE9zjDUc" },
        ];
      },
      // 当用户点击音乐库中的某个音轨时，会触发此方法，将 currentTrack 设置为选中的音轨，并将该音轨传递给 AudioPlayer 组件以便播放。
      playTrack(track) {
        this.currentTrack = track;
      },
    },
  };
  </script>
