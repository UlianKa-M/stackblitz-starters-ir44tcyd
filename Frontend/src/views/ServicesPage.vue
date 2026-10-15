<template>
<v-container class="py-8">
  <h1 class="mb-2" style="color: #333;">Наши услуги</h1>
  <p class="text-grey mb-6">Полный спектр сварочных работ для частных и корпоративных клиентов</p>

  <FilterBar :categories="categories" :selected="selectedCategory" @select="filterByCategory" />

  <v-row>
    <v-col cols="12" md="6" lg="4" v-for="s in filteredServices" :key="s.id">
      <v-card class="service-card" elevation="3" hover>
        <v-card-text>
          <v-icon size="56" color="orange-darken-3" class="mb-2">{{ s.fields.Icon }}</v-icon>
          <h3>{{ s.fields.Name }}</h3>
          <v-chip size="small" color="orange-lighten-4" class="mb-2">{{ s.fields.Category }}</v-chip>
          <p>{{ s.fields.Description }}</p>
          <div class="service-meta">
            <div><v-icon size="18" color="orange-darken-3">mdi-clock-outline</v-icon> {{ s.fields.Duration }}</div>
            <div class="price">от {{ s.fields.Price }} ₽</div>
          </div>
          <v-btn color="orange-darken-3" variant="flat" block class="mt-3" @click="orderService(s)">
            <v-icon start>mdi-cart-plus</v-icon> Заказать
          </v-btn>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>

  <v-alert v-if="filteredServices.length === 0" type="info" class="mt-6">
    Услуги не найдены. Попробуйте другую категорию.
  </v-alert>
</v-container>
</template>

<script>
import FilterBar from '../components/UI/FilterBar.vue';
import servicesService from '../plugins/api/services/ServicesService.js';
import ordersService from '../plugins/api/services/OrdersService.js';

export default {
name: 'ServicesPage',
components: { FilterBar },
data() {
  return {
    services: [],
    categories: ['Все'],
    selectedCategory: 'Все',
  };
},
computed: {
  filteredServices() {
    if (this.selectedCategory === 'Все') return this.services;
    return this.services.filter(s => s.fields.Category === this.selectedCategory);
  },
},
async mounted() {
  try {
    const data = await servicesService.getAllServices();
    this.services = data.records || [];
    const cats = [...new Set(this.services.map(s => s.fields.Category))];
    this.categories = ['Все', ...cats];
  } catch (e) { console.error(e); }
},
methods: {
  filterByCategory(cat) { this.selectedCategory = cat; },
  async orderService(service) {
    const userId = sessionStorage.getItem('userId');
    if (!userId) { alert('Сначала войдите в аккаунт!'); return; }
    const address = prompt('Укажите адрес выезда мастера:');
    if (!address) return;
    const comment = prompt('Комментарий к заказу (необязательно):') || '';
    try {
      await ordersService.createOrder({
        clientId: parseInt(userId),
        serviceId: service.fields.ServiceId,
        address,
        comment,
        status: 'Новый',
      });
      alert('Заявка отправлена! Мы свяжемся с вами в ближайшее время.');
    } catch (e) { alert('Ошибка: ' + e.message); }
  },
},
};
</script>

<style scoped>
.service-card {
height: 100%;
transition: transform 0.3s;
}
.service-card:hover {
transform: translateY(-5px);
}
.service-meta {
display: flex;
justify-content: space-between;
align-items: center;
margin-top: 12px;
font-size: 14px;
color: #666;
}
.price {
font-size: 20px;
font-weight: bold;
color: #e65100;
}
</style>