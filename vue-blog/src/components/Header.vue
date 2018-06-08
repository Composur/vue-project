<template>
<div>
 <header :class="{login:isLogin,'no-login':!isLogin}">
        <div class='actions'>
          <router-link to="/login"><el-button >登录</el-button></router-link>
          <router-link to="/register"><el-button >注册</el-button></router-link>
        </div>
   </header>
    <!-- <header  :class="{login:!isLogin,'no-login':isLogin}" > -->
    <header v-if='isLogin' >
       <div class="actions">
            <router-link to="/create"><i class="edit el-icon-edit"></i></router-link>
         <img :src="user.avatar" :alt="user.username">
         <!-- <img src="@/assets/logo.png" alt="user.username"> -->
         <button v-on:click="logout">退出</button>
       </div>
   </header>
</div>  
  
</template>

<script>
import router from "@/router/index";
import auth from '@/api/auth'
window.auth=auth
import { mapGetters, mapActions } from 'vuex'

export default {
  data() {
    return {
      // isLogin: false
    };
  },
  computed: {
    ...mapGetters(['isLogin', 'user'])
  },
  // 声明周期 这个时候数据已经完成模板还没有挂载 ajax等 尽早的的得到数据
  created() {

/*
  1.渲染的时候的优化，
    a.让header默认隐藏
    b.
*/ 

    this.checkLogin().then(isLogin=>{if(isLogin){
        
    }})
  },
   methods: {
    ...mapActions(['checkLogin','logout'])
  }
};
</script>


<style lang="less">
@import url("../assets/base.less");
header {
  // display: none;
  img{width: 30px;}  
}
header.no-login {
  display: block;
  display: flex;
  justify-content: flex-end;
  .actions {
    margin: 60px;
  }
 
}
header.login {
  display: none;
  .actions {
    margin: 60px;
  }
}
</style>


