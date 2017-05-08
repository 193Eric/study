//joke-img.vue
<template>
    <div class='content'>
        <div class='title'>搞笑图片</div>
        <div class='content-img' v-for='item in data'>
            <div class='img-title'>{{item.content}}</div>
            <img v-bind:src='item.url'/>
        </div>
    </div>
</template>
<script>
export default {
  name: 'joke-img',
  mounted(){
        let that = this;
        this.$http.jsonp(this.apiUrl,{params:{key:this.key,type:'pic'}},{emulateJSON:true})
				.then((res) => {
                    that.data = JSON.parse(res.bodyText).result;
				}),function(error){}     
  },
  created(){
    //用vuex设置状态，改变class;
     this.$store.dispatch("inOther");
  },
  data () {
    return {
       apiUrl:"http://v.juhe.cn/joke/randJoke.php",
       key:"12175aade3931810fcd18dd2c0cf9474",
       data:'',
    }
  },
}
</script>
<style lang='less'>
  .content-img{
    padding:10px 10px;
    border-bottom: 1px solid #cdcdcd;
    text-align: center;
    .img-title{
      text-align: left;
      line-height:30px;
    }
    img{
      width:250px;
      height:auto;
    }
  }
</style>