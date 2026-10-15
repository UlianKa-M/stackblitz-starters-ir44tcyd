<template>
<v-card class="service-card" elevation="3">
  <v-card-title>{{ service.fields.Name }}</v-card-title>
  <v-card-subtitle>{{ service.fields.Category }}</v-card-subtitle>
  <v-card-text>
    <p>{{ service.fields.Description }}</p>
    <p class="price"><b>Цена: {{ service.fields.Price }} ₽</b></p>
  </v-card-text>
  <v-card-actions>
    <v-spacer />
    <v-btn color="orange-darken-3" variant="flat" @click="$emit('order', service)">Заказать</v-btn>
  </v-card-actions>
</v-card>
</template>

<script>
export default {
name: 'ServiceCard',
props: { service: { type: Object, required: true } },
emits: ['order'],
};
</script>

<style scoped>
.service-card { margin-bottom: 16px; }
.price { margin-top: 12px; color: #e65100; font-size: 18px; }
</style>