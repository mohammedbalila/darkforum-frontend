import axios from 'axios';

export default {
  namespaced: true,

  state: {
    categories: [],
    forums: [],
    category: {}
  },

  actions: {
    async fetchCategory({ commit }, id) {
      try {
        const resp = await axios.get(`/categories/${id}`);
        commit('setCategory', resp.data.category);
        return resp.data.category;
      } catch (error) {
        throw Error(error);
      }
    },

    async fetchCategories({ commit }) {
      try {
        const resp = await axios.get('/categories');
        commit('setCategories', resp.data.categories);
      } catch (error) {
        throw Error(error);
      }
    },

    async fetchCategoryBySlug({ commit }, slug) {
      try {
        const resp = await axios.get(`/categories/slug/${slug}`);
        commit('setCategory', resp.data.category);
        return resp.data.category;
      } catch (error) {
        throw Error(error);
      }
    },

    async fetchForums({ commit }, id) {
      try {
        const resp = await axios.get('/forums');
        // const resp = await axios.get(`/categories/${id}/forums`);
        commit('setForums', resp.data.forums);
      } catch (error) {
        throw Error(id);
      }
    }
  },

  mutations: {
    setCategories(state, categories) {
      state.categories = categories;
    },

    setCategory(state, category) {
      state.category = category;
    },

    setForums(state, forums) {
      state.forums = forums;
    }
  }
};
