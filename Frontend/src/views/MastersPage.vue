<template>
<v-container class="py-8">
  <h1 class="mb-2" style="color: #333;">Наши мастера</h1>
  <p class="text-grey mb-6">Профессионалы с многолетним опытом и допусками НАКС</p>

  <v-row>
    <v-col cols="12" md="6" v-for="m in masters" :key="m.id">
      <MasterCard :master="m" />
    </v-col>
  </v-row>
</v-container>
</template>

<script>
import MasterCard from '../components/UI/MasterCard.vue';
import mastersService from '../plugins/api/services/MastersService.js';

export default {
name: 'MastersPage',
components: { MasterCard },
data() { return { masters: [] }; },
async mounted() {
  try {
    const data = await mastersService.getAllMasters();
    this.masters = data.records || [];
  } catch (e) { console.error(e); }
},
};
</script>