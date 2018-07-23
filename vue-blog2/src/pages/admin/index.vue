<template>
  <div>
    <!-- <div class="admin_header">
     <div class="admin_logo"><img src="../../../static/logo.png" alt="" srcset=""></div>
    </div> -->
    <div class="admin_index">
    <el-menu router class="menu">
      <img src="../../../static/logo.png" alt="" srcset="">
      <el-menu-item index="/admin">管理主页</el-menu-item>
      <el-menu-item index="/admin/user">用户管理</el-menu-item>
      <el-submenu index="3">
        <template slot="title">分类管理</template>
        <el-menu-item index="/admin/category">分类首页</el-menu-item>
        <el-menu-item index="/admin/category/add">新建分类</el-menu-item>
      </el-submenu>
      <el-submenu index="4">
        <template slot="title">文章管理</template>
        <el-menu-item index="/admin/content">文章首页</el-menu-item>
        <el-menu-item index="/admin/content/add">新建文章</el-menu-item>
      </el-submenu>
      <el-submenu index="5">
        <template slot="title">{{ adminName }}</template>
        <el-menu-item index="/">退出</el-menu-item>
      </el-submenu>
     <el-submeun index="6">
       <el-menu-item index="/">回到前台</el-menu-item>
     </el-submeun>
    </el-menu>
    <router-view id="levelTwo"></router-view>
  </div>
  </div>
</template>

<script type="es6">
  export default {
    data() {
      return {
        adminName: '',
      }
    },
    created() {
      this.$http.get('http://'+this.$url+':8081/admin').then(response => {
        if (response.data.code != 0) {
          window.location.href = "http://'+this.$url+':8080"
          return;
        } else {
          this.adminName = response.data.userInfo.username;
          return;
        }
        ;
      }, response => {
        console.log('error:' + response);
      })
    },
  }
</script>

<style lang="stylus">
.admin_header
  background-color #F8F8FD;
  border:1px solid red;
  display flex;
  .admin_logo
    margin: 20px;
    width 80px;;
    border 1px solid black;
    img 
      width 100%;
      height 100%;
.admin_index
  display:flex;
  background-color #F8F8FD;
  .menu
    padding-top :50px;
  .el-menu
    flex 0.2;
    text-align center;
    background-color #E6E3EE;
    img
      width 80px;
  #levelTwo
    position: relative;
    display:flex;
    align-items:center;
    justify-contents:center;
    flex-direction:column;
    padding-top:50px;
    min-height:100vh;
    flex:1;
</style>
