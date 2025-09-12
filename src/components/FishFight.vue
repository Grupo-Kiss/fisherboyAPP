<template>
  <div class="fish-fight-overlay" v-if="fishFighting">
    <div class="fish-fight-circle" @click="tapToFight">
      <span class="hook-icon">🎣</span>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';

export default {
  name: 'FishFight',
  setup() {
    const store = useStore();

    const fishFighting = computed(() => store.state.fishFighting);

    const tapToFight = () => {
      store.dispatch('tapToFightFish');
    };

    return {
      fishFighting,
      tapToFight,
    };
  },
};
</script>

<style scoped>
.fish-fight-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 2000;
  display: flex;
  justify-content: center;
  align-items: center;
}

.fish-fight-circle {
  width: 150px;
  height: 150px;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border: 5px solid white;
}

.hook-icon {
  font-size: 5em;
  animation: bounce 1s infinite;
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
}
</style>
