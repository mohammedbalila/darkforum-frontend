<template>
  <div class="col-full push-top">
    <h1>
      Create new thread in
      <i>{{forumName}}</i>
    </h1>

    <ThreadEditor ref="editor" @save="save" @cancel="cancel" />
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import ThreadEditor from '@/components/ThreadEditor';
import asyncDataStatus from '@/mixins/asyncDataStatus';

export default {
  components: {
    ThreadEditor
  },

  mixins: [asyncDataStatus],

  props: {
    forumSlug: {
      type: String,
      required: true
    },

    forumId: {
      type: String,
      default: null
    },

    forumName: {
      type: String,
      default: null
    }
  },

  data() {
    return {
      saved: false
    };
  },

  computed: {
    user() {
      return this.$store.state.auth.currentUser.user;
    },

    hasUnsavedChanges() {
      return (this.$refs.editor.form.title || this.$refs.editor.form.text) && !this.saved;
    }
  },

  methods: {
    ...mapActions('threads', ['createThread']),

    save({ title, text }) {
      this.createThread({
        forum: this.forumId,
        title,
        text
      }).then(thread => {
        this.saved = true;
        this.$router.push({ name: 'ThreadShow', params: { slug: thread.slug } });
      });
    },

    cancel() {
      this.$router.push({ name: 'Forum', params: { id: this.forum['.key'] } });
    }
  },

  created() {
    if (!this.forumId) {
      this.$router.push({ to: 'Forum', slug: this.forumSlug });
    }
    this.$emit('ready');
  }

  // beforeRouteLeave(to, from, next) {
  //   if (this.hasUnsavedChanges) {
  //     // eslint-disable-next-line no-alert
  //     const confirmed = window.confirm('Are you sure you have Unsaved changes.');
  //     if (confirmed) {
  //       next();
  //     } else {
  //       next(false);
  //     }
  //   } else {
  //     next();
  //   }
  // }
};
</script>

<style scoped>
</style>
