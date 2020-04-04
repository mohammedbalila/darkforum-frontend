<template>
  <div v-if="thread" class="bg-image">
    <div>
      <p>
        <router-link
          class="text-white"
          :to="{name: 'ThreadShow', params:
        {
          slug: thread.slug
          }
        }"
        >{{thread.title}}</router-link>
      </p>
      <p class="text-faded text-xsmall">
        By
        <a href="#">{{thread.author.username}}</a>,
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    thread: {
      required: true,
      type: Object
    }
  },

  computed: {}
};
</script>
<style scoped>
.bg-image {
  background-image: url('../assets/img/bats.jpg');
  background-position: center;
  background-size: cover;
  padding: 10px;
}
</style>
