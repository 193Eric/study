//index.vue
<template>
    <div class='title'>每日一笑</div>
</template>

<script>
export default {
  name: 'indexP',
  data () {
    return {
       todos: [
          { text: 'Learn JavaScript' },
          { text: 'Learn Vue' },
          { text: 'Build something awesome' }
        ]
    }
  },
  methods:{
    eClick(){
        console.log(9999);
    }
  }
}
</script>
<style lang='less'>
    .title{
        color: #dae925;
        font-size: 40px;
        text-align: center;
        line-height: 120px;
        font-family: cursive;
    }
</style>
