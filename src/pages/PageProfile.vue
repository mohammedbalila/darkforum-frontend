<template>
  <div class="flex-grid" v-if="user">
    <UserProfileCard
      v-if="!edit"
      :user="user"
      :authUsername="currentUser.user ? currentUser.user.username : null"
      :userPostsCount="userPosts.length"
      :userThreadsCount="userThreads.length"
    />
    <UserProfileCardEditor v-else :user="user" />

    <div class="col-7 push-top">
      <div class="profile-header">
        <span class="text-lead"> {{ username }}'s recent activity </span>
      </div>

      <hr />
      <PostList :posts="userPosts" />
    </div>
  </div>
</template>

<script>
import PostList from '@/components/PostList';
import UserProfileCard from '@/components/UserProfileCard';
import UserProfileCardEditor from '@/components/UserProfileCardEditor';
import { mapState } from 'vuex';
import asyncDataStatus from '@/mixins/asyncDataStatus';

export default {
  components: {
    PostList,
    UserProfileCard,
    UserProfileCardEditor
  },

  mixins: [asyncDataStatus],

  props: {
    edit: {
      type: Boolean,
      default: false
    },
    username: {
      type: String,
      required: true
    }
  },

  computed: {
    ...mapState('users', {
      userPosts: state => state.posts,
      userThreads: state => state.threads,
      user: state => state.user
    }),

    ...mapState('auth', ['currentUser'])
  },
  created() {
    this.$store.dispatch('users/getPosts', this.username);
    this.$store.dispatch('users/getThreads', this.username);
    this.$store
      .dispatch('users/fetchUser', this.username)
      .then(() => this.asyncDataStatus_fetched());
  }
};
</script>

<style scoped></style>
