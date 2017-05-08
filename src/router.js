import Vue from 'vue'
import Router from 'vue-router'
import homePage from './views/home.vue'
import Today from './views/today.vue'
import jokeImgPage from './views/joke-img.vue'
import My from './views/my.vue'
import Luck from './views/luck.vue'
import Eg from './views/eg.vue'
import Ip from './views/ip.vue'
import CnEg from './views/cn-eg.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: resolve => require(['./views/home.vue'], resolve)
    },
    {
      path: '/my',
      component: My
    },
    {
      path: '/joke-img',
      component: jokeImgPage
    },
    {
      path: '/luck',
      component: Luck
    },
    {
      path: '/today',
      component: Today
    },
    {
      path: '/eg',
      component: Eg
    },
    {
      path: '/ip',
      component: Ip
    },
    {
      path: '/cn-eg',
      component: CnEg
    }
  ]
})
