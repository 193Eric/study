//index.vue
<template>
    <div class='home'>
        <div class='home-title'>
            Box
        </div>
        <banner></banner>
        <navBox></navBox>
        <news></news>
    </div>
</template>
<script>
import banner from './../components/banner.vue';
import news from './../components/news.vue';
import navBox from './../components/nav-box.vue';
export default {
  name: 'home',
  components:{
    banner,
    news,
    navBox
  },
  created(){
    //用vuex设置状态，改变class;
     this.$store.dispatch("inHome");
  }
}
</script>
<style lang='less'>
 .home{
    width: 100%;
    height: auto;
    margin-bottom: 40px;
    .home-title{
      height:30px;
      background:#00a6c6;
      color:#fff;
      line-height:30px;
      text-indent:10px;
      font-size:14px;  
    }
}
</style>