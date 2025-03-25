<!-- src/views/HomeView.vue -->
<template>
  <div class="home">
    <section class="hero">
      <div class="hero-content">
        <div class="logo">Taste & Tales</div>
        <h1>Your Culinary Journey Starts Here</h1>
        <p>Explore authentic recipes, food stories, and culinary adventures from around the world</p>
        <div class="hero-stats">
          <div class="stat">
            <span class="stat-number">{{ posts.length }}+</span>
            <span class="stat-label">Recipes</span>
          </div>
          <div class="stat">
            <span class="stat-number">7</span>
            <span class="stat-label">Cuisines</span>
          </div>
          <div class="stat">
            <span class="stat-number">100%</span>
            <span class="stat-label">Authentic</span>
          </div>
        </div>
      </div>
    </section>
    
    <section class="featured-posts">
      <div class="section-header">
        <h2>Latest Food Stories</h2>
        <div class="section-divider"></div>
        <p class="section-subtitle">Discover our latest culinary adventures and recipes</p>
        <div v-if="loading" class="loading-indicator">
          <i class="fas fa-spinner fa-spin"></i>
          Loading posts...
        </div>
        <div v-if="error" class="error-message">
          <i class="fas fa-exclamation-circle"></i>
          {{ error }}
        </div>
      </div>
      
      <div class="posts-grid">
        <article v-for="post in posts" :key="post.id" class="post-card">
          <div class="post-content">
            <div class="post-category">{{ post.subcategory }}</div>
            <h2>{{ post.title }}</h2>
            <p class="post-meta">
              <span class="meta-item">
                <i class="far fa-calendar"></i>
                {{ formatDate(post.date) }}
              </span>
              <span class="meta-divider">•</span>
              <span class="meta-item">
                <i class="far fa-user"></i>
                {{ post.author }}
              </span>
            </p>
            <p class="post-content-text">{{ post.content }}</p>
            <button class="info-btn" @click="showPostInfo(post)">
              <i class="fas fa-info-circle"></i>
              Post Info
            </button>
          </div>
        </article>
      </div>
    </section>
  </div>

  <PostInfoModal 
    :show="showModal"
    :post="selectedPost"
    @close="closeModal"
  />
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import PostInfoModal from '../components/PostInfoModal.vue'
import axios from 'axios'

const posts = ref([])
const loading = ref(true)
const error = ref(null)
const showModal = ref(false)
const selectedPost = ref(null)

// Track component mounted state
let isMounted = false
let autoRefreshInterval = null

const showPostInfo = (post) => {
  selectedPost.value = post
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
  selectedPost.value = null
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const fetchPosts = async () => {
  try {
    loading.value = true
    error.value = null
    const response = await axios.get('http://localhost:3000/api/posts')
    
    // Only update if component is still mounted
    if (isMounted) {
      posts.value = response.data.posts
      loading.value = false
    }
  } catch (err) {
    if (isMounted) {
      error.value = 'Error loading posts. Please try again later.'
      loading.value = false
      console.error('Error fetching posts:', err)
    }
  }
}

// Lifecycle hooks
onMounted(async () => {
  console.log('HomeView mounted - Initializing data fetching')
  isMounted = true
  
  // Initial fetch
  await fetchPosts()
  
  // Set up auto-refresh every 5 minutes
  autoRefreshInterval = setInterval(fetchPosts, 300000)
  
  // Add scroll position restoration
  const savedScrollPos = sessionStorage.getItem('homeScrollPosition')
  if (savedScrollPos) {
    window.scrollTo(0, parseInt(savedScrollPos))
    sessionStorage.removeItem('homeScrollPosition')
  }
})

onBeforeUnmount(() => {
  console.log('HomeView unmounting - Cleaning up resources')
  isMounted = false
  
  // Clear auto-refresh interval
  if (autoRefreshInterval) {
    clearInterval(autoRefreshInterval)
  }
  
  // Save scroll position
  sessionStorage.setItem('homeScrollPosition', window.scrollY.toString())
})
</script>

<style scoped>
.home {
  width: 100%;
  min-height: 100%;
  background-color: #fafafa;
}

.hero {
  background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),
              url('/images/hero-bg.jpg') center/cover;
  min-height: 80vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: white;
  margin-top: -4rem;
  position: relative;
}

