import axios from 'axios';

// ===
// Private helpers
// ===

function getSavedState(key) {
  const state = JSON.parse(window.localStorage.getItem(key));
  return state || {};
}

function saveState(key, state) {
  window.localStorage.setItem(key, JSON.stringify(state));
}
function setDefaultAuthHeaders(state) {
  const dev = process.env.NODE_ENV === 'development';
  const url = dev ? 'http://localhost:8000/api' : 'https://darkforum.herokuapp.com/api';
  axios.defaults.baseURL = url;
  axios.defaults.headers.common.Authorization = state.currentUser.user
    ? state.currentUser.token
    : '';
}

export default {
  namespaced: true,

  state: {
    currentUser: getSavedState('auth.currentUser')
  },

  getters: {
    isLoggedIn(state) {
      return !!state.currentUser.user;
    },

    authUser(state) {
      return state.currentUser.user || null;
    }
  },

  actions: {
    initAuthentication({ state }) {
      setDefaultAuthHeaders(state);
      return state.currentUser.user;
    },

    async register({ commit }, user) {
      try {
        const resp = await axios.post('/users/signup/', user);
        if (resp.data.token) {
          commit('setCurrentUser', resp.data);
          return resp.data;
        }
        return resp.data;
      } catch (error) {
        throw new Error(error.response);
      }
    },

    async signIn({ commit }, user) {
      try {
        const resp = await axios.post('/users/login/', user);
        if (resp.data.token) {
          commit('setCurrentUser', resp.data);
          return resp.data;
        }
        return resp.data;
      } catch (error) {
        throw new Error(error.response);
      }
    },

    signOut() {},

    fetchAuthUser() {}
  },

  mutations: {
    setCurrentUser(state, newValue) {
      state.currentUser = newValue;
      saveState('auth.currentUser', newValue);
      setDefaultAuthHeaders(state);
    },

    setUnsubscribeAuthObserver(state, unsubscribe) {
      state.unsubscribeAuthObserver = unsubscribe;
    }
  }
};
