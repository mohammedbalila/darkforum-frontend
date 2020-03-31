import axios from 'axios';

// ===
// Private helpers
// ===

function getSavedState(key) {
  return JSON.parse(window.localStorage.getItem(key));
}

function saveState(key, state) {
  window.localStorage.setItem(key, JSON.stringify(state));
}
function setDefaultAuthHeaders(state) {
  const dev = process.env.NODE_ENV === 'development';
  const url = dev ? 'http://localhost:8000/api' : 'https://darkforum.herokuapp.com/api';
  axios.defaults.baseURL = url;
  axios.defaults.headers.common.Authorization = state.currentUser ? state.currentUser.token : '';
}

export default {
  namespaced: true,

  state: {
    currentUser: getSavedState('auth.currentUser')
  },

  getters: {
    authUser() {}
  },

  actions: {
    initAuthentication({ state }) {
      setDefaultAuthHeaders(state);
    },

    registerUserWithEmailAndPassword() {},

    signInWithEmailAndPassword() {},

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
