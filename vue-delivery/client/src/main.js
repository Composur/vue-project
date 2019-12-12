import Vue from 'vue'
import App from './App.vue'
import router from './route'

Vue.config.productionTip = false
new Vue({
  render: h => h(App),
  router,// 引入的时候要写成router:router
}).$mount('#app')
