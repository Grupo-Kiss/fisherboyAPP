<template>
  <div id="ui-overlay">
    <div id="top-left-panel">
      <div class="stats-line">
        <div class="stat-item">💰 {{ getMoney }}</div>
        <div class="stat-item">🐟 {{ getCommonFishCount }}</div>
        <div class="stat-item">✨ {{ getExoticFishCount }}</div>
        <div class="stat-item">🗑️ {{ getTrashCount }}</div>
        <div class="stat-item">💎 {{ getTreasuresCount }}</div>
      </div>
      <div class="stats-line">
        <div class="stat-item">{{ currentZoneName }}</div>
        <div class="stat-item">{{ formattedTime }}</div>
        <Weather />
      </div>
    </div>

    <div id="energy-bar-container" :class="energyColorClass">
      <div id="energy-fill" :style="{ height: getEnergy + '%' }"></div>
    </div>

    <img src="/src/img/muelle.svg" alt="Muelle" class="muelle-img" />

    <div id="deep-fish-button-container">
      <button class="btn-icon" @click="startDeepFishing">⚓<span class="btn-label"></span></button>
      <button class="btn-icon" @click="useConsumable('coffee')" :disabled="consumableInventory.coffee === 0">☕<span class="btn-label"> ({{ consumableInventory.coffee }})</span></button>
      <button class="btn-icon" @click="useConsumable('energyDrink')" :disabled="consumableInventory.energyDrink === 0">🥤<span class="btn-label"> ({{ consumableInventory.energyDrink }})</span></button>
    </div>

    <MessageConsole />
    <div id="bottom-bar">
        <button class="btn-icon" @click="goToSleep" :disabled="!canSleep">🛏️<span class="btn-label"></span><span class="btn-text">(${{ sleepCost }})</span></button>
        <button class="btn-icon" @click="toggleModal('recycle')">♻️<span class="btn-label"></span></button>
        <button class="btn-icon" @click="toggleModal('market')">🛒<span class="btn-label"></span></button>
        <button class="btn-icon" @click="openMap">🗺️<span class="btn-label"></span></button>
        <button class="btn-icon" @click="toggleModal('settings')">⚙️<span class="btn-label"></span></button>
    </div>

    <!-- Mobile controls will go here -->

    <!-- Bottom bar will go here -->

    <!-- Mobile controls will go here -->

    <!-- Fish fight mini-game will go here -->
  </div>
</template>

<script>
import { computed, watchEffect } from 'vue';
import { useStore } from 'vuex';
import Weather from './Weather.vue';
import MessageConsole from './MessageConsole.vue';

