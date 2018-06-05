<template>
<div>
 <header :class="{login:isLogin,'no-login':!isLogin}">
        <div class='actions'>
          <router-link to="/login"><el-button >登录</el-button></router-link>
          <router-link to="/register"><el-button >注册</el-button></router-link>
        </div>
   </header>
    <header  :class="{login:!isLogin,'no-login':isLogin}">
       <div class="actions">
            <i class="edit el-icon-edit"></i>
         <img src="@/assets/logo.png" alt="avatar">
       </div>
   </header>
</div>
  
</template>

<script>


import router from '@/router/index'

import {mapGetters, mapActions} from 'vuex'

export default {
  data() {
    return {
      // isLogin: false
    };
  },

  computed:{
    ...mapGetters(['isLogin','user'])
  },
  // 声明周期 这个时候数据已经完成模板还没有挂载 ajax等 尽早的的得到数据
  created() {
    this.checkLogin()
  },  
  methods: {
    ...mapActions(['checkLogin'])
  }
};
</script>


<style lang="less">
@import url("../assets/base.less");
header{
  display: none;

}
  header.no-login{
    display: block;
    display: flex;
    justify-content: flex-end;
   .actions{
     margin: 60px ;
   }
    img{
       width: 35px;
     }
  }
   header.login{
      display: none;
       .actions{
     margin: 60px ;
   }
     img{
       width: 40px;
     }
  }
</style>


