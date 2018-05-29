import request from '../../helper/req'
import auth from '../../api/auth'

// window.request=request; 为了方便控制台调用
export default {
  name : 'test',
  data() {
    return {msg: 'index!'}
  },
  methods : {
    open() {
      this.$message({showClose: true, message: '错了哦，这是一条错误消息', type: 'error'});
    },
    open2() {
      auth.register({username:'hahaha',password:'123456'})
    },
    open3() {
      auth.login({username:'hahaha',password:'123456'})
    },
    open4() {
      auth.logInfo()
    },
    open5() {
      auth.logout()
    },
  }
}
