// src/store/index.js
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('token') || '', // get from localStorage
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
      if (token) {
        localStorage.setItem('token', token); // storage token to localStorage
      } else {
        localStorage.removeItem('token'); // delete token
      }
    },
    clearToken(state) {
      state.token = '';
      localStorage.removeItem('token'); // delete token from localStorage
    },
  },
  actions: {
    login({ commit }, token) {
      commit('setToken', token);
    },
    logout({ commit }) {
      commit('clearToken');
    },
  },
  getters: {
    isAuthenticated: state => !!state.token, // check if user is authenticated
  },
});
