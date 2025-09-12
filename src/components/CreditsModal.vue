<template>
  <div class="modal" v-if="show" @click.self="close">
    <div class="modal-content">
      <span class="close" @click="close">&times;</span>
      <h2>Créditos</h2>
      <div class="credits-content">
        <p><strong>Desarrollador:</strong> Moro</p>
        <p><strong>Música:</strong> Martín Colombres</p>
        <p><strong>Sonidos:</strong> Elixcopter</p>
        <p>&copy; 2025 FisherBoy v5</p>
        <button class="share-btn" @click="share">Compartir</button>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex';
import { computed } from 'vue';

export default {
  name: 'CreditsModal',
  setup() {
    const store = useStore();
    const show = computed(() => store.state.modals.credits);
    const close = () => store.dispatch('toggleModal', 'credits');

    const share = () => {
      if (navigator.share) {
        navigator.share({
          title: 'FisherBoy',
          text: '¡Estoy jugando a FisherBoy! ¡Únete a la aventura!',
          url: 'https://grupo-kiss.github.io/fisherboyAPP/',
        })
          .then(() => console.log('Successful share'))
          .catch((error) => console.log('Error sharing', error));
      } else {
        alert('La función de compartir no está disponible en este navegador.');
      }
    };

    return {
      show,
      close,
      share,
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

.credits-content {
  text-align: center;
}

.share-btn {
  background-color: #3498db;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  font-size: 1em;
  margin-top: 20px;
}

.share-btn:hover {
  background-color: #2980b9;
}
</style>
