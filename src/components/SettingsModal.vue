<template>
  <div class="modal" v-if="show" @click.self="close">
    <div class="modal-content">
      <span class="close" @click="close">&times;</span>
      <h2>Configuración</h2>
      <div class="settings-buttons">
        <button class="settings-btn" @click="openModal('instructions')">Instrucciones</button>
        <button class="settings-btn" @click="openModal('stats')">Estadísticas</button>
        <button class="settings-btn" @click="showSpecialEvents = !showSpecialEvents">Eventos Especiales</button>
        <button class="btn-restart" @click="restartGame">Reiniciar Juego</button>
        <button class="btn-credits" @click="openModal('credits')">Créditos</button>
        <button class="btn-github" @click="openGithub">GitHub</button>
        <button class="settings-btn" @click="toggleMusic">
          <i :class="isMuted ? 'fas fa-volume-mute' : 'fas fa-volume-up'"></i>
        </button>
      </div>
      <transition name="fade">
        <div class="special-events" v-if="showSpecialEvents">
          <h3>Eventos Especiales</h3>
          <div class="event-cards">
            <div class="event-card" v-for="event in specialEvents" :key="event.type">
              <i :class="getEventIcon(event.type)"></i>
              <p><strong>{{ event.type.replace(/_/g, ' ') }}</strong></p>
              <p>{{ event.message }}</p>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex';
import { computed, ref } from 'vue';

export default {
  name: 'SettingsModal',
  setup() {
    const store = useStore();
    const show = computed(() => store.state.modals.settings);
    const specialEvents = computed(() => store.state.specialEvents);
    const showSpecialEvents = ref(false);
    const close = () => store.dispatch('toggleModal', 'settings');

    const openModal = (modal) => {
      store.dispatch('toggleModal', modal);
      close();
    };

    const restartGame = () => {
      if (confirm('¿Estás seguro de que quieres reiniciar el juego? Todo tu progreso se perderá.')) {
        store.dispatch('restartGame');
        close();
      }
    };

    const openGithub = () => {
      window.open('https://github.com/Grupo-Kiss/fisherboyAPP/', '_blank');
    };

    const isMuted = computed(() => store.state.musicMuted);
    const toggleMusic = () => store.dispatch('toggleMusic');

    const getEventIcon = (type) => {
      switch (type) {
        case 'storm':
          return 'fas fa-bolt';
        case 'treasure_hunt':
          return 'fas fa-gem';
        case 'golden_fish_festival':
          return 'fas fa-fish';
        case 'night_of_the_sharks':
          return 'fas fa-fish';
        case 'meteor_shower':
          return 'fas fa-meteor';
        case 'trash_cleanup_day':
          return 'fas fa-recycle';
        case 'exotic_fish_migration':
          return 'fas fa-fish';
        case 'fishermans_holiday':
          return 'fas fa-umbrella-beach';
        case 'low_tide':
          return 'fas fa-water';
        case 'high_tide':
          return 'fas fa-water';
        default:
          return 'fas fa-star';
      }
    };

    return {
      show,
      close,
      openModal,
      restartGame,
      openGithub,
      isMuted,
      toggleMusic,
      specialEvents,
      showSpecialEvents,
      getEventIcon,
    };
  },
};
</script>

<style scoped>
.modal {
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 1000;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: #222222;
  padding: 30px;
  width: 80%;
  max-width: 500px;
  border-radius: 15px;
  color: white;
  position: relative;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

.close {
  color: #aaa;
  position: absolute;
  top: 15px;
  right: 20px;
  font-size: 32px;
  font-weight: bold;
  cursor: pointer;
  transition: color 0.3s ease;
}

.close:hover,
.close:focus {
  color: #fff;
}

h2 {
  text-align: center;
  margin-bottom: 20px;
  color: #ffd700;
}

.settings-buttons {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
}

.settings-btn {
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 15px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  font-size: 1.1em;
}

.settings-btn:hover {
  background-color: #45a049;
}

.btn-restart {
  grid-column: 1 / -1;
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 15px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  font-size: 1.1em;
  margin-top: 15px;
}

.btn-restart:hover {
  background-color: #c0392b;
}

.btn-credits {
  grid-column: 1 / -1;
  background-color: #3498db;
  color: white;
  border: none;
  padding: 15px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  font-size: 1.1em;
  margin-top: 15px;
}

.btn-credits:hover {
  background-color: #2980b9;
}

.btn-github {
  grid-column: 1 / -1;
  background-color: #000000;
  color: white;
  border: none;
  padding: 15px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  font-size: 1.1em;
  margin-top: 15px;
}

.btn-github:hover {
  background-color: #333333;
}

.special-events {
  margin-top: 20px;
  text-align: left;
}

.special-events h3 {
  color: #ffd700;
  text-align: center;
  margin-bottom: 10px;
}

.event-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
  max-height: 300px;
  overflow-y: auto;
  padding-right: 10px;
}

.event-cards::-webkit-scrollbar {
  width: 8px;
}

.event-cards::-webkit-scrollbar-track {
  background: #222;
}

.event-cards::-webkit-scrollbar-thumb {
  background: #ffd700;
  border-radius: 4px;
}

.event-cards::-webkit-scrollbar-thumb:hover {
  background: #e6c300;
}

.event-card {
  background-color: #333;
  padding: 15px;
  border-radius: 10px;
  text-align: center;
  transition: transform 0.3s ease;
}

.event-card:hover {
  transform: translateY(-5px);
}

.event-card i {
  font-size: 2em;
  margin-bottom: 10px;
  color: #ffd700;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

@media (max-width: 768px) {
  .modal-content {
    width: 95%;
    padding: 15px;
    max-height: 90vh;
    overflow-y: auto;
  }

  h2 {
    font-size: 1.5em;
    margin-bottom: 15px;
  }
}
</style>
