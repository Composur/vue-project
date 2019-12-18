<template>
  <div id="app">
    <router-view/>
    <Footer v-if="$route.meta.show"/>
  </div>
</template>

<script>
import './assets/css/reset.css'
import Footer from './components/Footer'

import {mapActions} from 'vuex'
import {GET_USER_INFO} from './store/mutations_types.js'

export default {
  name: 'app',
  mounted() {
    // 持久登录
    this[GET_USER_INFO]()
  },
  methods: {
    ...mapActions([GET_USER_INFO])
  },
  components: {
    Footer
  }
}
</script>


<style lang="stylus" rel="stylesheet/stylus">
  #app
    width 100%
    height 100%
    background #f5f5f5
</style>
