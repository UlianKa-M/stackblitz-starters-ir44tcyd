<template>
<div class="hero">
  <div class="hero-overlay"></div>
  <div class="hero-content">
    <h1 class="hero-title">СваркаПро</h1>
    <p class="hero-subtitle">Профессиональные сварочные работы в Северодвинске и области</p>
    <p class="hero-description">Аргонодуговая сварка, изготовление металлоконструкций, ремонтные работы. Гарантия качества и соблюдение сроков.</p>
    <div class="hero-buttons">
      <v-btn color="orange-darken-3" size="x-large" class="mr-3" to="/services">
        <v-icon start>mdi-wrench</v-icon> Наши услуги
      </v-btn>
      <v-btn variant="outlined" color="white" size="x-large" to="/contacts">
        <v-icon start>mdi-phone</v-icon> Связаться
      </v-btn>
    </div>
    <div class="hero-stats">
      <div class="stat-item">
        <div class="stat-value">12+</div>
        <div class="stat-label">лет опыта</div>
      </div>
      <div class="stat-item">
        <div class="stat-value">1500+</div>
        <div class="stat-label">выполненных заказов</div>
      </div>
      <div class="stat-item">
        <div class="stat-value">98%</div>
        <div class="stat-label">довольных клиентов</div>
      </div>
    </div>
  </div>
</div>
</template>

<style scoped>
.hero {
position: relative;
height: 600px;
background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 50%, #1a1a1a 100%);
display: flex;
align-items: center;
justify-content: center;
overflow: hidden;
}
.hero::before {
content: '';
position: absolute;
top: 0; left: 0; right: 0; bottom: 0;
background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="1" fill="%23ff6b00" opacity="0.3"/></svg>');
background-size: 30px 30px;
}
.hero-overlay {
position: absolute;
top: 0; left: 0; right: 0; bottom: 0;
background: radial-gradient(circle at 30% 50%, rgba(230, 81, 0, 0.15) 0%, transparent 50%);
}
.hero-content {
position: relative;
z-index: 1;
text-align: center;
color: white;
max-width: 900px;
padding: 0 20px;
}
.hero-title {
font-size: 72px;
font-weight: 900;
margin-bottom: 16px;
background: linear-gradient(135deg, #ff6b00 0%, #ff9800 100%);
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
text-shadow: 0 4px 20px rgba(255, 107, 0, 0.3);
}
.hero-subtitle {
font-size: 28px;
font-weight: 300;
margin-bottom: 16px;
color: #fff;
}
.hero-description {
font-size: 18px;
color: #ccc;
margin-bottom: 32px;
max-width: 700px;
margin-left: auto;
margin-right: auto;
}
.hero-buttons {
display: flex;
justify-content: center;
gap: 16px;
margin-bottom: 48px;
flex-wrap: wrap;
}
.hero-stats {
display: flex;
justify-content: center;
gap: 60px;
flex-wrap: wrap;
}
.stat-item {
text-align: center;
}
.stat-value {
font-size: 36px;
font-weight: 700;
color: #ff6b00;
margin-bottom: 4px;
}
.stat-label {
font-size: 14px;
color: #aaa;
text-transform: uppercase;
letter-spacing: 1px;
}
</style>