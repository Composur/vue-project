<template>
<div  id="header">
 <header :class="{login:isLogin,'no-login':!isLogin}">
        <h1>header</h1>
        <div class='actions'>
            <el-button>登录</el-button>
            <el-button>注册</el-button>
        </div>
   </header>
    <header  :class="{login:!isLogin,'no-login':isLogin}">
       <div class="user">
            <i class="edit el-icon-edit"></i>
         <img src="@/assets/logo.png" alt="avatar">
       </div>
   </header>
</div>
  
</template>

<script>
export default {
  data() {
    return {
      isLogin: false
    };
  },
  methods: {}
};
</script>


<style lang="less">
@import url("../assets/base.less");
#header {
  background: @themeColor;
  padding: 0 12% 30px 12%;
  display: grid;
  justify-content: center;
  position: relative;

  .login {
    display: none;
  }
  .on-login {
    display: none;
  }
  .user {
    position: absolute;
    top: 0;
    right: 10px;
  }
  img {
    width: 40px;
    height: auto;
  }
}
</style>


