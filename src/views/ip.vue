//about.vue
<template>
    <div class='content'>
        <div class='title'>
            获取当前ip地址
        </div>
        <div>
            <div class='ip-content'>
                地区：
                {{data.en_name}}&nbsp{{data.city}}<br><br>
                互联网服务提供商：
                {{data.isp}}<br><br>
                <span class='show-ip'>
                ip地址：
                {{data.ip}}
                </span>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  name: 'eg',
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
       apiUrl:"http://route.showapi.com/632-1",
       showapi_sign:"1688d17e4c41492daaef9e12d36dcd0d",
       showapi_appid:"35517",
       data:'',
    }
  },
}
</script>
<style lang='less'>
    .ip-content{
        margin:20px;
    }
    .show-ip{
        color:#F7BA2A
    }
</style>
