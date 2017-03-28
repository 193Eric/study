import Vue from 'vue'
import Router from 'vue-router'
import homePage from './views/home.vue'
import jokePage from './views/joke.vue'
import jokeImgPage from './views/joke-img.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: homePage
    },
    {
      path: '/joke',
      component: jokePage
    },
    {
      path:'/joke-img',
      component:jokeImgPage
    }
  ]
})
