// main.js这是项目的核心文件。全局的配置都在这个文件里面配置
import Vue from 'vue'
import App from './app.vue'
import router from './router.js'
import Vuex from 'vuex'
import VueResource from 'vue-resource'
import './assets/less/index.less'
Vue.config.debug = true; // 开启错误提示
Vue.use(VueResource)
Vue.use(Vuex)
Vue.http.options.emulateHTTP = true
const vuex_store = new Vuex.Store({
  state: {
    home: true,
    my: false
  },
  mutations: {
    mutationHome(state) {
      state.home = true
      state.my = false
    },
    mutationMy(state) {
      state.home = false
      state.my = true
    },
    mutationOhter(state) {
      state.home = false
      state.my = false
    }
  }
})
new Vue({
  router,
  el: '#appIndex',
  store: vuex_store,
  render: h => h(App)
})
