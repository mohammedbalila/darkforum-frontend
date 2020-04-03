import axios from 'axios';

export default {
  namespaced: true,

  state: {
    posts: [],
  },

  actions: {
    async createPost(_, post) {
      try {
        const resp = await axios.post('/posts/', post);
        return resp.data.post;
      } catch (error) {
        throw Error(error);
      }
    },

    async updatePost(_, post) {
      try {
        const resp = await axios.put(`/posts/${post.id}`, post);
        return resp.data.post;
      } catch (error) {
        throw Error(error);
      }
    },

    fetchPost() {},

    async fetchPosts({ commit }, threadId) {
      try {
        const resp = await axios.get(`/posts/?thread=${threadId}`);
        commit('setPosts', resp.data.posts);
        return resp.data.posts;
      } catch (error) {
        throw Error(error);
      }
    },
  },

  mutations: {
    setPost() {},
    setPosts(state, posts) {
      state.posts = posts;
    },
  },
};
