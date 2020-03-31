import axios from 'axios';

export default {
  namespaced: true,

  state: {
    forums: [],
    forum: {}
  },

  actions: {
    async fetchForum({ commit }, id) {
      try {
        const resp = await axios.get(`/forums/${id}`);
        commit('setForum', resp.data.forum);
      } catch (error) {
        throw Error(error);
      }
    },

    async fetchForums({ commit }) {
      try {
        const resp = await axios.get('/forums');
        commit('setForums', resp.data.forums);
      } catch (error) {
        throw Error(error);
      }
    }
  },

  mutations: {
    appendThreadToForum() {},

    setForums(state, forums) {
      state.forums = forums;
    },

    setForum(state, forum) {
      state.forum = forum;
    }
  }
};
