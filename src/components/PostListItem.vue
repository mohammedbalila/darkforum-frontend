<template>
  <div v-if="post" class="post">
    <div class="user-info">
      <a href="#" class="user-name">{{post.author.username}}</a>

      <a href="#">
        <img
          class="avatar-large"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQfouyqq8NpiwUBExXDn0iR1XSl-_i3XYiTqvJ-PkcFxxgRnnZv&usqp=CAU"
          alt
        />
      </a>
    </div>

    <div class="post-content">
      <template v-if="!editing">
        <div>{{text}}</div>
        <a
          v-if="authUser && authUser._id === post.author._id"
          @click.prevent="editing = true"
          href="#"
          style="margin-left: auto;"
          class="link-unstyled"
          title="Make a change"
        >
          <i class="fa fa-pencil"></i>
        </a>
      </template>
      <div v-else>
        <PostEditor :post="post" :threadId="threadId" @save="save" @cancel="editing = false" />
      </div>
    </div>

    <div class="post-date text-faded">
      <div v-if="post.edited" class="edition-info">edited</div>
      <AppDate :timestamp="post.publishedAt" />
    </div>
  </div>
</template>

<script>
import PostEditor from './PostEditor';

export default {
  props: {
    post: {
      required: true,
      type: Object
    },
    threadId: {
      required: true,
      type: String
    }
  },

  components: {
    PostEditor
  },

  data() {
    return {
      editing: false,
      text: this.post.text
    };
  },

  computed: {
    authUser() {
      return this.$store.state.auth.currentUser.user;
    }
  },

  methods: {
    save(text) {
      this.editing = false;
      this.text = text;
    }
  }
};
</script>

<style scoped>
</style>
