import axios from 'axios';

export default {
  namespaced: true,

  state: {
    threads: [],
    thread: {}
  },

  getters: {
    threadRepliesCount() {}
  },

  actions: {
    createThread() {},

    updateThread() {},

    async fetchThreadBySlug({ commit }, slug) {
      try {
        const resp = await axios.get(`/threads/slug/${slug}`);
        commit('setThread', resp.data.thread);
        return resp.data.thread;
      } catch (error) {
        throw Error(error);
      }
    },

    fetchThread() {},

    fetchThreads() {}
  },
  mutations: {
    setThreads(state, threads) {
      state.threads = threads;
    },

    setThread(state, thread) {
      state.thread = thread;
    },

    appendPostToThread() {},

    appendContributorToThread() {}
  }
};
