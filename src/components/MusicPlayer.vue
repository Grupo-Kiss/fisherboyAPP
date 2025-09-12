<template>
  <div></div>
</template>

<script>
import { ref, watch, onMounted } from 'vue';
import { useStore } from 'vuex';

// Import music files
import afternoon from '../music/afternoon.mp3';
import afternoon2 from '../music/afternoon2.mp3';
import dawn from '../music/dawn.mp3';
import dawn2 from '../music/dawn2.mp3';
import night from '../music/night.mp3';
import night2 from '../music/night2.mp3';
import noon from '../music/noon.mp3';
import noon2 from '../music/noon2.mp3';

export default {
  name: 'MusicPlayer',
  setup() {
    const store = useStore();
    const audio = ref(new Audio());
    const playlist = [afternoon, afternoon2, dawn, dawn2, night, night2, noon, noon2];
    let currentTrackIndex = 0;

    const playNextTrack = () => {
      currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
      audio.value.src = playlist[currentTrackIndex];
      audio.value.play();
    };

    onMounted(() => {
      audio.value.addEventListener('ended', playNextTrack);
      audio.value.src = playlist[currentTrackIndex];
    });

    watch(() => store.state.musicMuted, (isMuted) => {
      audio.value.muted = isMuted;
      if (!isMuted && audio.value.paused) {
        audio.value.play();
      }
    });

    return {};
  },
};
</script>
