<template>
  <div id="app">
    <GameContainer />
    <MusicPlayer />
  </div>
</template>

<script>
import { onMounted } from 'vue';
import { useStore } from 'vuex';
import GameContainer from './components/GameContainer.vue';
import MusicPlayer from './components/MusicPlayer.vue';

export default {
  name: 'App',
  components: {
    GameContainer,
    MusicPlayer,
  },
  setup() {
    const store = useStore();

    onMounted(() => {
      setInterval(() => {
        store.dispatch('showRandomTip');
      }, 120000); // 2 minutes
    });

    return {};
  },
};
</script>

<style>
/* Global styles */
</style>