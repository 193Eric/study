<template>
<div class="news">
    <div class='news-item' v-for='item in data'>
        <div class='news-title'>{{item.title}}</div>
        <img v-if='item.imageurls[0]' v-bind:src='item.imageurls[0]?item.imageurls[0].url:""' class= 'news-img'/>
        <div class='news-time'>{{item.pubDate}}</div>
    </div>
</div>
</template>
<script>
export default {
  name: 'joke-img',
  mounted(){
        let that = this;
        this.$http.post(this.apiUrl,{showapi_appid:this.showapi_appid,showapi_sign:this.showapi_sign},{emulateJSON:true})
				.then((res) => {
                    that.data = res.data.showapi_res_body.pagebean.contentlist.splice(1,3)
				}),function(error){
                    
                }     
  },
  data () {
    return {
       apiUrl:"http://route.showapi.com/109-35",
       showapi_sign:"1688d17e4c41492daaef9e12d36dcd0d",
       showapi_appid:"35517",
       data:'',
    }
  },
}
</script>
<style lang='less'>
    .news{
        padding:10px 20px;
        display:block;
        .news-item{
            padding:10px 0;
            border-bottom:1px solid #ccc;
            .news-title{
                font-size:16px;
                display:inline-block;
            }
            .news-img{
                width:100%;
                margin:5px 0;
                height:100px;
            }
            .news-time{
                font-size:14px;
                color:#999;
            }
        }
    }
</style>