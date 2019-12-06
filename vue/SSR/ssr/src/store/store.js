// store.js
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// 假定我们有一个可以返回 Promise 的
// 通用 API（请忽略此 API 具体实现细节）
import axios from 'axios'

const fetchItem = ((id)=>{
  return new Promise((resolve, reject)=>{
    axios({
      method:'get',
      url:'http://interface.sina.cn/dfz/outside/wap/news/list.d.html', // 网上找的免费新闻接口
      data:""
    }).then((response)=>{
      resolve(response)
    })
  })
})

export function createStore () {
  return new Vuex.Store({
    state: {
      items: {}
    },
    actions: {
      FETCH_LISTS ({ commit }) {
        // `store.dispatch()` 会返回 Promise，
        // 以便我们能够知道数据在何时更新
        return fetchItem().then(item => {
          commit('setItem',item)
        })
      }
    },
    mutations: {
      setItem (state, item) {
        Vue.set(state.items,'data', item.data.result.data)
      }
    }
  })
}