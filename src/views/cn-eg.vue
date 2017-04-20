//about.vue
<template>
    <div class='content'>
        <div class='title'>
            英汉互译
        </div>
        <div class='controller'>
            <input class='input-text' type='text' placeholder='输入英文/汉字' v-model='text'>
            <div class='button' @click='goApi()'>立即翻译</div>
            <div class='show-content'>
                <div v-for='item in content'>
                    {{item}}<br>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  name: 'eg',
  mounted(){
           
  },
  data () {
    return {
       apiUrl:"http://route.showapi.com/32-9",
       showapi_sign:"1688d17e4c41492daaef9e12d36dcd0d",
       showapi_appid:"35517",
       data:'',
       text:'',
       content:''
    }
  },
  created(){
    //用vuex设置状态，改变class;
    this.$store.dispatch("inOther");
  },
  methods:{
      goApi(){
        let that = this;
        this.$http.post(this.apiUrl,{showapi_appid:this.showapi_appid,showapi_sign:this.showapi_sign,q:this.text},{emulateJSON:true})
				.then((res) => {
                    that.content = res.body.showapi_res_body.basic.explains
				}),function(error){
                    
                } 
      }
  }
}
</script>
<style lang='less'>
    .input-text{
        -moz-appearance: none;
        appearance: none;
        background-color: #fff;
        background-image: none;
        border-radius: 4px;
        border: 1px solid #bfcbd9;
        box-sizing: border-box;
        color: #1f2d3d;
        display: block;
        font-size: 12px;
        height: 26px;
        line-height: 1;
        outline: none;
        padding: 3px 10px;
        transition: border-color .2s cubic-bezier(.645,.045,.355,1);
        width: 80%;
        margin:20px auto;
    }
    .controller{
        text-align:center;
    }
    .button{
        display:inline-block;
        line-height: 1;
        white-space: nowrap;
        cursor: pointer;
        background: #fff;
        border: 1px solid #bfcbd9;
        color: #1f2d3d;
        -webkit-appearance: none;
        color: #fff;
        background-color: #20a0ff;
        border-color: #20a0ff;
        text-align: center;
        box-sizing: border-box;
        outline: none;
        margin: 0 auto;
        -moz-user-select: none;
        -webkit-user-select: none;
        -ms-user-select: none;
        padding: 5px 15px;
        font-size: 12px;
        border-radius: 4px;
    }
    .show-content{
        margin:20px;
        color:#FF4949;
        font-size:12px;
    }
</style>
