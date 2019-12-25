<template>
  <div id="app">
    <router-view/>
    <Footer v-if="$route.meta.show"/>
  </div>
</template>

<script>
import "./assets/css/reset.css";
import Footer from "./components/Footer";

export default {
  name: "app",
  mounted() {
    // this.setupWKWebViewJavascriptBridge();
  },
  methods: {
    // 连接 IOS bridge
    setupWKWebViewJavascriptBridge(callback) {
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
    Footer
  }
};
</script>


<style lang="stylus" rel="stylesheet/stylus">
@import '//at.alicdn.com/t/font_1560118_woiczy2ulrp.css';

#app {
  width: 100%;
  height: 100%;
  background: #f5f5f5;
}
</style>
