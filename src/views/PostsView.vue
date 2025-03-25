<template>
  <div class="posts-view">
    <section class="posts-header">
      <div class="header-content">
        <h1>Food Stories Collection</h1>
        <div class="section-divider"></div>
        <p class="header-subtitle">Browse through our curated collection of culinary experiences</p>
      </div>
    </section>

    <section class="posts-container">
      <div class="top-actions">
        <div class="search-filter-section">
          <div class="search-box">
            <i class="fas fa-search search-icon"></i>
            <input 
              type="text" 
              v-model="searchQuery" 
              @input="filterPosts"
              placeholder="Search by title, category, or cuisine..."
              class="search-input"
            >
          </div>
          
          <div class="filter-tags">
            <button 
              v-for="category in uniqueCategories" 
              :key="category"
              :class="['filter-tag', { active: selectedCategory === category }]"
              @click="filterByCategory(category)"
            >
              {{ category }}
            </button>
          </div>
        </div>
        <button @click="showNewPostForm = true" class="create-post-btn">
          <i class="fas fa-plus"></i>
          Create New Post
        </button>
      </div>

      <div class="posts-grid">
        <article v-for="post in filteredPosts" :key="post.id" class="post-card">
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
          </div>
        </article>
      </div>
    </section>
  </div>

  <!-- Create New Post Modal -->
  <div v-if="showNewPostForm" class="modal-overlay" @click="showNewPostForm = false">
    <div class="modal-content" @click.stop>
      <div class="modal-header">
        <h2>Create New Post</h2>
        <button class="close-btn" @click="showNewPostForm = false">
          <i class="fas fa-times"></i>
        </button>
      </div>
      <form @submit.prevent="createPost" class="create-post-form">
        <div class="form-group">
          <label for="title">Title</label>
          <input 
            type="text" 
            id="title" 
            v-model="newPost.title" 
            placeholder="Enter post title"
            required
          >
        </div>

        <div class="form-group">
          <label for="category">Category</label>
          <select id="category" v-model="newPost.category" required>
            <option value="" disabled selected>Select a category</option>
            <option value="Food">Food</option>
          </select>
        </div>

        <div class="form-group">
          <label for="subcategory">Cuisine Type</label>
          <select id="subcategory" v-model="newPost.subcategory" required>
            <option value="" disabled selected>Select cuisine type</option>
            <option value="Nepali">Nepali</option>
            <option value="Indian">Indian</option>
            <option value="Italian">Italian</option>
            <option value="Asian">Asian</option>
            <option value="Mexican">Mexican</option>
            <option value="French">French</option>
            <option value="Mediterranean">Mediterranean</option>
          </select>
        </div>

        <div class="form-group">
          <label for="content">Content</label>
          <textarea 
            id="content" 
            v-model="newPost.content" 
            placeholder="Write your post content..."
            rows="6"
            required
          ></textarea>
        </div>

        <div class="form-group">
          <label for="author">Author</label>
          <input 
            type="text" 
            id="author" 
            v-model="newPost.author" 
            placeholder="Enter author name"
            required
          >
        </div>

        <div class="form-actions">
          <button type="button" class="cancel-btn" @click="showNewPostForm = false">Cancel</button>
          <button type="submit" class="submit-btn" :disabled="isSubmitting">
            {{ isSubmitting ? 'Creating...' : 'Create Post' }}
          </button>
        </div>
      </form>
    </div>
  </div>

  <PostModal 
    :show="showModal" 
    :post="selectedPost" 
    @close="showModal = false"
  />
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import PostModal from '../components/PostModal.vue'
import axios from 'axios'

const posts = ref([])
const filteredPosts = ref([])
const searchQuery = ref('')
const showModal = ref(false)
const selectedPost = ref(null)
const selectedCategory = ref('All')
const showNewPostForm = ref(false)
const isSubmitting = ref(false)

const newPost = ref({
  title: '',
  category: '',
  subcategory: '',
  content: '',
  author: ''
})

const uniqueCategories = computed(() => {
  const categories = ['All', ...new Set(posts.value.map(post => post.category))]
  return categories
})

const filterByCategory = (category) => {
  selectedCategory.value = category
  filterPosts()
}

const filterPosts = () => {
  const query = searchQuery.value.toLowerCase()
  filteredPosts.value = posts.value.filter(post => {
    const matchesSearch = 
      post.title.toLowerCase().includes(query) ||
      post.category.toLowerCase().includes(query) ||
      post.subcategory.toLowerCase().includes(query)
    
    const matchesCategory = 
      selectedCategory.value === 'All' || 
      post.category === selectedCategory.value

    return matchesSearch && matchesCategory
  })
}

