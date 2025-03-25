<!-- src/components/PostInfoModal.vue -->
<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="show" class="modal-overlay" @click="$emit('close')">
        <div class="modal-content" @click.stop>
          <div class="modal-header">
            <h2>Post Information</h2>
            <button class="close-btn" @click="$emit('close')">
              <i class="fas fa-times"></i>
            </button>
          </div>
          
          <div class="modal-body">
            <div class="info-card">
              <div class="info-item">
                <i class="far fa-calendar-alt"></i>
                <div class="info-details">
                  <h3>Created On</h3>
                  <p>{{ formatDate(post.date) }}</p>
                </div>
              </div>
              
              <div class="info-item">
                <i class="far fa-user"></i>
                <div class="info-details">
                  <h3>Author</h3>
                  <p>{{ post.author }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  show: {
    type: Boolean,
    required: true
  },
  post: {
    type: Object,
    required: true
  }
})

defineEmits(['close'])

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

// Add keyboard event listener for Escape key when mounted
onMounted(() => {
  console.log('Modal mounted')
  document.addEventListener('keydown', handleKeyDown)
})

// Cleanup resources when modal is unmounted
onBeforeUnmount(() => {
  console.log('Modal unmounting - Cleaning up resources')
  document.removeEventListener('keydown', handleKeyDown)
})

// Handle Escape key press
const handleKeyDown = (event) => {
  if (event.key === 'Escape' && props.show) {
    emit('close')
  }
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 1rem;
}

.modal-content {
  background: white;
  border-radius: 16px;
  width: 100%;
  max-width: 500px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  animation: modal-in 0.3s ease-out;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  background: var(--primary-color);
  color: white;
}

.modal-header h2 {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 600;
}

.close-btn {
  background: none;
  border: none;
  color: white;
  font-size: 1.2rem;
  cursor: pointer;
  padding: 0.5rem;
  transition: transform 0.2s ease;
}

.close-btn:hover {
  transform: rotate(90deg);
}

.modal-body {
  padding: 2rem;
}

.info-card {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.info-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.5rem;
  background: #f8f9fa;
  border-radius: 12px;
  transition: all 0.3s ease;
  border: 1px solid #eee;
}

.info-item:hover {
  transform: translateX(5px);
  background: #f0f2f5;
  border-color: var(--primary-color);
}

.info-item i {
  font-size: 1.5rem;
  color: var(--primary-color);
  padding: 0.5rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.info-details h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1rem;
  color: #666;
}

.info-details p {
  margin: 0;
  font-size: 1.1rem;
  color: var(--secondary-color);
  font-weight: 500;
}

@keyframes modal-in {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* Modal Transition */
.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  transform: scale(0.9);
}

.modal-enter-to,
.modal-leave-from {
  opacity: 1;
  transform: scale(1);
}

@media (max-width: 768px) {
  .modal-content {
    margin: 1rem;
  }

  .info-item {
    padding: 1rem;
  }

  .info-details p {
    font-size: 1rem;
  }
}
</style> 