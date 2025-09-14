<template>
  <div id="ui-overlay">
    <div id="top-left-panel">
        <div class="stat-item">💰 {{ getMoney }}</div>
        <div class="stat-item">🐟 {{ getCommonFishCount }}</div>
        <div class="stat-item">✨ {{ getExoticFishCount }}</div>
        <div class="stat-item">🗑️ {{ getTrashCount }}</div>
        <div class="stat-item">💎 {{ getTreasuresCount }}</div>
        <div class="stat-item">{{ formattedTime }}</div>
        <div class="stat-item">{{ seasonIcon }}</div>
        <div class="stat-item">{{ temperature }}°C</div>
        <div class="stat-item">📍 {{ currentZoneName }}</div>
        <div class="stat-item">🎣 {{ currentRodName }}</div>
        <div class="stat-item">🚤 {{ currentBoatName }}</div>
      <div id="energy-bar-container" :class="energyColorClass">
        <div id="energy-fill" :style="{ width: getEnergy + '%' }"></div>
      </div>
    </div>

    <img src="/src/img/muelle.svg" alt="Muelle" class="muelle-img" />

    <div id="consumable-buttons">
      <button class="btn-icon" @click="useConsumable('coffee')" :disabled="consumableInventory.coffee === 0">☕<span class="btn-label">{{ consumableInventory.coffee }}</span></button>
      <button class="btn-icon" @click="useConsumable('energyDrink')" :disabled="consumableInventory.energyDrink === 0">🥤<span class="btn-label">{{ consumableInventory.energyDrink }}</span></button>
      <button class="btn-icon" @click="goToSleep" :disabled="!canSleep">🛏️<span class="btn-label"></span><span class="btn-text">${{ sleepCost }}</span></button>
    </div>

    <div id="deep-fish-button-container">
      <button class="btn-icon" @click="startDeepFishing">⚓<span class="btn-label"></span></button>
      <button class="btn-icon" @click="recycleAllTrash">♻️<span class="btn-label"></span></button>
      <button class="btn-icon" @click="sellAllFish">💰<span class="btn-label"></span></button>
    </div>

    <MessageConsole />

    <div v-if="eventActive" class="event-tag">
      {{ currentEvent.message }}
    </div>

    <div id="bottom-bar">
        <button class="btn-icon" @click="toggleModal('market')">🛒<span class="btn-label"></span></button>
        <button class="btn-icon" @click="openMap">🗺️<span class="btn-label"></span></button>
        <button class="btn-icon" @click="toggleModal('treasures')">💎<span class="btn-label"></span></button>
        <button class="btn-icon" @click="toggleModal('goals')">🎯<span class="btn-label"></span></button>
        <button class="btn-icon" @click="toggleModal('settings')">⚙️<span class="btn-label"></span></button>
    </div>
  </div>
</template>

<script>
import { computed, watchEffect } from 'vue';
import { useStore } from 'vuex';
import MessageConsole from './MessageConsole.vue';

export default {
  name: 'UIOverlay',
  components: {
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

    const temperature = computed(() => store.getters.getTemperature);

    const seasonIcon = computed(() => {
      switch (store.getters.getCurrentSeason) {
        case 'spring': return '🌸';
        case 'summer': return '☀️';
        case 'autumn': return '🍂';
        case 'winter': return '❄️';
        default: return '';
      }
    });

    const eventActive = computed(() => store.state.eventActive);
    const currentEvent = computed(() => store.state.currentEvent);

    const currentRodName = computed(() => {
      return store.state.fishingRods[store.state.currentRod].name;
    });

    const currentBoatName = computed(() => {
      return store.state.boats[store.state.currentBoat].name;
    });

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
      temperature,
      seasonIcon,
      recycleAllTrash: () => store.dispatch('recycleAllTrash'),
      sellAllFish: () => store.dispatch('sellAllFish'),
      eventActive,
      currentEvent,
      currentRodName,
      currentBoatName,
    };
  },
};
</script>

<style scoped>
@keyframes shine {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}

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
  padding: 5px;
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}

.stat-item {
  background-color: rgba(0, 0, 0, 0.5);
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 0.8em;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  flex-grow: 1;
  text-align: center;
}

#energy-bar-container {
  width: 100%;
  height: 12px; /* Slightly thicker */
  background: rgba(0,0,0,0.8);
  margin-top: 4px;
  border-radius: 6px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: inset 0 1px 3px rgba(0,0,0,0.5);
}

#energy-fill {
  height: 100%;
  transition: width 0.5s, background 0.5s;
  border-radius: 6px;
  background-size: 200% 100%;
  animation: shine 3s linear infinite;
}

.energy-high #energy-fill {
  background: linear-gradient(45deg, #28a745, #218838);
}

.energy-medium #energy-fill {
  background: linear-gradient(45deg, #ffc107, #e0a800);
}

.energy-low #energy-fill {
  background: linear-gradient(45deg, #dc3545, #c82333);
}

#current-zone {
  margin-top: 10px;
  font-size: 1.2em;
  font-weight: bold;
  color: #ffd700;
}

.muelle-img {
  position: fixed;
  top: 60%;
  left: 0;
  transform: translateY(-50%);
  width: 300px; /* Adjust as needed */
  height: auto;
  z-index: 90; /* Below info panels (z-index 100) */
}

#deep-fish-button-container {
  position: fixed;
  top: 110px; /* Adjusted top position */
  right: 10px;
  z-index: 100;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

#consumable-buttons {
  position: fixed;
  top: 110px; /* Adjusted top position */
  left: 10px;
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
    justify-content: center;
    background: rgba(0, 0, 0, 0.85);
    padding: 5px;
    z-index: 100;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    gap: 4px;
}

.btn-icon {
    background-color: rgba(0, 0, 0, 0.5);
    border: 1px solid rgba(255, 255, 255, 0.2);
    color: white;
    font-size: 1.8em;
    cursor: pointer;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    transition: all 0.2s ease-in-out;
    flex-grow: 1;
    padding: 5px 0;
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

.event-tag {
  position: fixed;
  bottom: 85px; /* Above the bottom bar */
  right: 20px;
  background-color: yellow;
  color: black;
  padding: 8px 15px;
  border-radius: 15px;
  font-size: 0.9em;
  font-weight: bold;
  z-index: 101;
  box-shadow: 0 2px 10px rgba(0,0,0,0.2);
}
</style>