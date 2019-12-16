<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2 @click="hanlde">News List</h2>
    <ul>
      <li v-for="(item,index) in list.data.list " :key ="index">
        <a
          :href="item.URL"
          target="_blank"
        >
          {{item.title}}
        </a>
      </li>
    </ul>
    
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js SSR'
    }
  },
  asyncData ({ store, route }) {
    // 触发 action 后，会返回 Promise
     return store.dispatch('FETCH_LISTS')
  },
  methods: {
    hanlde(){
      console.log('客户端挂载完毕!')
    }
  },
  computed: {
    // 从 store 的 state 对象中的获取 item。
    list () {
      return this.$store.state.items
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
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
