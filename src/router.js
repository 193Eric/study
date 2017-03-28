import Vue from 'vue'
import Router from 'vue-router'
import indexPage from './components/header.vue'
import homePage from './views/home.vue'
import aboutPage from './views/joke.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: homePage
    },
    {
      path: '/joke',
      component: aboutPage
    }
  ]
})
