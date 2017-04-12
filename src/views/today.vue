//about.vue
<template>
    <div class='joke-content'>
        <div class='joke-title'>今日运气</div>
        <div class='content-item'>冲煞：{{data.chongsha}}</div>
        <div class='content-item'>运势：{{data.jrhh}}</div>
        <div class='content-item'>宜：{{data.yi}}</div>
        <div class='content-item'>星座：{{data.xingzuo}}</div>
        <div class='content-item'>日：{{data.zhiri}}</div>
    </div>
</template>
<script>
export default {
  name: 'joke',
  mounted(){
        let that = this;
        this.$http.post(this.apiUrl,{showapi_appid:this.showapi_appid,showapi_sign:this.showapi_sign},{emulateJSON:true})
				.then((res) => {
                    that.data = res.body.showapi_res_body;
				}),function(error){
                    
                }     
  },
  data () {
    return {
       apiUrl:"http://route.showapi.com/856-1",
       showapi_sign:"1688d17e4c41492daaef9e12d36dcd0d",
       showapi_appid:"35517",
       data:'',
    }
  },
}
</script>
<style lang='less'>
    .joke-content{
            margin: 0;
            padding:40px 0;
            position: relative;
            .joke-title{
                text-align:center;
                 position: fixed;
                 top:0;
                 width:100%;
                color: #fff;
                font-size: 20px;
                background:#00a6c6;
                text-align: center;
                line-height: 40px;
                font-family: cursive;
            }
            .content-item{
                padding:10px 10px;
                border-bottom:1px solid #cdcdcd
            }
    }
</style>
