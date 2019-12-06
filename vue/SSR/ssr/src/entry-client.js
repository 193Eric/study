import { createApp } from './main'
import Vue from 'Vue'
// 客户端特定引导逻辑……

const { app, router, store } = createApp()

Vue.mixin({
  beforeMount() {
      const {
          asyncData
      } = this.$options;
      //当前实例是否有该函数
      if (asyncData) {
         // 有就执行，并传入相应的参数。
          asyncData({
              store: this.$store,
              route: this.$route
          })
      }
  }
})

if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__)
}

app.$mount('#app')