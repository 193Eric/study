import Vue from 'vue'
import Router from 'vue-router'
import homePage from './views/home.vue'
import Today from './views/today.vue'
import jokeImgPage from './views/joke-img.vue'
import My from './views/my.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: homePage
    },
    {
      path: '/my',
      component: My
    },
    {
      path:'/joke-img',
      component:jokeImgPage
    }
  ]
})
