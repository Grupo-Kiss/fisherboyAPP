<template>
  <div id="ui">
    Money: $<span id="money">{{ money }}</span><br>
    Fish caught: <span id="fishCount">{{ fishCount }}</span>
    <div id="energy-bar">
      <div id="energy-fill" :style="{ width: energy + '%' }"></div>
    </div>
    <div id="time-indicator">Day {{ currentDay }} - {{ formattedTime }}</div>

    <div class="equipment-indicator">
      <div>{{ currentRodName }}</div>
      <div>{{ currentBoatName }}</div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';

export default {
  name: 'UI',
  setup() {
    const store = useStore();

    const money = computed(() => store.state.money);
    const fishCount = computed(() => store.state.commonFishCount + store.state.exoticFishCount);
    const energy = computed(() => store.state.energy);
    const currentDay = computed(() => store.state.currentDay);
    const gameTime = computed(() => store.state.gameTime);

    const formattedTime = computed(() => {
      const hours = Math.floor(gameTime.value / 60);
      const minutes = Math.floor(gameTime.value % 60);
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    });

    const currentRodName = computed(() => {
      return store.state.fishingRods[store.state.currentRod].name;
    });

    const currentBoatName = computed(() => {
      return store.state.boats[store.state.currentBoat].name;
    });

    return {
      money,
      fishCount,
      energy,
      currentDay,
      formattedTime,
      currentRodName,
      currentBoatName,
    };
  },
};
</script>

<style>
#ui {
  position: absolute;
  top: 10px;
  left: 10px;
  color: white;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px;
  border-radius: 5px;
  z-index: 100;
}

#energy-bar {
  width: 100px;
  height: 10px;
  background-color: #555;
  border-radius: 5px;
  overflow: hidden;
  margin-top: 5px;
}

#energy-fill {
  height: 100%;
  background-color: #4caf50;
  transition: width 0.5s;
}

#time-indicator {
  margin-top: 5px;
}

.equipment-indicator {
  position: fixed;
  bottom: 15px;
  left: 15px;
  color: white;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px;
  border-radius: 8px;
  font-family: 'Arial', sans-serif;
  font-size: 14px;
  z-index: 100;
}
</style>