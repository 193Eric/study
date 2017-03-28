<!--App.vue是项目入口文件。-->
<template>
    <div id="app">
        <div>
            <router-view></router-view>
        </div>
        <footer-tab></footer-tab>
    </div>
</template>

<script>
import FooterTab from './components/footer.vue';
export default {
  name: 'app',
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

<style lang="less">
  @background:"./assets/images/backgroud.jpg";  
  #app{
    width:100%;
    height:100%;
    background:url(@background);
    background-size:100%;
    }
</style>