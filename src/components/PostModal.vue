<template>
  <teleport to="body">
    <div v-if="show" class="modal-backdrop" @click="$emit('close')">
      <div class="modal" @click.stop>
        <div class="modal-header">
          <h3>{{ post.title }}</h3>
          <button class="close-btn" @click="$emit('close')">&times;</button>
        </div>
        <div class="modal-content">
          <p><strong>Author:</strong> {{ post.author }}</p>
          <p><strong>Date:</strong> {{ formatDate(post.date) }}</p>
          <p><strong>Category:</strong> {{ post.category }} / {{ post.subcategory }}</p>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script setup>
import { onBeforeUnmount } from 'vue';

const props = defineProps({
  show: Boolean,
  post: Object
});

defineEmits(['close']);

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

// Cleanup event listeners when modal is destroyed
onBeforeUnmount(() => {
  // Remove any event listeners or cleanup tasks here
  document.body.style.overflow = '';
});
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal {
  background: white;
  border-radius: 8px;
  padding: 20px;
  max-width: 500px;
  width: 90%;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.close-btn {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #666;
}

.close-btn:hover {
  color: #333;
}

.modal-content {
  line-height: 1.6;
}

.modal-content p {
  margin-bottom: 10px;
}
</style> 