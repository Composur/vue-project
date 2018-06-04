<template>
  <div id="app">
    <Header class="header"></Header>
    <div class="main">
        <router-view/>
    </div>
    <Footer class="footer"></Footer>
  </div>
</template>

<script>

import Header from './components/Header'
import Footer from './components/Footer'

export default {
  name: 'App',
  components:{
    Header,
    Footer
  }
}
</script>
<style lang="less" scoped>
html,body,#app{height: 100%;}
  #app{
   display: grid;
  grid-template-columns: 12% auto 12%;
  grid-template-rows: auto 1fr auto;
  grid-template-areas: "header header header"
                       ".      main  ."
                       "footer footer footer";
    .header{
      background: url(./assets/bg01.png) no-repeat;
      background-size: cover;
      grid-area: header;
      padding: 0 12% ;
      padding-bottom: 30px;
      border: 1px solid red;
    }
    .main{
      grid-area: main;
      border: 1px solid red;
    }
    .footer{
      grid-area: footer;
      padding: 10px 12%;
      border: 1px solid yellowgreen;
    }
  }
</style>

