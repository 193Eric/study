//about.vue
<template>
    <div class='content'>
        <div class='title'>
            每天五条英语
        </div>
        <div class='content-item' v-for='item in data'>
            {{item.english}}<br>
            {{item.chinese}}
        </div>
    </div>
</template>
<script>
export default {
  name: 'eg',
  mounted(){
        let that = this;
        this.$http.post(this.apiUrl,{showapi_appid:this.showapi_appid,showapi_sign:this.showapi_sign,count:5},{emulateJSON:true})
				.then((res) => {
                    that.data = res.body.showapi_res_body.data;
				}),function(error){
                    
                }     
  },
  created(){
    //用vuex设置状态，改变class;
     this.$store.dispatch("inOther");
  },
  data () {
    return {
       apiUrl:"http://route.showapi.com/1211-1",
       showapi_sign:"1688d17e4c41492daaef9e12d36dcd0d",
       showapi_appid:"35517",
       data:'',
    }
  },
}
</script>
<style lang='less'>
    
</style>
