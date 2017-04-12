//index.vue
<template>
    <div class='home'>
        <div class='home-title'>
            Eric百宝箱
        </div>
        <banner></banner>
        <news></news>
    </div>
</template>
<script>
import banner from './../components/banner.vue';
import news from './../components/news.vue';
export default {
  name: 'home',
  components:{
    banner,
    news
  },
  data () {
    return {
       
    }
  },
}
</script>
<style lang='less'>
 .home{
    width:100%;
    height:100%;
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