<template>
<div class="filter-bar">
  <v-chip
    v-for="cat in categories"
    :key="cat"
    :color="selected === cat ? 'orange-darken-3' : 'grey-lighten-2'"
    :text-color="selected === cat ? 'white' : 'black'"
    class="mr-2 mb-2"
    size="large"
    @click="$emit('select', cat)"
  >
    {{ cat }}
  </v-chip>
</div>
</template>

<script>
export default {
name: 'FilterBar',
props: {
  categories: { type: Array, required: true },
  selected: { type: String, default: 'Все' },
},
emits: ['select'],
};
</script>

<style scoped>
.filter-bar {
display: flex;
flex-wrap: wrap;
padding: 20px 0;
}
</style>