<template>
  <div class="forum-list">
    <h2 class="list-title">
      <router-link
        :to="{name: 'Category', params: {
        slug: category.slug
        }}"
      >{{ category.name }}</router-link>
    </h2>

    <ForumList v-if="localCategory.forums" :forums="localCategory.forums" />
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import ForumList from './ForumList';

export default {
  components: {
    ForumList
  },

  data() {
    // eslint-disable-next-line vue/no-reserved-keys
    return { localCategory: {} };
  },

  props: {
    category: {
      required: true,
      type: Object
    }
  },

  created() {
    this.fetchCategory(this.category._id).then(category => {
      this.localCategory = category;
    });
  },

  methods: {
    ...mapActions('categories', ['fetchCategory'])
  },

  destroyed() {
    this.$destroy();
  }
};
</script>

<style scoped>
.forum-list {
  background-image: url('../assets/img/bats.jpg');
  background-position: center;
  background-size: cover;
}
</style>
