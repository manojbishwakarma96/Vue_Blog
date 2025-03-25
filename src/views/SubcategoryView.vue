<template>
  <div class="subcategory-view">
    <h3>{{ capitalizedSubcategory }} Posts</h3>

    <div class="posts-list">
      <article v-for="post in subcategoryPosts" :key="post.id" class="post-item">
        <h4>{{ post.title }}</h4>
        <p class="post-meta">{{ formatDate(post.date) }}</p>
        <p class="post-excerpt">{{ post.content.substring(0, 150) }}...</p>
        <router-link 
          :to="{ name: 'blogPost', params: { id: post.id }}"
          class="read-more"
        >
          Read More
        </router-link>
      </article>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import postsData from '../data/posts.json'

const route = useRoute()
const posts = ref(postsData.posts)

const capitalizedSubcategory = computed(() => {
  const subcategory = route.params.subcategory
  return subcategory.charAt(0).toUpperCase() + subcategory.slice(1)
})

const subcategoryPosts = computed(() => {
  return posts.value.filter(post => 
    post.category.toLowerCase() === route.params.category &&
    post.subcategory.toLowerCase() === route.params.subcategory
  )
})

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
</script>

<style scoped>
.subcategory-view {
  padding: 20px 0;
}

h3 {
  margin-bottom: 20px;
  color: #2c3e50;
}

.posts-list {
  display: grid;
  gap: 20px;
}

.post-item {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

h4 {
  color: #2c3e50;
  margin-bottom: 10px;
  font-size: 1.2em;
}

.post-meta {
  color: #666;
  font-size: 0.9em;
  margin-bottom: 10px;
}

.post-excerpt {
  color: #2c3e50;
  line-height: 1.6;
  margin-bottom: 15px;
}

.read-more {
  display: inline-block;
  color: #42b883;
  text-decoration: none;
  font-weight: 600;
}

.read-more:hover {
  text-decoration: underline;
}
</style> 