import Vue from 'vue'
import Vuex from 'vuex'

import state from './state'
import mutations from './mutations'
import actions from './action'
import getters from './getter'

// 生命使用
Vue.use(Vuex)

// 配置
const store = new Vuex.Store({
  // 需要管理的状态
  state,
  mutations,
  actions,
  getters
})

export default store