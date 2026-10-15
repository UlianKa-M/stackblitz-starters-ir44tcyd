<template>
<v-card class="master-card" elevation="4" hover>
  <v-card-text>
    <div class="master-header">
      <v-avatar color="orange-darken-3" size="80">
        <span class="text-h4 text-white">{{ initials }}</span>
      </v-avatar>
      <div class="master-info">
        <h3>{{ master.fields.Name }}</h3>
        <p class="position">{{ master.fields.Position }}</p>
      </div>
    </div>
    <v-divider class="my-3"></v-divider>
    <div class="master-stats">
      <div class="stat">
        <v-icon color="orange-darken-3">mdi-star</v-icon>
        <span>{{ master.fields.Rating }}</span>
      </div>
      <div class="stat">
        <v-icon color="orange-darken-3">mdi-briefcase-check</v-icon>
        <span>{{ master.fields.CompletedOrders }} заказов</span>
      </div>
      <div class="stat">
        <v-icon color="orange-darken-3">mdi-clock-outline</v-icon>
        <span>{{ master.fields.Experience }} лет опыта</span>
      </div>
    </div>
    <p class="specialization"><b>Специализация:</b> {{ master.fields.Specialization }}</p>
    <p class="description">{{ master.fields.Description }}</p>
  </v-card-text>
</v-card>
</template>

<script>
export default {
name: 'MasterCard',
props: { master: { type: Object, required: true } },
computed: {
  initials() {
    const parts = this.master.fields.Name.split(' ');
    return (parts[0][0] + (parts[1]?.[0] || '')).toUpperCase();
  },
},
};
</script>

<style scoped>
.master-card {
height: 100%;
transition: transform 0.3s;
}
.master-card:hover {
transform: translateY(-5px);
}
.master-header {
display: flex;
align-items: center;
gap: 16px;
}
.master-info h3 {
margin: 0;
font-size: 20px;
color: #333;
}
.position {
margin: 4px 0 0 0;
color: #e65100;
font-weight: 500;
}
.master-stats {
display: flex;
flex-direction: column;
gap: 8px;
margin-bottom: 12px;
}
.stat {
display: flex;
align-items: center;
gap: 8px;
font-size: 14px;
}
.specialization {
font-size: 14px;
color: #555;
margin-bottom: 8px;
}
.description {
font-size: 13px;
color: #777;
line-height: 1.5;
}
</style>