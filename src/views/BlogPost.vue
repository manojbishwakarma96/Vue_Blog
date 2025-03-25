<!-- src/views/BlogPost.vue -->
<template>
  <div class="blog-post-view">
    <router-link to="/" class="back-link">← Back to Posts</router-link>
    <article v-if="post" class="post-content">
      <h1>{{ post.title }}</h1>
      <p class="post-meta">{{ post.date }}</p>
      <div class="post-body">
        {{ post.content }}
      </div>
    </article>
    <div v-else class="not-found">
      Post not found
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const post = ref(null)

// Simulated blog posts data
const posts = {
  1: {
    id: 1,
    title: 'Getting Started with Vue 3',
    date: 'March 24, 2024',
    content: 'Vue 3 introduces the Composition API, a new way to organize component logic. This API provides better TypeScript support, code reusability, and more flexible logic composition...'
  },
  2: {
    id: 2,
    title: 'Building a Blog with Vue and Vite',
    date: 'March 23, 2024',
    content: 'In this tutorial, we\'ll walk through creating a blog using Vue 3 and Vite. We\'ll cover routing, component organization, and styling best practices...'
  }
}

onMounted(() => {
  // Fetch post based on route ID
  post.value = posts[route.params.id]
})
</script>

<style scoped>
.blog-post-view {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.back-link {
  display: inline-block;
  color: #42b883;
  text-decoration: none;
  margin-bottom: 30px;
  font-weight: 600;
}

.back-link:hover {
  text-decoration: underline;
}

.post-content {
  background: #fff;
  border-radius: 8px;
  padding: 30px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

h1 {
  color: #2c3e50;
  margin-bottom: 10px;
}

.post-meta {
  color: #666;
  font-size: 0.9em;
  margin-bottom: 20px;
}

.post-body {
  color: #2c3e50;
  line-height: 1.8;
  font-size: 1.1em;
}

.not-found {
  text-align: center;
  color: #666;
  font-size: 1.2em;
  margin-top: 40px;
}
</style> 