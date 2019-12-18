// 基于 state 的 getter 计算属性的对象
export default {
  doLoginUserInfo:state =>{
    return state.loginUserInfo.data || {}
  }
}