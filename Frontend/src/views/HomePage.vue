<template>
<div>
  <HeroSection />

  <!-- Преимущества -->
  <v-container class="py-10">
    <h2 class="text-center mb-8" style="color: #333;">Почему выбирают нас</h2>
    <v-row>
      <v-col cols="12" md="3" v-for="(adv, i) in advantages" :key="i">
        <v-card class="advantage-card text-center pa-6" elevation="2" hover>
          <v-icon size="64" color="orange-darken-3" class="mb-3">{{ adv.icon }}</v-icon>
          <h3>{{ adv.title }}</h3>
          <p>{{ adv.text }}</p>
        </v-card>
      </v-col>
    </v-row>
  </v-container>

  <!-- Популярные услуги -->
  <v-container class="py-10 bg-grey-lighten-4">
    <h2 class="text-center mb-8" style="color: #333;">Популярные услуги</h2>
    <v-row>
      <v-col cols="12" md="4" v-for="s in popularServices" :key="s.id">
        <v-card class="service-preview" elevation="3" hover>
          <v-card-text>
            <v-icon size="48" color="orange-darken-3">{{ s.fields.Icon }}</v-icon>
            <h3 class="mt-2">{{ s.fields.Name }}</h3>
            <p>{{ s.fields.Description }}</p>
            <div class="price-row">
              <span class="price">от {{ s.fields.Price }} ₽</span>
              <v-btn color="orange-darken-3" variant="flat" to="/services">Подробнее</v-btn>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>

  <!-- Отзывы -->
  <v-container class="py-10">
    <h2 class="text-center mb-8" style="color: #333;">Отзывы клиентов</h2>
    <v-row>
      <v-col cols="12" md="4" v-for="r in reviews" :key="r.id">
        <ReviewCard :review="r" />
      </v-col>
    </v-row>
    <div class="text-center mt-6">
      <v-btn color="orange-darken-3" size="large" to="/reviews">Все отзывы</v-btn>
    </div>
  </v-container>

  <!-- CTA -->
  <v-container class="py-10">
    <v-card class="cta-card pa-10 text-center" color="orange-darken-3" elevation="6">
      <h2 class="text-h4 text-white mb-4">Нужна срочная сварка?</h2>
      <p class="text-white mb-6">Выезд мастера в течение 2 часов по Северодвинску</p>
      <v-btn color="white" color-text="orange-darken-3" size="x-large" to="/contacts">
        <v-icon start>mdi-phone</v-icon> Позвонить сейчас
      </v-btn>
    </v-card>
  </v-container>
</div>
</template>

<script>
import HeroSection from '../components/UI/HeroSection.vue';
import ReviewCard from '../components/UI/ReviewCard.vue';
import reviewsService from '../plugins/api/services/ReviewsService.js';
import servicesService from '../plugins/api/services/ServicesService.js';

export default {
name: 'HomePage',
components: { HeroSection, ReviewCard },
data() {
  return {
    reviews: [],
    popularServices: [],
    advantages: [
      { icon: 'mdi-shield-check', title: 'Гарантия качества', text: 'Все работы сертифицированы. Гарантия до 2 лет на сварные швы.' },
      { icon: 'mdi-clock-fast', title: 'Быстрый выезд', text: 'Мастер приедет в течение 2 часов после заявки в черте города.' },
      { icon: 'mdi-cash', title: 'Честные цены', text: 'Фиксированная стоимость. Без скрытых доплат и накруток.' },
      { icon: 'mdi-account-group', title: 'Опытные мастера', text: 'Средний стаж наших специалистов — 10 лет. Все с допусками НАКС.' },
    ],
  };
},
async mounted() {
  try {
    const reviewsData = await reviewsService.getAllReviews();
    this.reviews = (reviewsData.records || []).slice(0, 3);
    const servicesData = await servicesService.getAllServices();
    this.popularServices = (servicesData.records || []).slice(0, 3);
  } catch (e) { console.error(e); }
},
};
</script>

<style scoped>
.advantage-card {
transition: transform 0.3s;
height: 100%;
}
.advantage-card:hover {
transform: translateY(-5px);
}
.advantage-card h3 {
color: #333;
margin-bottom: 8px;
}
.advantage-card p {
color: #666;
font-size: 14px;
}
.service-preview {
height: 100%;
}
.price-row {
display: flex;
justify-content: space-between;
align-items: center;
margin-top: 16px;
}
.price {
font-size: 20px;
font-weight: bold;
color: #e65100;
}
.cta-card {
background: linear-gradient(135deg, #e65100 0%, #ff6b00 100%);
}
</style>