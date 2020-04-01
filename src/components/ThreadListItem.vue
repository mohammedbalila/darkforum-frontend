<template>
  <div v-if="thread" class="thread">
    <div>
      <p>
        <router-link
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
