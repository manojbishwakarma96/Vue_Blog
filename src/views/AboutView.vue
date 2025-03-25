<template>
  <div class="about-view">
    <section class="about-hero">
      <div class="hero-content">
        <h1>About Taste & Tales</h1>
        <div class="section-divider"></div>
        <p class="hero-subtitle">Discovering the world's culinary treasures, one story at a time</p>
      </div>
    </section>

    <section class="about-content">
      <div class="content-container">
        <div class="about-section">
          <h2>Our Story</h2>
          <p>Taste & Tales is more than just a food blog – it's a celebration of global cuisine and the stories behind every dish. Founded by passionate food enthusiasts, we're dedicated to bringing you authentic recipes, culinary adventures, and the rich cultural heritage that makes each cuisine unique.</p>
        </div>

        <div class="features-grid">
          <div class="feature-card">
            <i class="fas fa-utensils"></i>
            <h3>Authentic Recipes</h3>
            <p>Discover traditional recipes from around the world, carefully curated and tested in our kitchen.</p>
          </div>
          <div class="feature-card">
            <i class="fas fa-globe-asia"></i>
            <h3>Global Cuisine</h3>
            <p>Explore diverse culinary traditions, from Nepali classics to Mediterranean delights.</p>
          </div>
          <div class="feature-card">
            <i class="fas fa-book-open"></i>
            <h3>Food Stories</h3>
            <p>Learn about the history, culture, and people behind each dish we feature.</p>
          </div>
        </div>

        <div class="about-section">
          <h2>Our Mission</h2>
          <p>We believe that food is a universal language that brings people together. Our mission is to preserve and share authentic recipes from different cultures, educate and inspire home cooks to explore global cuisines, and create a community of food lovers who share our passion for culinary diversity. We are committed to documenting and celebrating the stories behind traditional dishes, ensuring that the rich heritage of global cuisine continues to thrive and evolve.</p>
        </div>

        <div class="about-section">
          <h2>Our Team</h2>
          <div class="team-grid">
            <div class="team-member">
              <div class="member-image">
                <i class="fas fa-user-circle"></i>
              </div>
              <h3>Laxman Rokaya</h3>
              <p class="member-role">Founder & Lead Developer</p>
              <p class="member-bio">Passionate about creating innovative web solutions and exploring Nepali cuisine</p>
            </div>
            <div class="team-member">
              <div class="member-image">
                <i class="fas fa-user-circle"></i>
              </div>
              <h3>Manoj Bishwakarma</h3>
              <p class="member-role">Co-Founder & Content Director</p>
              <p class="member-bio">Expert in food culture and culinary traditions, specializing in Nepali and Asian cuisines</p>
            </div>
          </div>
        </div>

        <div class="about-section">
          <h2>Get in Touch</h2>
          <p>We'd love to hear from you! Whether you have a recipe to share, a story to tell, or just want to connect with fellow food lovers, reach out to us.</p>
          <div class="contact-info">
            <div class="contact-item">
              <i class="fas fa-envelope"></i>
              <span>support@tasteandtales.com</span>
            </div>
            <div class="contact-item">
              <i class="fas fa-map-marker-alt"></i>
              <span>Barrie, ON, Canada</span>
            </div>
            <div class="social-links">
              <a href="#" class="social-link"><i class="fab fa-facebook"></i></a>
              <a href="#" class="social-link"><i class="fab fa-instagram"></i></a>
              <a href="#" class="social-link"><i class="fab fa-twitter"></i></a>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
// This component is lazy-loaded
</script>

<style scoped>
.about-view {
  width: 100%;
  min-height: calc(100vh - 200px);
  background-color: #fafafa;
  position: relative;
  padding-bottom: 2rem;
}

.about-hero {
  background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),
              url('/images/about-hero-bg.jpg') center/cover;
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

.hero-content {
  padding: 2rem;
  max-width: 800px;
  z-index: 1;
}

.about-hero h1 {
  font-size: 3rem;
  font-weight: 600;
  margin-bottom: 1rem;
  font-family: 'Playfair Display', serif;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.hero-subtitle {
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

.about-content {
  max-width: 1400px;
  margin: -60px auto 0;
  padding: 0 2rem 2rem;
  position: relative;
  z-index: 2;
}

.content-container {
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  padding: 3rem;
}

.about-section {
  margin-bottom: 4rem;
}

.about-section:last-child {
  margin-bottom: 0;
}

.about-section h2 {
  color: var(--secondary-color);
  font-size: 2rem;
  margin-bottom: 1.5rem;
  font-weight: 600;
}

.about-section p {
  color: var(--text-color);
  line-height: 1.8;
  margin-bottom: 1.5rem;
  font-size: 1.1rem;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin: 3rem 0;
}

.feature-card {
  background: #f8f9fa;
  padding: 2rem;
  border-radius: 12px;
  text-align: center;
  transition: transform 0.3s ease;
  border: 1px solid #eee;
}

.feature-card:hover {
  transform: translateY(-5px);
  border-color: var(--primary-color);
}

.feature-card i {
  font-size: 2.5rem;
  color: var(--primary-color);
  margin-bottom: 1rem;
}

.feature-card h3 {
  color: var(--secondary-color);
  margin-bottom: 1rem;
  font-size: 1.2rem;
}

.team-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.team-member {
  text-align: center;
  padding: 2rem;
  background: #f8f9fa;
  border-radius: 12px;
  border: 1px solid #eee;
  transition: transform 0.3s ease;
}

.team-member:hover {
  transform: translateY(-5px);
  border-color: var(--primary-color);
}

.member-image {
  width: 120px;
  height: 120px;
  margin: 0 auto 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  border-radius: 50%;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.member-image i {
  font-size: 5rem;
  color: var(--primary-color);
}

.team-member h3 {
  color: var(--secondary-color);
  margin-bottom: 0.5rem;
  font-size: 1.3rem;
}

.member-role {
  color: var(--primary-color);
  font-weight: 500;
  margin-bottom: 1rem;
}

.member-bio {
  color: var(--text-color);
  font-size: 0.95rem;
  line-height: 1.6;
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-top: 2rem;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 8px;
  border: 1px solid #eee;
  transition: transform 0.3s ease;
}

.contact-item:hover {
  transform: translateX(5px);
  border-color: var(--primary-color);
}

.contact-item i {
  font-size: 1.5rem;
  color: var(--primary-color);
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  border-radius: 50%;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.social-links {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
  justify-content: center;
}

.social-link {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f8f9fa;
  border-radius: 50%;
  color: var(--primary-color);
  font-size: 1.2rem;
  transition: all 0.3s ease;
  border: 1px solid #eee;
}

.social-link:hover {
  background: var(--primary-color);
  color: white;
  transform: translateY(-3px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

@media (max-width: 768px) {
  .about-hero {
    height: 30vh;
  }

  .about-hero h1 {
    font-size: 2.2rem;
  }

  .hero-subtitle {
    font-size: 1rem;
  }

  .about-content {
    padding: 0 1rem 1rem;
    margin-top: -40px;
  }

  .content-container {
    padding: 1.5rem;
  }

  .features-grid,
  .team-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .about-section h2 {
    font-size: 1.8rem;
  }

  .about-section p {
    font-size: 1rem;
  }

  .contact-info {
    gap: 1rem;
  }

  .social-links {
    flex-wrap: wrap;
  }
}
</style> 