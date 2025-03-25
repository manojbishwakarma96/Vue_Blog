<template>
  <div class="about-view">
    <h1>About VueBlog</h1>
    
    <section class="about-content">
      <h2>Welcome to Our Food Blog</h2>
      <p>
        VueBlog is your go-to platform for exploring diverse culinary experiences. Our blog covers a wide range of cuisines, including Italian, Asian, Mexican, French, Mediterranean, Indian, and Nepali. Discover classic pasta recipes, vibrant street food scenes, authentic street tacos, French pastries, heart-healthy Mediterranean dishes, rich Indian curries, and traditional Nepali festival foods. Join us on a culinary journey and discover the stories behind each dish. Whether you're a seasoned chef or a home cook, VueBlog has something for everyone.
      </p>

      <h2>Features</h2>
      <ul>
        <li>Clean and modern design</li>
        <li>Category-based organization</li>
        <li>Easy content management</li>
        <li>Fast and responsive</li>
        <li>Search functionality</li>
      </ul>

      <h2>Technologies Used</h2>
      <ul>
        <li>Vue 3 with Composition API</li>
        <li>Vue Router for navigation</li>
        <li>Vite for build tooling</li>
        <li>Modern CSS with Flexbox and Grid</li>
      </ul>

      <h2>Contact</h2>
      <p>
        Have questions or suggestions? Feel free to reach out to us at:
        <a href="mailto:contact@vueblog.com">contact@vueblog.com</a>
      </p>
    </section>
  </div>
</template>

<script setup>
// This component is lazy-loaded
</script>

<style scoped>
.about-view {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  color: #2c3e50;
  text-align: center;
  margin-bottom: 40px;
}

.about-content {
  background: white;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

h2 {
  color: #42b883;
  margin: 30px 0 15px;
}

h2:first-child {
  margin-top: 0;
}

p {
  color: #2c3e50;
  line-height: 1.6;
  margin-bottom: 20px;
}

ul {
  list-style-type: none;
  padding: 0;
  margin: 0 0 20px;
}

li {
  color: #2c3e50;
  padding: 8px 0;
  padding-left: 20px;
  position: relative;
}

li::before {
  content: "•";
  color: #42b883;
  position: absolute;
  left: 0;
}

a {
  color: #42b883;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}
</style> 