<script setup>
// No imports needed
</script>

<template>
  <div class="app">
    <header class="header">
      <nav class="nav">
        <router-link to="/" class="nav-link">Home</router-link>
        <router-link to="/posts" class="nav-link">Posts</router-link>
        <router-link to="/about" class="nav-link">About</router-link>
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
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  padding: 1rem 0;
}

.nav {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: center;
  gap: 2rem;
}

.nav-link {
  color: var(--secondary-color);
  text-decoration: none;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: all 0.3s ease;
}

.nav-link:hover {
  color: var(--primary-color);
  background-color: rgba(66, 184, 131, 0.1);
}

.nav-link.router-link-active {
  color: var(--primary-color);
  background-color: rgba(66, 184, 131, 0.1);
}

.main-content {
  flex: 1;
  width: 100%;
  margin-top: 4rem;
  min-height: calc(100vh - 200px);
  position: relative;
}

.footer {
  background-color: white;
  color: var(--secondary-color);
  text-align: center;
  padding: 2rem;
  margin-top: auto;
  box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1);
}

@media (max-width: 768px) {
  .nav {
    padding: 0 1rem;
    gap: 1rem;
  }

  .nav-link {
    padding: 0.5rem;
    font-size: 0.9rem;
  }

  .main-content {
    margin-top: 3rem;
  }
}
</style>
