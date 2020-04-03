<template>
  <div v-if="asyncDataStatus_ready" class="col-large push-top">
    <h1>
      {{thread.title}}
      <router-link
        :to="{name: 'ThreadEdit', slug: this.slug}"
        class="btn-green btn-small"
        tag="button"
      >Edit Thread</router-link>
    </h1>
    <p>
      By
      <a href="#" class="link-unstyled">{{thread.author.username}}</a>,
      <AppDate :timestamp="thread.publishedAt" />.
      <span
        style="float:right; margin-top: 2px;"
        class="hide-mobile text-faded text-small"
      >{{repliesCount}} replies by {{contributorsCount}} contributors</span>
    </p>
    <PostList v-if="posts" :posts="posts" :threadId="thread._id" />
    <PostEditor v-if="authUser" :threadId="thread._id" :threadSlug="thread.slug" />
    <div v-else class="text-center" style="margin-bottom: 50px;">
      <router-link
        :to="{name: 'SignIn', query: {
        redirectTo: $route.path
        }
        }"
      >Sign in</router-link>or
      <router-link
        :to="{name: 'Register', query: {
        redirectTo: $route.path
        }
        }"
      >Register</router-link>to post a reply.
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import PostList from '@/components/PostList';
import PostEditor from '@/components/PostEditor';
import asyncDataStatus from '@/mixins/asyncDataStatus';

export default {
  components: {
    PostList,
    PostEditor
  },

  mixins: [asyncDataStatus],

  props: {
    slug: {
      required: true,
      type: String
    }
  },

  computed: {
    ...mapState('threads', {
      thread: state => state.thread
    }),

    ...mapState('auth', {
      authUser: state => state.currentUser.user
    }),

    ...mapState('posts', {
      posts: state => state.posts
    }),

    repliesCount() {
      return this.thread.posts.length;
    },

    contributorsCount() {
      return this.thread.contributors.length;
    }
  },

  methods: {
    ...mapActions('threads', ['fetchThreadBySlug']),
    ...mapActions('posts', ['fetchPosts'])
  },

  created() {
    // fetch thread
    this.fetchThreadBySlug(this.slug).then(thread => {
      this.fetchPosts(thread._id);
      this.asyncDataStatus_fetched();
    });
  }
};
</script>
