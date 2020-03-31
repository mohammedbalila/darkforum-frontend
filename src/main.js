// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import store from '@/store';
import AppDate from '@/components/AppDate';
import vuelidate from 'vuelidate';
import router from './router';
import App from './App';

Vue.use(vuelidate);
Vue.component('AppDate', AppDate);

Vue.config.productionTip = false;

/* eslint-disable */
new Vue({
  router,
  store,

  render: function(h) {
    return h(App);
  }
}).$mount('#app');
