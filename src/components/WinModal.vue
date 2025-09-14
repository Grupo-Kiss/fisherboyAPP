<template>
  <div class="modal" v-if="show" @click.self="close">
    <div class="modal-content">
      <span class="close" @click="close">&times;</span>
      <h2>¡GANASTE Fisherboy!</h2>
      <div class="win-buttons">
        <button class="win-btn" @click="openModal('stats')">Compartir Estadísticas</button>
        <button class="win-btn" @click="close">Seguir Jugando</button>
        <button class="win-btn" @click="restartGame">Nuevo Juego</button>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex';
import { computed } from 'vue';

export default {
  name: 'WinModal',
  setup() {
    const store = useStore();
    const show = computed(() => store.state.modals.win);
    const close = () => store.dispatch('toggleModal', 'win');

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

    return {
      show,
      close,
      openModal,
      restartGame,
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
  text-align: center;
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

.win-buttons {
  display: grid;
  grid-template-columns: 1fr;
  gap: 15px;
  margin-top: 20px;
}

.win-btn {
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 15px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  font-size: 1.1em;
}

.win-btn:hover {
  background-color: #45a049;
}
</style>
