import axios from 'axios';

export default {
  namespaced: true,

  state: {
    user: {},
    threads: [],
    posts: []
  },

  getters: {
    userPosts() {},

    userThreadsCount() {},

    userPostsCount() {}
  },

  actions: {
    async getPosts({ commit }, id) {
      try {
        const resp = await axios.get(`/posts/user/${id}`);
        commit('setPosts', resp.data.posts);
      } catch (error) {
        throw new Error(error);
      }
    },

    async getThreads({ commit }, id) {
      try {
        const resp = await axios.get(`/threads/user/${id}`);
        commit('setThreads', resp.data.threads);
      } catch (error) {
        throw new Error(error);
      }
    },
    updateUser() {},

    async fetchUser({ commit }, username) {
      try {
        const resp = await axios.get(`/users/username/${username}`);
        commit('setUser', resp.data.user);
      } catch (error) {
        throw new Error(error);
      }
    },

    fetchUsers() {}
  },

  mutations: {
    setUser(state, user) {
      state.user = user;
    },

    setPosts(state, posts) {
      state.posts = posts;
    },

    setThreads(state, threads) {
      state.threads = threads;
    },

    appendPostToUser() {},
    appendThreadToUser() {}
  }
};
