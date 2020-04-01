<template>
  <div class="thread-list">
    <h2 class="list-title">Threads {{threadsCount}}</h2>
    <ThreadListItem v-for="thread in threads" :thread="thread" :key="thread._id" />
  </div>
</template>

<script>
import ThreadListItem from './ThreadListItem';

export default {
  components: {
    ThreadListItem
  },

  props: {
    threads: {
      required: true,
      type: Array
    }
  },

  computed: {
    threadsCount() {
      return this.threads.length;
    }
  }
};
</script>