export default {
  name: 'UIOverlay',
  components: {
    Weather,
    MessageConsole,
  },
  setup() {
    const store = useStore();

    const getEnergy = computed(() => store.getters.getEnergy);
    const energyColorClass = computed(() => {
      if (getEnergy.value > 50) return 'energy-high';
      if (getEnergy.value > 20) return 'energy-medium';
      return 'energy-low';
    });
    const messages = computed(() => store.state.messages);
    const currentPartOfDay = computed(() => store.getters.getCurrentPartOfDay);

    const currentDay = computed(() => store.state.currentDay);

    const sleepCost = computed(() => {
      return 1400 + currentDay.value * 100;
    });

    const canSleep = computed(() => store.getters.getMoney >= sleepCost.value);

    watchEffect(() => {
      document.body.className = currentPartOfDay.value;
    });

    const currentZone = computed(() => store.state.zones.find(z => z.id === store.state.currentZone));
    const currentZoneName = computed(() => currentZone.value ? currentZone.value.name : '');
    const currentZoneColor = computed(() => currentZone.value ? currentZone.value.color : 'rgba(0, 0, 0, 0.7)');

    return {
      getMoney: computed(() => store.getters.getMoney),
      getCommonFishCount: computed(() => store.getters.getCommonFishCount),
      getExoticFishCount: computed(() => store.getters.getExoticFishCount),
      getTrashCount: computed(() => store.getters.getTrashCount),
      getTreasuresCount: computed(() => store.getters.getTreasuresCount),
      getEnergy,
      energyColorClass,
      sleepCost,
      consumableInventory: computed(() => store.getters.getConsumableInventory),
      formattedTime: computed(() => {
        const totalMinutes = Math.round(store.getters.getGameTime);
        let hours = Math.floor(totalMinutes / 60) % 24;
        let minutes = totalMinutes % 60;

        const gameDay = store.state.currentDay;
        const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
        const monthIndex = (gameDay - 1) % 12;
        const dayOfMonth = Math.floor((gameDay - 1) / 12) + 1;
        const monthName = months[monthIndex];

        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')} - ${dayOfMonth} de ${monthName}`;
      }),
      goToSleep: () => store.dispatch('goToSleep'),
      startDeepFishing: () => store.dispatch('startDeepFishing'),
      useConsumable: (consumable) => store.dispatch('useConsumable', consumable),
      toggleModal: (modal) => store.dispatch('toggleModal', modal),
      openMap: () => store.dispatch('toggleModal', 'map'),
      getModals: computed(() => store.getters.getModals),
      messages,
      canSleep,
      currentDay,
      currentZoneName,
      currentZoneColor,
      fishFighting: computed(() => store.state.fishFighting),
      fishFightProgress: computed(() => store.state.fishFightProgress),
      fishFightRequiredTaps: computed(() => store.state.fishFightRequiredTaps),
      fishFightTimer: computed(() => store.state.fishFightTimer),
      tapToFightFish: () => store.dispatch('tapToFightFish'),
      moveBoat: (coords) => store.dispatch('moveBoat', coords),
    };
  },
};
</script>

<style scoped>
/* CSS will go here */

#top-left-panel {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.75);
  color: white;
  border-radius: 0;
  box-shadow: 0 2px 5px rgba(0,0,0,0.2);
  z-index: 100;
  padding: 5px 10px;
}

.stats-line {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2px 0;
}

.stat-item {
  font-size: 0.8em;
  display: flex;
  align-items: center;
  gap: 5px;
}

#energy-bar-container {
  position: fixed;
  top: 50%;
  left: 10px;
  transform: translateY(-50%);
  width: 20px;
  height: 150px;
  background: rgba(0,0,0,0.6);
  border-radius: 10px;
  overflow: hidden;
  z-index: 100;
  border: 2px solid rgba(255, 255, 255, 0.3);
}

#energy-fill {
  width: 100%;
  transition: height 0.5s, background-color 0.5s;
  position: absolute;
  bottom: 0;
}

.energy-high #energy-fill {
  background-color: #01f80a;
}

.energy-medium #energy-fill {
  background-color: #fc7d07;
}

.energy-low #energy-fill {
  background-color: #ff1201;
}

#current-zone {
  margin-top: 10px;
  font-size: 1.2em;
  font-weight: bold;
  color: #ffd700;
}

.muelle-img {
  position: fixed;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  width: 300px; /* Adjust as needed */
  height: auto;
  z-index: 90; /* Below info panels (z-index 100) */
}

#deep-fish-button-container {
  position: fixed;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  z-index: 100;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

#bottom-bar {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: space-around;
    background: rgba(0, 0, 0, 0.85);
    padding: 10px 0;
    z-index: 100;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.btn-icon {
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    color: white;
    font-size: 1.8em;
    cursor: pointer;
    border-radius: 50%;
    width: 60px;
    height: 60px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    transition: all 0.2s ease-in-out;
}

.btn-icon:active {
    transform: scale(0.9);
    background: rgba(255, 255, 255, 0.2);
}

.btn-label {
    font-size: 0.4em;
    margin-top: 5px;
}

.btn-text {
    font-size: 0.5em;
    display: block;
}
</style>