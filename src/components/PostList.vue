<template>
  <div class="post-list">
    <PostListItem v-for="post in posts" :post="post" :threadId="threadId" :key="post._id" />
  </div>
</template>

<script>
import PostListItem from './PostListItem';

export default {
  components: {
    PostListItem
  },

  props: {
    posts: {
      required: true,
      type: Array
    },

    threadId: {
      type: String,
      required: true
    }
  }
};
</script>

<style scoped>
</style>
