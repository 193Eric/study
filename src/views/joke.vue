//about.vue
<template>
    <div class='joke-content'>
        <div class='joke-title'>内涵笑话</div>
        <div class='content-item' v-for='item in data'>
            {{item.content}}
        </div>
    </div>
</template>
<script>
export default {
  name: 'joke',
  mounted(){
        let that = this;
        this.$http.jsonp(this.apiUrl,{params:{key:this.key}},{emulateJSON:true})
				.then((res) => {
                    console.log(JSON.parse(res.bodyText))
					that.data = JSON.parse(res.bodyText).result;
				}),function(error){
                    
                }     
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
    .joke-content{
            margin: 0;
            padding:40px 0;
            position: relative;
            .joke-title{
                text-align:center;
                 position: fixed;
                 top:0;
                 width:100%;
                color: #dae925;
                font-size: 20px;
                background:#000;
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
