// app.js
import Vue from 'vue'
import App from './App.vue'
import { createRouter } from './router'
import { createStore } from './store/store'
import { sync } from 'vuex-router-sync'

export function createApp () {
  // 创建 router 实例
  const router = createRouter()
  const store = createStore()
  
  // 同步路由状态(route state)到 store
  sync(store, router)

  const app = new Vue({
    // 注入 router 到根 Vue 实例
    router,
    store,
    render: h => h(App)
  })

  // 返回 app 和 router
  return { app, router, store }
}