const createPost = async () => {
  isSubmitting.value = true
  try {
    const response = await axios.post('http://localhost:3000/api/posts', newPost.value)
    posts.value.unshift(response.data)
    filteredPosts.value = posts.value
    showNewPostForm.value = false
    newPost.value = {
      title: '',
      category: '',
      subcategory: '',
      content: '',
      author: ''
    }
  } catch (error) {
    console.error('Error creating post:', error)
    alert('Error creating post. Please try again.')
  } finally {
    isSubmitting.value = false
  }
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

onMounted(async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/posts')
    posts.value = response.data.posts
    filteredPosts.value = posts.value
  } catch (error) {
    console.error('Error loading posts:', error)
    alert('Error loading posts. Please refresh the page.')
  }
})
</script>

<style scoped>
.posts-view {
  width: 100%;
  min-height: calc(100vh - 200px); /* Subtract footer height */
  background-color: #fafafa;
  position: relative;
  padding-bottom: 2rem;
}

.posts-header {
  background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),
              url('/images/posts-header-bg.jpg') center/cover;
  height: 40vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: white;
  margin-top: -4rem;
  position: relative;
}

.header-content {
  padding: 2rem;
  max-width: 800px;
  z-index: 1;
}

.posts-header h1 {
  font-size: 3rem;
  font-weight: 600;
  margin-bottom: 1rem;
  font-family: 'Playfair Display', serif;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.header-subtitle {
  font-size: 1.2rem;
  max-width: 600px;
  margin: 1rem auto 0;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.9);
}

.section-divider {
  width: 80px;
  height: 3px;
  background-color: var(--primary-color);
  margin: 1rem auto;
  border-radius: 2px;
}

.posts-container {
  max-width: 1400px;
  margin: -60px auto 0;
  padding: 0 2rem 2rem;
  position: relative;
  z-index: 2;
  min-height: calc(100vh - 300px); /* Ensure minimum height for content */
}

.top-actions {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 2rem;
  margin-bottom: 2rem;
}

.search-filter-section {
  flex: 1;
}

.search-box {
  position: relative;
  margin-bottom: 1.5rem;
}

.search-icon {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #666;
}

.search-input {
  width: 100%;
  padding: 1rem 1rem 1rem 3rem;
  border: 2px solid #eee;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
}

.search-input:focus {
  outline: none;
  border-color: var(--primary-color);
}

.filter-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
}

.filter-tag {
  padding: 0.5rem 1.2rem;
  border: none;
  border-radius: 25px;
  background: #eee;
  color: #666;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
}

.filter-tag:hover {
  background: #e0e0e0;
}

.filter-tag.active {
  background: var(--primary-color);
  color: white;
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

.create-post-btn {
  background: var(--primary-color);
  color: white;
  border: none;
  padding: 1rem 1.5rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.create-post-btn:hover {
  background: #3aa876;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
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
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid #eee;
}

.modal-header h2 {
  font-size: 1.5rem;
  color: var(--secondary-color);
  margin: 0;
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.2rem;
  color: #666;
  cursor: pointer;
  padding: 0.5rem;
  transition: color 0.3s ease;
}

.close-btn:hover {
  color: #333;
}

.create-post-form {
  padding: 1.5rem;
}

.form-group {
  margin-bottom: 1.5rem;
  display: flex;
  align-items: flex-start;
  gap: 1.5rem;
}

.form-group label {
  flex: 0 0 120px;
  padding-top: 0.75rem;
  color: var(--secondary-color);
  font-weight: 500;
  text-align: right;
}

.form-group .input-container {
  flex: 1;
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #eee;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: var(--primary-color);
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2rem;
}

.submit-btn,
.cancel-btn {
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.submit-btn {
  background: var(--primary-color);
  color: white;
  border: none;
}

.submit-btn:hover:not(:disabled) {
  background: #3aa876;
}

.submit-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.cancel-btn {
  background: #f5f5f5;
  color: #666;
  border: none;
}

.cancel-btn:hover {
  background: #eee;
}

@media (max-width: 768px) {
  .top-actions {
    flex-direction: column;
    gap: 1rem;
  }

  .create-post-btn {
    width: 100%;
    justify-content: center;
  }

  .modal-content {
    margin: 1rem;
    max-height: 85vh;
  }

  .form-actions {
    flex-direction: column;
  }

  .submit-btn,
  .cancel-btn {
    width: 100%;
  }

  .posts-header {
    height: 30vh;
  }

  .posts-header h1 {
    font-size: 2.2rem;
  }

  .header-subtitle {
    font-size: 1rem;
  }

  .posts-container {
    padding: 0 1rem 1rem;
    margin-top: -40px;
  }

  .search-filter-section {
    padding: 1.5rem;
  }

  .filter-tags {
    gap: 0.5rem;
  }

  .filter-tag {
    padding: 0.4rem 1rem;
    font-size: 0.8rem;
  }

  .posts-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .post-content {
    padding: 1.5rem;
  }

  .form-group {
    flex-direction: column;
    gap: 0.5rem;
  }

  .form-group label {
    flex: none;
    padding-top: 0;
    text-align: left;
  }

  .form-group .input-container {
    width: 100%;
  }
}
</style> 