import * as Type from '../mutations_types'
import {reqFoodList,reqShopList,reqLogin,reqCode,reqLoginMsg,reqUserInfo,
  reqFoodLists,reqFoodInfo,reqRatings,
  reqLoginOut} from  '../../api'
const state = {
  loginUserInfo: {},
}
const getters = {
  doLoginUserInfo: state => {
    return state.loginUserInfo.data || {}
  },
}
const actions = {
  //  短信登录
  async [Type.GET_LOGIN_MSG]({
    commit
  }, params) {
    const res = await reqLoginMsg(params)
    commit(Type.GET_LOGIN_MSG, res)
  },
  //  密码登录
  async [Type.GET_LOGIN]({
    commit
  }, params) {
    const res = await reqLogin(params)

    commit(Type.GET_LOGIN, res)
  },
  //  持久登录 获取用户信息
  async [Type.GET_USER_INFO]({
    commit
  }) {
    const res = await reqUserInfo()
    commit(Type.GET_USER_INFO, res)
  },
  //  退出登录
  async [Type.GET_OUT]({
    commit
  }) {
    const res = await reqLoginOut()
    commit(Type.GET_OUT, res)
  },
}
const mutations = {
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
}
export default {
  state,
  getters,
  actions,
  mutations
}