import Vue from 'vue'
import Router from 'vue-router'
import homePage from './views/home.vue'
import Today from './views/today.vue'
import jokeImgPage from './views/joke-img.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: homePage
    },
    {
      path: '/today',
      component: Today
    },
    {
      path:'/joke-img',
      component:jokeImgPage
    }
  ]
})
