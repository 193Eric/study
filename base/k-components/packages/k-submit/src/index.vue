<template>
  <div class="submit">
    <el-input-number class="submit-number" v-model="num" :min="min" :max="max" label="描述文字"></el-input-number>
    <el-button class="submit-btn" @click="hanldeSubmit">提交</el-button>
  </div>
</template>

<script>
import { InputNumber, Button} from 'element-ui'
import Vue from 'vue'
Vue.use(InputNumber)
Vue.use(Button)

export default {
  name:"KSubmit",
  data() {
    return {
      
    };
  },
  props:['min','max','num'],
  methods: {
    hanldeSubmit(){
      this.$emit('submit',{current:this.num})
    }
  }
};
</script>

<style scoped>
.submit{
  width: 300px;
  border: 1px solid #e9e9e9;
  display: inline-block;
  border-radius: 4px;
}
.submit-number{
  float: left;
  width: 150px;
}
.submit-btn{
  float: right;
  width: 100px;
}
</style>