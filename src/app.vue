<!--App.vue是项目入口文件。-->
<template>
    <div id="app">
        <header-tab></header-tab>
        <div class="nav-box">
            <p class="nav-list">
                <router-link class="nav-item" to="/">首页</router-link>
                <router-link class="nav-item" to="/about">关于</router-link>
            </p>
        </div>
        <div>
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
import HeaderTab from './components/header.vue';
export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  components:{
    HeaderTab
  }
}
</script>

<style lang="less">
  
</style>