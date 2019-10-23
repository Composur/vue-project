// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import './common/style/reset.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import router from './router'
import axios from 'axios'
import util from './common/util.js'
Vue.use(util);

axios.defaults.withCredentials = true
Vue.prototype.$http = axios
// Vue.prototype.$url='47.94.237.28'
// Vue.prototype.$url='localhost'
Vue.config.productionTip = false
Vue.use(ElementUI)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {App}
})
