<template>
  <div v-if="asyncDataStatus_ready" class="forum-wrapper">
    <div class="col-full push-top">
      <div class="forum-header">
        <div class="forum-details">
          <h1>{{forum.name}}</h1>
          <p class="text-lead">{{forum.description}}</p>
        </div>
        <router-link
          :to="{name: 'ThreadCreate', params: {forumId: this.forum.id}}"
          class="btn-green btn-small"
        >Start a thread</router-link>
      </div>
    </div>

    <div class="col-full push-top">
      <ThreadList :threads="threads" />
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import ThreadList from '@/components/ThreadList';
import asyncDataStatus from '@/mixins/asyncDataStatus';

export default {
  components: {
    ThreadList
  },

  mixins: [asyncDataStatus],

  props: {
    id: {
      required: true,
      type: String
    }
  },

  computed: {
    forum() {
      return this.$store.state.forums.forums[this.id];
    },

    threads() {
      return [];
    }
  },

  methods: {
    ...mapActions('forums', ['fetchForum']),
    ...mapActions('threads', ['fetchThreads']),
    ...mapActions('users', ['fetchUser'])
  },

  created() {
    this.fetchForum(this.id).then(() => {
      this.asyncDataStatus_fetched();
    });
  }
};
</script>

<style scoped>
.forum-wrapper {
  width: 100%;
}
</style>
