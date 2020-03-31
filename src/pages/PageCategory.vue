<template>
  <div v-if="asyncDataStatus_ready" class="col-full">
    <h1>{{ category.name }}</h1>
    <CategoryListItem v-if="category" :category="category" />
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import CategoryListItem from '@/components/CategoryListItem';
import asyncDataStatus from '@/mixins/asyncDataStatus';

export default {
  components: {
    CategoryListItem
  },

  mixins: [asyncDataStatus],

  props: {
    slug: {
      required: true,
      type: String
    }
  },

  computed: {
    category() {
      return this.$store.state.categories.category;
    }
  },

  methods: {
    ...mapActions('categories', ['fetchCategoryBySlug']),
    ...mapActions('forums', ['fetchForums'])
  },

  created() {
    this.fetchCategoryBySlug(this.slug).then(() => {
      this.asyncDataStatus_fetched();
    });
  },

  destroyed() {
    this.$destroy();
  }
};
</script>

<style scoped>
</style>
