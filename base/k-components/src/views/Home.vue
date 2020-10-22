<template>
  <div>
    <h3>基于element-ui的自定义组件</h3>
    <div>
      <k-submit @submit = "submit" :min="1" :max="10" :num="1"></k-submit>
    </div>
  </div>
</template>

<script>
export default {
  methods:{
    submit(data){
      console.log(data)
    }
  }
};
</script>