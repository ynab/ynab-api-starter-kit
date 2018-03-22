import Vue from 'vue';
import App from './App.vue';

// Create our Vue App and replace the <div id="app"></div> with it
new Vue({
  el: '#app',
  render: h => h(App)
});
