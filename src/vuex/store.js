import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
// 需要维护的状态
// 初始化 state
const state = {
  home: true,
  my: false,
  data: ''
}
// 初始化 mutations
const mutations = {
  IN_HOME(state) {
    state.home = true
    state.my = false
  },
  IN_MY(state) {
    state.home = false
    state.my = true
  },
  IN_OTHER(state) {
    state.home = false
    state.my = false
  }
}
// 初始化 actions
const actions = {
  inHome({commit}) {
    commit('IN_HOME')
  },
  inMy({commit}) {
    commit('IN_MY')
  },
  inOther({commit}) {
    commit('IN_OTHER')
  }
}
export default new Vuex.Store({
  state,
mutations,actions})
