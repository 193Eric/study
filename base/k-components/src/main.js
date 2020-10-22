import Vue from 'vue'
import App from './App.vue'
import router from './router'
import "./../lib/k-ui.css"
import UI from "./../lib/k-ui.common.js";

Vue.use(UI)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
