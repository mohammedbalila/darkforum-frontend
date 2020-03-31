export default {
  namespaced: true,

  state: {
    items: []
  },

  getters: {
    threadRepliesCount() {}
  },

  actions: {
    createThread() {},

    updateThread() {},

    fetchThread() {},

    fetchThreads() {}
  },
  mutations: {
    setThread() {},

    appendPostToThread() {},

    appendContributorToThread() {}
  }
};
