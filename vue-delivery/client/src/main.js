import Vue from 'vue'
import App from './App.vue'
import router from './route'
import store from './store'
import VueLazyload from 'vue-lazyload'
import { InfiniteScroll } from 'mint-ui';

import loading from './common/imgs/loading.gif'

// 屏幕适配
// import './assets/js/flexible'

// 加载模拟数据
import './mock/mockServer.js'

// import './common/JsBridge' 不需要引入

import {Button} from 'mint-ui'
import scrollView from '@components/scrollView'
// 注册成全局的组件
Vue.component(Button.name,Button)
Vue.component('scroll-view',scrollView)
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: loading,
  loading: loading,
  attempt: 1
})
Vue.config.productionTip = false
Vue.use(InfiniteScroll);
new Vue({
  render: h => h(App),
  router,// 引入的时候要写成router:router
  store
}).$mount('#app')
