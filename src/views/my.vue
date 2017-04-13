//my.vue
<template>
    <div>
        my
    </div>
</template>
<script>
export default {
  name: 'my',
  components:{
    
  },
  created(){
    //用vuex设置状态，改变class;
     this.$store.commit('mutationMy')
  }
}
</script>
<style lang='less'>

</style>