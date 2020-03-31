<template>
  <div>
    <CategoryListItem v-for="category in categories" :category="category" :key="category.id" />
  </div>
</template>

<script>
import CategoryListItem from './CategoryListItem';

export default {
  components: {
    CategoryListItem
  },

  props: {
    categories: {
      required: true,
      type: Array
    }
  }
};
</script>

<style scoped>
</style>
