<template>
  <div id="app">
    <router-view/>
    <Footer v-if="$route.meta.show"/>
  </div>
</template>

<script>
import './assets/css/reset.css'
import Footer from './components/Footer'

export default {
  name: 'app',
  components: {
    Footer
  }
}
</script>


<style lang="stylus" rel="stylesheet/stylus">
@import "//at.alicdn.com/t/font_1560118_9751atjyzg7.css"
  #app
    width 100%
    height 100%
    background #f5f5f5
</style>
