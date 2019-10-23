<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script type="es6">
export default {
  name: "app",
  data() {
    return {};
  }
};
</script>

<style lang="stylus">
#app {
  background-color: rgba(66, 185, 131, 0.19);
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
}
</style>
