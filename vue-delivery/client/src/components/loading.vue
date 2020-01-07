<template>
  <div class="mask">
      <mt-spinner  type="fading-circle"  :size="60"></mt-spinner>
  </div>
</template>
<script>
import Vue from 'vue'
import { Spinner } from 'mint-ui';
Vue.component(Spinner.name, Spinner);
export default {
 
}
</script>

<style>
.mask {
  position: absolute;
  z-index: 9999;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
}
.mint-spinner-fading-circle{
  position: absolute;
  margin: auto;
  left: 0;
  bottom: 0;
  top: 0;
  right: 0;
  width:60px;
  height:60px
}
</style>

