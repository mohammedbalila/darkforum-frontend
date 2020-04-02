<template>
  <div class="col-3 push-top">
    <div class="profile-card">
      <p class="text-center">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQfouyqq8NpiwUBExXDn0iR1XSl-_i3XYiTqvJ-PkcFxxgRnnZv&usqp=CAU"
          alt
          class="avatar-xlarge"
        />
      </p>

      <h1 class="title">{{ user.username }}</h1>

      <p class="text-lead">{{ user.fullName }}</p>

      <p class="text-justify">
        <span v-if="user.bio">{{ user.bio }}</span>
        <span v-else>No bio specified.</span>
      </p>

      <p class="text-xsmall text-faded text-center">
        Member since {{ registeredAt }}, last visited {{ lastVisit }}.
      </p>

      <div class="stats">
        <span>{{ userPostsCount }} posts</span>
        <span>{{ userThreadsCount }} threads</span>
      </div>

      <hr />
    </div>

    <div class="text-center">
      <hr />
      <router-link
        v-if="authUsername && authUsername === user.username"
        :to="{
          name: 'ProfileEdit'
        }"
        class="btn-green btn-small"
        >Edit Profile</router-link
      >
    </div>
  </div>
</template>

<script>
import moment from 'moment';

export default {
  props: {
    user: {
      required: true
    },

    authUsername: {
      type: String,
      default: null
    },

    userPostsCount: {
      required: true,
      type: Number
    },

    userThreadsCount: {
      required: true,
      type: Number
    }
  },

  computed: {
    registeredAt() {
      return moment(this.user.registeredAt).format('MMMM YYYY');
    },
    lastVisit() {
      return moment(this.user.lastVisitAt).fromNow();
    }
  }
};
</script>

<style scoped></style>
