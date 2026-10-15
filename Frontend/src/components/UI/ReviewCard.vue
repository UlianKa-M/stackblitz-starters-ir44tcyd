<template>
<v-card class="review-card" elevation="2">
  <v-card-text>
    <div class="review-header">
      <v-avatar color="blue-grey" size="48">
        <span class="text-white">{{ initials }}</span>
      </v-avatar>
      <div>
        <h4>{{ review.fields.ClientName }}</h4>
        <div class="rating">
          <v-icon v-for="i in 5" :key="i" :color="i <= review.fields.Rating ? 'orange-darken-3' : 'grey-lighten-2'" size="18">
            mdi-star
          </v-icon>
          <span class="date">{{ review.fields.Date }}</span>
        </div>
      </div>
    </div>
    <p class="review-text">«{{ review.fields.Text }}»</p>
    <v-chip v-if="review.fields.ServiceName" size="small" color="orange-lighten-4">
      {{ review.fields.ServiceName }}
    </v-chip>
  </v-card-text>
</v-card>
</template>

<script>
export default {
name: 'ReviewCard',
props: { review: { type: Object, required: true } },
computed: {
  initials() {
    const parts = this.review.fields.ClientName.split(' ');
    return (parts[0][0] + (parts[1]?.[0] || '')).toUpperCase();
  },
},
};
</script>

<style scoped>
.review-card {
height: 100%;
}
.review-header {
display: flex;
gap: 12px;
margin-bottom: 12px;
}
.review-header h4 {
margin: 0;
font-size: 16px;
}
.rating {
display: flex;
align-items: center;
gap: 4px;
margin-top: 4px;
}
.date {
margin-left: 8px;
font-size: 12px;
color: #999;
}
.review-text {
font-style: italic;
color: #555;
line-height: 1.6;
margin: 12px 0;
}
</style>