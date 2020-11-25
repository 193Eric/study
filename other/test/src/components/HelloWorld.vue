<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <button @click="msg = 'click msg'">button</button>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data(){
    return {
      msg:'new message'
    }
  },
  created(){

  },
  mounted(){
    this.msg = 'msg mounted'
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