.hero::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100px;
  background: linear-gradient(to top, #fafafa, transparent);
}

.hero-content {
  padding: 2rem;
  max-width: 900px;
  position: relative;
  z-index: 1;
}

.logo {
  font-family: 'Playfair Display', serif;
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: var(--primary-color);
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.hero h1 {
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  font-weight: 600;
  letter-spacing: 1px;
}

.hero p {
  font-size: 1.2rem;
  max-width: 600px;
  margin: 0 auto 3rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.9);
}

.hero-stats {
  display: flex;
  justify-content: center;
  gap: 4rem;
  margin-top: 3rem;
}

.stat {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stat-number {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--primary-color);
  margin-bottom: 0.5rem;
}

.stat-label {
  font-size: 1rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: rgba(255, 255, 255, 0.9);
}

.featured-posts {
  padding: 6rem 2rem;
  max-width: 1400px;
  margin: 0 auto;
  position: relative;
}

.section-header {
  text-align: center;
  margin-bottom: 4rem;
}

.section-header h2 {
  font-size: 2.5rem;
  color: var(--secondary-color);
  margin-bottom: 1rem;
  font-weight: 600;
}

.section-divider {
  width: 80px;
  height: 3px;
  background-color: var(--primary-color);
  margin: 1rem auto;
  border-radius: 2px;
}

.section-subtitle {
  color: #666;
  font-size: 1.1rem;
  max-width: 600px;
  margin: 0 auto;
}

.posts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2.5rem;
  padding: 1rem;
}

.post-card {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  height: 100%;
}

.post-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
}

.post-content {
  padding: 2rem;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.post-category {
  display: inline-block;
  background: var(--primary-color);
  color: white;
  padding: 0.5rem 1.2rem;
  border-radius: 25px;
  font-size: 0.9rem;
  margin-bottom: 1.2rem;
  align-self: flex-start;
  font-weight: 500;
  letter-spacing: 0.5px;
}

.post-content h2 {
  color: var(--secondary-color);
  margin-bottom: 1rem;
  font-size: 1.5rem;
  font-weight: 600;
  line-height: 1.4;
}

.post-meta {
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 0.3rem;
}

.meta-divider {
  color: #ccc;
}

.post-content-text {
  color: var(--text-color);
  line-height: 1.8;
  flex-grow: 1;
  overflow-wrap: break-word;
  white-space: pre-wrap;
}

.info-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: var(--primary-color);
  color: white;
  border: none;
  padding: 0.75rem 1.25rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  margin-top: 1rem;
  transition: all 0.3s ease;
}

.info-btn:hover {
  background: #3aa876;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.info-btn i {
  font-size: 1.1rem;
}

.loading-indicator,
.error-message {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1rem;
  padding: 0.75rem;
  border-radius: 8px;
  font-weight: 500;
}

.loading-indicator {
  color: var(--primary-color);
  background: rgba(66, 184, 131, 0.1);
}

.loading-indicator i {
  font-size: 1.2rem;
}

.error-message {
  color: #dc3545;
  background: rgba(220, 53, 69, 0.1);
}

.error-message i {
  font-size: 1.2rem;
}

@media (max-width: 768px) {
  .hero {
    min-height: 60vh;
  }

  .logo {
    font-size: 2.5rem;
  }

  .hero h1 {
    font-size: 2rem;
  }

  .hero p {
    font-size: 1rem;
  }

  .hero-stats {
    gap: 2rem;
  }

  .stat-number {
    font-size: 2rem;
  }

  .featured-posts {
    padding: 3rem 1rem;
  }

  .section-header h2 {
    font-size: 2rem;
  }

  .posts-grid {
    grid-template-columns: 1fr;
  }

  .post-content {
    padding: 1.5rem;
  }
}
</style> 