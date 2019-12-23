import Vue from 'vue'
import App from './App.vue'
import router from './route'
import store from './store'

// 加载模拟数据
import './mock/mockServer.js'
// ali iconFont

import {Button} from 'mint-ui'
// 注册成全局的组件
Vue.component(Button.name,Button)

Vue.config.productionTip = false
new Vue({
  render: h => h(App),
  router,// 引入的时候要写成router:router
  store
}).$mount('#app')
