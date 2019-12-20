/**
 * 1. mutation 类似于事件
 * 2. mutation 必须是同步函数
 * 3. 必须以相应的 type 调用 store.commit 方法进行调用 mutations
 * @param 事件类型 (type) 和 一个 回调函数 (handler(state,你传入的额外对象))
 */

import * as Type from './mutations_types.js'

// store 中存储的数据

export default {
  // 我们可以使用 ES2015 风格的 计算属性 命名功能来使用一个常量作为函数名
  [Type.GET_ADDRESS](state, address) {
    state.address = address 
  },
  [Type.GET_SHOPS](state, payload) {
    state.shops = payload
  },
  [Type.GET_SHOP_LIST](state, payload) {
    state.shopList = payload
  },
  [Type.GET_LOGIN_MSG](state, payload) {
    state.loginUserInfo = payload
  },
  [Type.GET_LOGIN](state, payload) {
    state.loginUserInfo = payload
  },
  [Type.GET_CODE](state, payload) {
    state.msgCcode = payload
  },
  [Type.GET_USER_INFO](state, payload) {
    state.loginUserInfo = payload
  },
  [Type.GET_OUT](state, payload) {
    state.loginUserInfo = payload
  },
  [Type.GET_FOOD_INFO](state, payload) {
    state.foodInfo = payload
  },
  [Type.GET_RATINGS](state, payload) {
    state.foodRatings = payload
  },
  [Type.GET_FOOD_LISTS](state, payload) {
    state.foodLists = payload
  },
}