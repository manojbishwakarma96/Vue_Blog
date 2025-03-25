<script setup>
// No imports needed
</script>

<template>
  <div class="app">
    <header>
      <nav class="nav-container">
        <router-link to="/" class="logo">VueBlog</router-link>
        <div class="nav-links">
          <router-link to="/" class="nav-link">Home</router-link>
          <router-link to="/posts" class="nav-link">Posts</router-link>
          <router-link to="/about" class="nav-link">About</router-link>
        </div>
      </nav>
    </header>
    <main>
      <router-view></router-view>
    </main>
    <footer>
      <p>&copy; 2024 VueBlog. All rights reserved.</p>
    </footer>
  </div>
</template>

<style>
:root {
  --primary-color: #42b883;
  --secondary-color: #35495e;
  --background-color: #f5f5f5;
  --text-color: #2c3e50;
  --font-family: 'Roboto', sans-serif;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 0;
  font-family: var(--font-family);
  background-color: var(--background-color);
  color: var(--text-color);
  min-height: 100vh;
}

.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

header {
  background-color: var(--primary-color);
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.nav-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  max-width: 100%;
  margin: 0 auto;
}

.logo {
  color: white;
  font-size: 1.5rem;
  font-weight: bold;
  text-decoration: none;
}

.nav-links {
  display: flex;
  gap: 1.5rem;
}

.nav-link {
  color: white;
  text-decoration: none;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: all 0.3s ease;
}

.nav-link:hover {
  background-color: rgba(255, 255, 255, 0.1);
  transform: translateY(-2px);
}

main {
  flex: 1;
  width: 100%;
  padding-top: 4rem;
  padding-bottom: 4rem;
  min-height: calc(100vh - 60px);
}

footer {
  background-color: var(--secondary-color);
  color: white;
  text-align: center;
  padding: 1rem;
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
}

@media (max-width: 768px) {
  .nav-container {
    flex-direction: column;
    padding: 1rem;
  }

  .nav-links {
    margin-top: 1rem;
    gap: 0.5rem;
  }

  .logo {
    margin-bottom: 0.5rem;
  }

  main {
    padding-top: 7rem;
  }
}
</style>
