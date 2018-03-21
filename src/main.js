import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';

Vue.use(VueRouter);
const router = new VueRouter();

// Create our Vue App and replace the <div id="app"></div> with it
new Vue({
  el: '#app',
  router,
  render: h => h(App)
});
