<template>
  <div id="app">
    <GameContainer />
    <MusicPlayer />
    <WinModal />
  </div>
</template>

<script>
import { onMounted } from 'vue';
import { useStore } from 'vuex';
import GameContainer from './components/GameContainer.vue';
import MusicPlayer from './components/MusicPlayer.vue';
import WinModal from './components/WinModal.vue';

export default {
  name: 'App',
  components: {
    GameContainer,
    MusicPlayer,
    WinModal,
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