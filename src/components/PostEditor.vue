<template>
  <form @submit.prevent="save">
    <div class="form-group">
      <textarea name="text" cols="30" rows="10" class="form-input" v-model="text"></textarea>
    </div>
    <div class="form-actions">
      <button v-if="isUpdate" @click.prevent="cancel" class="btn btn-ghost">Cancel</button>
      <button v-if="isUpdate" @click.prevent="update" class="btn btn-ghost">edit</button>
      <button v-else @click.prevent="save" class="btn-blue">reply</button>
    </div>
  </form>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  props: {
    threadId: {
      type: String,
      required: true
    },

    threadSlug: {
      type: String
    },

    post: {
      type: Object,
      default: null
    }
  },

  data() {
    return {
      text: this.post ? this.post.text : ''
    };
  },

  computed: {
    isUpdate() {
      return !!this.post;
    }
  },

  methods: {
    ...mapActions('posts', ['createPost', 'updatePost']),

    save() {
      const post = { text: this.text, thread: this.threadId };
      this.createPost(post).then(() => {
        this.$emit('save');
        this.$store.dispatch('posts/fetchPosts', this.threadId);
      });
    },

    cancel() {
      this.$emit('cancel');
    },

    create() {
      const post = {
        text: this.text,
        threadId: this.threadId
      };
      this.createPost(post).then();
    },

    update() {
      const payload = {
        id: this.post._id,
        text: this.text
      };
      this.$emit('save');
      return this.updatePost(payload);
    }
  }
};
</script>

<style scoped>
</style>
