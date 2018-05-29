import request from '../../helper/req'
window.request=request;
export default {
  name : 'test',
  data() {
    return {msg: 'index!'}
  },
  methods : {
    open() {
      this.$message({showClose: true, message: '错了哦，这是一条错误消息', type: 'error'});
    },
    open1() {
      request('/auth/register','post',{
        username:'xiaoqi',
        password:'xiaoqi0505'
      }).then(data=>{console.log(data)})
      // request('/blog').then(data=>{console.log(data)})
    },
  }
}
