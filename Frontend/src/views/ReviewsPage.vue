<template>
<v-container class="py-8">
  <h1 class="mb-2" style="color: #333;">Отзывы клиентов</h1>
  <p class="text-grey mb-6">Что говорят о нас наши заказчики</p>

  <v-card class="mb-8 pa-6" elevation="3" v-if="isLoggedIn">
    <h3 class="mb-4">Оставить отзыв</h3>
    <v-form @submit.prevent="submitReview">
      <v-text-field v-model="reviewForm.clientName" label="Ваше имя" variant="outlined" />
      <v-select v-model="reviewForm.serviceName" :items="serviceNames" label="Услуга" variant="outlined" />
      <v-rating v-model="reviewForm.rating" color="orange-darken-3" size="32" class="mb-4" />
      <v-textarea v-model="reviewForm.text" label="Ваш отзыв" variant="outlined" rows="4" />
      <v-btn type="submit" color="orange-darken-3" size="large">
        <v-icon start>mdi-send</v-icon> Опубликовать
      </v-btn>
    </v-form>
  </v-card>

  <v-alert v-else type="warning" variant="tonal" class="mb-8">
    <v-btn color="orange-darken-3" variant="text" @click="showLogin = true">Войдите</v-btn>, чтобы оставить отзыв
  </v-alert>

  <v-row>
    <v-col cols="12" md="6" lg="4" v-for="r in reviews" :key="r.id">
      <ReviewCard :review="r" />
    </v-col>
  </v-row>
</v-container>
</template>

<script>
import ReviewCard from '../components/UI/ReviewCard.vue';
import reviewsService from '../plugins/api/services/ReviewsService.js';
import servicesService from '../plugins/api/services/ServicesService.js';

export default {
name: 'ReviewsPage',
components: { ReviewCard },
data() {
  return {
    reviews: [],
    serviceNames: [],
    isLoggedIn: false,
    reviewForm: { clientName: '', serviceName: '', rating: 5, text: '' },
  };
},
async mounted() {
  this.isLoggedIn = !!sessionStorage.getItem('userId');
  try {
    const reviewsData = await reviewsService.getAllReviews();
    this.reviews = reviewsData.records || [];
    const servicesData = await servicesService.getAllServices();
    this.serviceNames = (servicesData.records || []).map(s => s.fields.Name);
  } catch (e) { console.error(e); }
},
methods: {
  async submitReview() {
    if (!this.reviewForm.clientName || !this.reviewForm.text) {
      alert('Заполните имя и текст отзыва');
      return;
    }
    try {
      const userId = sessionStorage.getItem('userId');
      await reviewsService.createReview({
        clientId: parseInt(userId) || 0,
        clientName: this.reviewForm.clientName,
        serviceName: this.reviewForm.serviceName,
        rating: this.reviewForm.rating,
        text: this.reviewForm.text,
      });
      alert('Отзыв опубликован!');
      this.reviewForm = { clientName: '', serviceName: '', rating: 5, text: '' };
      const data = await reviewsService.getAllReviews();
      this.reviews = data.records || [];
    } catch (e) { alert('Ошибка: ' + e.message); }
  },
},
};
</script>