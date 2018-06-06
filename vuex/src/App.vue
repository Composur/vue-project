<template>
  <div id="app">
  <div>
    {{count}}
  </div>
  <button v-on:click="increment()">add</button>
  <button v-on:click="decrement()">subtract</button>
  </div>
</template>

<script>

// import store from '../store/index.js'
import {mapState} from 'vuex'
export default {
// 创建一个vuex
...mapState([]),
  computed:{
    count() {
      return this.store.state.count
    }
  },
  methods:{
     increment() {
       this.store.commit('increment')
    },
    decrement() {
       this.store.commit('decrement')
    },
  }
}

</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
