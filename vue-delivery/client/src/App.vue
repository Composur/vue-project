<template>
  <div id="app">
    <router-view/>
    <Footer v-if="$route.meta.show"/>
  </div>
</template>

<script>
import "./assets/css/reset.css";
import Loading from './components/loading.vue'
import Footer from "./components/Footer";

export default {
  name: "app",
  mounted() {
    // this.setupWKWebViewJavascriptBridge();
  },
  methods: {
    // 连接 IOS bridge
    setupWKWebViewJavascriptBridge(callback) {
      // WebViewJavascriptBridge 由原生容器提供
      if (window.WebViewJavascriptBridge) {
        // window.WebViewJavascriptBridge.callHandler(
        //   'submitFromWeb',
        //   {'param':'123'},
        //   function(responseData){
        //       //这里打印的应该是上面Handler实现方法中的callback的入参：submitFrom web exe, response data from java
        //       document.getElementById("show").innerHTML = "response data from java, data = "+responseData
        //   }
        // )
      }
    },
  },
  components: {
    Footer,
    Loading
  }
};
</script>


<style lang="stylus" rel="stylesheet/stylus">
@import url('https://at.alicdn.com/t/font_1560118_hz9jmby1xcc.css');
@include font-dpr(16px);
#app {
  width: 100%;
  height: 100%;
  background: #f5f5f5;
}
</style>
