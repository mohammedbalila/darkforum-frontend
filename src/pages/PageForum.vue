<template>
  <div v-if="asyncDataStatus_ready" class="forum-wrapper">
    <div class="col-full push-top" v-if="forum">
      <div class="forum-header">
        <div class="forum-details">
          <h1>{{forum.name}}</h1>
          <p class="text-lead">{{forum.description}}</p>
          <AppDate :timestamp="forum.publishedAt" />.
          <p>by {{forum.author.username}}.</p>
        </div>
        <router-link
          :to="{name: 'ThreadCreate', params: {
            forumSlug: this.forum.slug,
            forumName: this.forum.name,
            forumId: this.forum._id,
            }}"
          class="btn-green btn-small"
        >Start a thread</router-link>
      </div>
    </div>

    <div class="col-full push-top">
      <ThreadList :threads="forum.threads" />
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import moment from 'moment';
import ThreadList from '@/components/ThreadList';
import asyncDataStatus from '@/mixins/asyncDataStatus';

export default {
  components: {
    ThreadList
  },

  mixins: [asyncDataStatus],

  props: {
    slug: {
      required: true,
      type: String
    }
  },

  computed: {
    forum() {
      return this.$store.state.forums.forum;
    },

    publishedAt() {
      return moment(this.forum.publishedAt).fromNow();
    }
  },

  methods: {
    ...mapActions('forums', ['fetchForumBySlug']),
    ...mapActions('threads', ['fetchThreads']),
    ...mapActions('users', ['fetchUser'])
  },

  created() {
    this.fetchForumBySlug(this.slug).then(() => {
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
