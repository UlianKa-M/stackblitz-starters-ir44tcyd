<template>
<v-container class="py-8">
  <h1 class="mb-2" style="color: #333;">Наши работы</h1>
  <p class="text-grey mb-6">Примеры выполненных проектов</p>

  <FilterBar :categories="categories" :selected="selectedCategory" @select="filterByCategory" />

  <v-row>
    <v-col cols="12" md="6" lg="4" v-for="w in filteredWorks" :key="w.id">
      <PortfolioCard :work="w" />
    </v-col>
  </v-row>
</v-container>
</template>

<script>
import FilterBar from '../components/UI/FilterBar.vue';
import PortfolioCard from '../components/UI/PortfolioCard.vue';
import portfolioService from '../plugins/api/services/PortfolioService.js';

export default {
name: 'PortfolioPage',
components: { FilterBar, PortfolioCard },
data() {
  return {
    works: [],
    categories: ['Все'],
    selectedCategory: 'Все',
  };
},
computed: {
  filteredWorks() {
    if (this.selectedCategory === 'Все') return this.works;
    return this.works.filter(w => w.fields.Category === this.selectedCategory);
  },
},
async mounted() {
  try {
    const data = await portfolioService.getAllWorks();
    this.works = data.records || [];
    const cats = [...new Set(this.works.map(w => w.fields.Category))];
    this.categories = ['Все', ...cats];
  } catch (e) { console.error(e); }
},
methods: {
  filterByCategory(cat) { this.selectedCategory = cat; },
},
};
</script>