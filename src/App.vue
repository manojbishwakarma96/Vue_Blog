<script setup>
// No imports needed
</script>

<template>
  <div class="app">
    <header class="header">
      <nav class="nav">
        <div class="nav-brand">
          <router-link to="/" class="brand-link">
            <i class="fas fa-utensils"></i>
            <span class="brand-name">Taste & Tales</span>
          </router-link>
        </div>
        <div class="nav-links">
          <router-link to="/" class="nav-link" active-class="active">
            <i class="fas fa-home"></i>
            Home
          </router-link>
          <router-link to="/posts" class="nav-link" active-class="active">
            <i class="fas fa-book-open"></i>
            Posts
          </router-link>
          <router-link to="/about" class="nav-link" active-class="active">
            <i class="fas fa-info-circle"></i>
            About
          </router-link>
        </div>
      </nav>
    </header>

    <main class="main-content">
      <router-view></router-view>
    </main>

    <footer class="footer">
      <p>&copy; 2024 Taste & Tales. All rights reserved.</p>
    </footer>
  </div>
</template>

<style>
:root {
  --primary-color: #42b883;
  --secondary-color: #2c3e50;
  --text-color: #333;
  --background-color: #fafafa;
  --nav-height: 70px;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: Arial, sans-serif;
  line-height: 1.6;
  color: var(--text-color);
  background-color: var(--background-color);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.header {
  background-color: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  height: var(--nav-height);
}

.nav {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-brand {
  display: flex;
  align-items: center;
}

.brand-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  text-decoration: none;
  color: var(--primary-color);
  font-size: 1.5rem;
  font-weight: 700;
  font-family: 'Playfair Display', serif;
  transition: transform 0.3s ease;
}

.brand-link:hover {
  transform: translateY(-1px);
}

.brand-link i {
  font-size: 1.8rem;
}

.nav-links {
  display: flex;
  gap: 1.5rem;
  align-items: center;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--secondary-color);
  text-decoration: none;
  font-weight: 500;
  padding: 0.75rem 1.25rem;
  border-radius: 8px;
  transition: all 0.3s ease;
  font-size: 1rem;
}

.nav-link i {
  font-size: 1.1rem;
}

.nav-link:hover {
  color: var(--primary-color);
  background-color: rgba(66, 184, 131, 0.1);
  transform: translateY(-1px);
}

.nav-link.active {
  color: var(--primary-color);
  background-color: rgba(66, 184, 131, 0.1);
}

.main-content {
  flex: 1;
  width: 100%;
  margin-top: var(--nav-height);
  min-height: calc(100vh - var(--nav-height) - 80px);
  position: relative;
}

.footer {
  background-color: white;
  color: var(--secondary-color);
  text-align: center;
  padding: 2rem;
  margin-top: auto;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
}

@media (max-width: 768px) {
  .nav {
    padding: 0 1rem;
  }

  .brand-name {
    font-size: 1.3rem;
  }

  .nav-link {
    padding: 0.5rem 0.75rem;
    font-size: 0.9rem;
  }

  .nav-link i {
    font-size: 1rem;
  }

  .main-content {
    margin-top: var(--nav-height);
  }
}

@media (max-width: 480px) {
  .brand-name {
    display: none;
  }

  .nav-link span {
    display: none;
  }

  .nav-link {
    padding: 0.5rem;
  }

  .nav-link i {
    font-size: 1.2rem;
  }
}
</style>

