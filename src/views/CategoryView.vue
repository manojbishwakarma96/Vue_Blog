<template>
  <div class="category-view">
    <h2>{{ capitalizedCategory }} Posts</h2>

    <!-- Subcategories -->
    <div class="subcategories">
      <router-link
        v-for="subcategory in subcategories"
        :key="subcategory"
        :to="{ 
          name: 'subcategory',
          params: { 
            category: $route.params.category,
            subcategory: subcategory.toLowerCase()
          }
        }"
        class="subcategory-link"
      >
        {{ subcategory }}
      </router-link>
    </div>

    <!-- Router View for Subcategory -->
    <router-view></router-view>

    <!-- Posts List (shown only when not in a subcategory) -->
    <div v-if="!$route.params.subcategory" class="posts-list">
      <article v-for="post in categoryPosts" :key="post.id" class="post-item">
        <h3>{{ post.title }}</h3>
        <p class="post-meta">{{ post.subcategory }}</p>
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
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import postsData from '../data/posts.json'

const route = useRoute()
const posts = ref(postsData.posts)

const capitalizedCategory = computed(() => {
  const category = route.params.category
  return category.charAt(0).toUpperCase() + category.slice(1)
})

const categoryPosts = computed(() => {
  return posts.value.filter(post => 
    post.category.toLowerCase() === route.params.category
  )
})

const subcategories = computed(() => {
  const subs = new Set(categoryPosts.value.map(post => post.subcategory))
  return Array.from(subs)
})

// Watch for route changes to update the view
watch(
  () => route.params.category,
  () => {
    // You could add additional logic here if needed
  }
)
</script>

<style scoped>
.category-view {
  padding: 20px 0;
}

h2 {
  margin-bottom: 20px;
  color: #2c3e50;
}

.subcategories {
  display: flex;
  gap: 10px;
  margin-bottom: 30px;
}

.subcategory-link {
  padding: 5px 15px;
  border-radius: 20px;
  background: #f5f5f5;
  color: #2c3e50;
  text-decoration: none;
  font-size: 0.9em;
  transition: all 0.2s;
}

.subcategory-link:hover,
.subcategory-link.router-link-active {
  background: #42b883;
  color: white;
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

h3 {
  color: #2c3e50;
  margin-bottom: 10px;
}

.post-meta {
  color: #42b883;
  font-size: 0.9em;
  margin-bottom: 10px;
}

.post-excerpt {
  color: #666;
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