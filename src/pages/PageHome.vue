<template>
  <div v-if="asyncDataStatus_ready" class="col-full push-top">
    <h1>Welcome to the Forum</h1>
    <CategoryList :categories="categories" />
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import CategoryList from '@/components/CategoryList';
import asyncDataStatus from '@/mixins/asyncDataStatus';

export default {
  components: {
    CategoryList
  },

  mixins: [asyncDataStatus],

  computed: {
    ...mapState('categories', {
      categories: state => state.categories
    })
  },

  methods: {
    ...mapActions('categories', ['fetchCategories'])
  },

  created() {
    this.fetchCategories().then(() => {
      this.asyncDataStatus_fetched();
    });
  }
};
</script>
