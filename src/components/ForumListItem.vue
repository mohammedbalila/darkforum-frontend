<template>
  <div class="forum-listing">
    <div class="forum-details">
      <router-link
        class="text-xlarge"
        :to="{name: 'Forum', params: {
        slug: forum.slug
        }}"
      >{{forum.name}}</router-link>
    </div>

    <div class="last-thread">
      <!-- TODO: implement later -->
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  props: {
    forum: {
      required: true,
      type: Object
    }
  },

  data() {
    return {
      localForum: {}
    };
  },

  computed: {
    threadsCount() {
      return this.forum.threadsCount;
    }
  },

  methods: {
    ...mapActions('forums', ['fetchForum'])
  },

  created() {
    this.fetchForum(this.forum._id).then(forum => {
      this.localForum = forum;
    });
  }
};
</script>

<style scoped>
</style>
