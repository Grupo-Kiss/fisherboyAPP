<template>
  <div class="water" :class="[currentPartOfDay, { 'storm-active': stormActive }]" :style="{ height: '100%' }">
    <div
      v-for="fish in fishes"
      :key="fish.id"
      class="fish"
      :class="{ 'exotic': fish.isExotic }"
      :style="{
        top: fish.y + '%',
        left: fish.x + '%',
        transform: `scale(${fish.scale})` + (fish.direction === -1 ? ' scaleX(-1)' : '')
      }"
      v-html="fish.shape"
    ></div>
    <div
      v-for="bubble in bubbles"
      :key="bubble.id"
      class="bubble"
      :style="{
        left: bubble.x + '%',
        top: bubble.y + '%',
        width: bubble.size + 'px',
        height: bubble.size + 'px'
      }"
    ></div>
  </div>
</template>

<script>
import { useStore } from 'vuex';
import { computed, ref, onMounted, onUnmounted } from 'vue';

export default {
  name: 'Water',
  setup() {
    const store = useStore();
    const fishes = ref([]);
    const bubbles = ref([]);
    let fishInterval = null;
    let bubbleInterval = null;
    let animationFrameId = null;

    const stormActive = computed(() => store.getters.getStormActive);
    const currentPartOfDay = computed(() => store.getters.getCurrentPartOfDay);
    const fishTypes = computed(() => store.state.fishTypes);

    const fishShapes = [
      `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none"><path d="M95 50 C80 80 40 80 20 50 C40 20 80 20 95 50 Z" fill="{color}"/></svg>`,
      `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none"><path d="M90 50 C70 90 30 90 10 50 C30 10 70 10 90 50 Z" fill="{color}"/></svg>`,
      `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none"><path d="M98 50 C70 70 40 80 15 65 C10 50 10 50 15 35 C40 20 70 30 98 50 Z" fill="{color}"/></svg>`
    ];

    const createFish = () => {
      const fishType = fishTypes.value[Math.floor(Math.random() * fishTypes.value.length)];
      const direction = Math.random() > 0.5 ? 1 : -1; // 1 for right, -1 for left
      const scale = Math.random() * 0.5 + 0.2; // Random scale between 0.2 and 0.7
      const speed = (Math.random() * 0.1 + 0.05) * direction; // Varying speed
      const y = Math.random() * 80; // 0-80% from top of water
      const x = direction === 1 ? -10 : 110; // Start off-screen
      const shape = fishShapes[Math.floor(Math.random() * fishShapes.length)].replace('{color}', fishType.color);

      fishes.value.push({
        id: Date.now() + Math.random(),
        type: fishType.name,
        color: fishType.color,
        direction,
        scale,
        speed,
        y,
        x,
        startY: y,
        angle: Math.random() * 360,
        amplitude: Math.random() * 2 + 1, // Oscillation amplitude
        frequency: Math.random() * 0.05 + 0.01, // Oscillation frequency
        isExotic: fishType.isExotic || false,
        shape,
      });
    };

    const createBubble = () => {
      bubbles.value.push({
        id: Date.now() + Math.random(),
        x: Math.random() * 100,
        y: 110, // Start from bottom
        size: Math.random() * 8 + 2, // 2px to 10px
        speed: Math.random() * 0.1 + 0.05,
      });
    };

    const animate = () => {
      // Animate fishes
      fishes.value = fishes.value.filter(fish => {
        fish.x += fish.speed;
        fish.angle += fish.frequency;
        fish.y = fish.startY + Math.sin(fish.angle) * fish.amplitude;

        return fish.x > -15 && fish.x < 115;
      });

      // Animate bubbles
      bubbles.value = bubbles.value.filter(bubble => {
        bubble.y -= bubble.speed;
        return bubble.y > -10;
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    onMounted(() => {
      fishInterval = setInterval(createFish, 1500); // Create a fish more frequently
      bubbleInterval = setInterval(createBubble, 500); // Create bubbles
      animate();
    });

    onUnmounted(() => {
      clearInterval(fishInterval);
      clearInterval(bubbleInterval);
      cancelAnimationFrame(animationFrameId);
    });

    return {
      stormActive,
      fishes,
      bubbles,
      currentPartOfDay,
    };
  },
};
</script>

<style scoped>
/* Estilos para Water */
.water {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(180deg, #0066cc 0%, #003366 100%); /* Default to noon */
    opacity: 0.8;
    z-index: 0;
    overflow: hidden; /* Asegura que los peces no se salgan del agua */
    transition: background 5s ease-in-out;
}

.water.dawn {
    background: linear-gradient(180deg, #ffcf8c 0%, #0066cc 100%);
}

.water.noon {
    background: linear-gradient(180deg, #0066cc 0%, #003366 100%);
}

.water.afternoon {
    background: linear-gradient(180deg, #ff8c69 0%, #8a2be2 100%);
}

.water.night {
    background: linear-gradient(180deg, #001428 0%, #000810 100%);
}

.water.storm-active {
    background: linear-gradient(180deg, #004080 0%, #001f3f 100%);
    animation: waves 2s ease-in-out infinite;
}

@keyframes waves {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(10px); }
}

/* Estilos base para los peces */
.fish {
    position: absolute;
    width: 50px;
    height: 50px;
    opacity: 0.7;
    z-index: 1;
    will-change: transform, left, top;
}

.fish.exotic {
    filter: drop-shadow(0 0 8px #ffd700) drop-shadow(0 0 15px #ffd700);
    opacity: 1;
}

/* Bubble styles */
.bubble {
  position: absolute;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  z-index: 1;
  will-change: transform, top;
}
</style>