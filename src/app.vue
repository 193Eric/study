<!--App.vue是项目入口文件。-->
<template>
    <div id="app">
        <router-view></router-view>
        <footer-tab></footer-tab>
    </div>
</template>

<script>
import FooterTab from './components/footer.vue';
import store from './vuex/store';
export default {
  name: 'app',
  store,
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  components:{
    FooterTab
  }
}
</script>
<style lang='less'>
  #app{
    width:100%;
    height:100%;
  }
  ::-webkit-scrollbar{width:1px;}
  .br{
    height: 2px;
    background-color: #f7f7f7;
    border-top:1px solid #e5e5e5;
  } 
</style>