<template>
<v-card class="portfolio-card" elevation="3" hover>
  <div class="portfolio-image">
    <v-icon size="64" color="orange-darken-3">mdi-image-outline</v-icon>
  </div>
  <v-card-title>{{ work.fields.Title }}</v-card-title>
  <v-card-subtitle>
    <v-chip size="small" color="orange-lighten-4">{{ work.fields.Category }}</v-chip>
    <span class="date">{{ work.fields.Date }}</span>
  </v-card-subtitle>
  <v-card-text>
    <p>{{ work.fields.Description }}</p>
    <p class="client"><b>Заказчик:</b> {{ work.fields.Client }}</p>
  </v-card-text>
</v-card>
</template>

<script>
export default {
name: 'PortfolioCard',
props: { work: { type: Object, required: true } },
};
</script>

<style scoped>
.portfolio-card {
height: 100%;
transition: transform 0.3s;
}
.portfolio-card:hover {
transform: translateY(-5px);
}
.portfolio-image {
height: 180px;
background: linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%);
display: flex;
align-items: center;
justify-content: center;
border-radius: 4px 4px 0 0;
}
.date {
margin-left: 8px;
font-size: 12px;
color: #999;
}
.client {
font-size: 13px;
color: #666;
margin-top: 8px;
}
</style>