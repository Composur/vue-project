<template>
  <div class="index">

    <div class="header">
      <div class="navbar clearfix">
        <div class="navbar-header">
          <a class="navbar-brand" href="#">{{title}}</a>
        </div>
        <ul class="nav">
          <li v-for="category in categories">
            <router-link :to="{path:'/category', query:{id:category._id}}">{{ category.name }}</router-link>
          </li>
        </ul>
      </div>
    </div>
    <div class="main">
      <div class="mainLeft">
        <router-view id="levelTwo" :user="user"></router-view>
      </div>

      <div class="mainRight">
        <div class="panel" v-show="showRegister">
          <div class="panel-body">
            <div class="form-group">
              <input type="text" class="form-control" placeholder="用户名" v-model="username">
            </div>
            <div class="form-group">
              <input type="password" class="form-control" placeholder="密码" v-model="password">
            </div>
            <div class="form-group">
              <input type="password" class="form-control" placeholder="确认密码" v-model="repassword">
            </div>
          </div>
          <p class="rlBtn" @click="register">注册</p>
          <p>已有账号?去<span @click="toggleRL" class="toggle">登录</span></p>
          <p class="text-danger">{{warningInfo}}</p>
        </div>

        <div class="panel" v-show="showLogin">
          <div class="panel-body">
            <div class="form-group">
              <input type="text" class="form-control" placeholder="用户名" v-model="username">
              
            </div>
            <div class="form-group">
              <input type="password" class="form-control" placeholder="密码" v-model="password" @keyup.enter='login'>
            </div>
          </div>
          <p class="rlBtn" @click="login" >登录</p>
          <p>没有账号?去<span @click="toggleRL" class="toggle">注册</span><span>&nbsp;测试账户:admin/admin</span></p>
          <p class="text-danger">{{ warningInfo }}</p>
        </div>

        <div class="info" v-show="showLogined">
          <div class="title">你好, <span class="text-danger">{{ username }}</span></div>
          <p v-if="isAdmin">您是管理员,可以进入
            <el-button type="text">
              <router-link to="/admin">后台管理</router-link>
            </el-button>
          </p>
          <p v-else>欢迎来到我的博客</p>
          <p class="text-danger" id="logout" @click="logout">退出</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="es6">
  export default {
    name: 'index',
    data() {
      return {
        showRegister: false,
        showLogin: true,
        showLogined: false,
        user: {},
        username: '',
        password: '',
        repassword: '',
        warningInfo: '',
        isAdmin: false,
        categories: [],
        title:'logo'
      }
    },
    created() {
      this.$http.get('http://'+this.$url+':8081').then(response => {
        if (!response.data.code) { // 之前登陆过
          this.showLogin = !this.showLogin;
          this.showLogined = !this.showLogined;
          this.username = response.data.userInfo.username;
          this.isAdmin = response.data.userInfo.isAdmin;
          this.user = response.data.userInfo;
        }
        this.categories = response.data.categories
        // console.log(response);
      }, response => {
        console.log('error:' + response);
      })
    },
    methods: {
      toggleRL() {
        this.showRegister = !this.showRegister;
        this.showLogin = !this.showLogin;
      },
      register() {
        // 简单验证
        if (this.username == '') {
          this.warningInfo = '用户名不能为空';
          return;
        }
        if (this.password == '') {
          this.warningInfo = '密码不能为空';
          return;
        }
        if (this.password != this.repassword) {
          this.warningInfo = '两次输入的密码不一致';
          return;
        }
        this.$http.post('http://'+this.$url+':8081/api/user/register', {
          username: this.username,
          password: this.password,
          repassword: this.repassword
        }).then(response => {
          if (response.data.code != 0) {
            this.warningInfo = response.data.message;
            return;
          } else {
            this.showLogin = !this.showLogin;
            this.showRegister = !this.showRegister;
          }
          ;
        }, response => {
          console.log('error:' + response);
        })
      },
      login() {
        if (this.username == '') {
          this.warningInfo = '用户名不能为空';
          return;
        }
        if (this.password == '') {
          this.warningInfo = '密码不能为空';
          return;
        }
        this.$http.post('http://'+this.$url+':8081/api/user/login', {
          username: this.username,
          password: this.password,
        }).then(response => {
          if (response.data.code != 0) {
            this.warningInfo = response.data.message;
            return;
          } else {
            this.showLogin = !this.showLogin;
            this.isAdmin = response.data.userInfo.isAdmin;
            this.showLogined = !this.showLogined;
            this.username = response.data.userInfo.username;
            this.user = response.data.userInfo;
          }
          ;
        }, response => {
          console.log('error:' + response);
        })
      },
      logout() {
        this.$http.get('http://'+this.$url+':8081/api/user/logout').then(response => {
          this.showLogin = !this.showLogin;
          this.showLogined = !this.showLogined;
          this.user = {};
        }, response => {
          console.log(response);
        })
      },
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
.text-danger{
  color:#ff4949;
}
.index
  .header
    position fixed;
    top:0;
    width:100%;
    box-sizing:border-box;
    height:90px;
    padding:25px 150px;
    background-color:#fff;
    // background-color #D6F2FE;
    border-color: #ccc;
    box-shadow:0 1px 2px rgba(151,151,151,0.58);
    z-index 1;
    min-width 900px;
    .navbar
      height:40px;
      line-height:40px;
      .navbar-header
        float:left;
        .navbar-brand
          font-size:20px;
          color: #2c3e50;
          font-weight:500;
      .nav
        float:right;
        margin-right:100px;
        &>li
          display:inline-block;
          line-height:40px;
          margin-right:20px;
          &>a
            padding:10px;
            color: #34495e;
          &>a:hover
            border-bottom: 3px solid #42b983;
  .main
    display:flex;
    padding:20px;
    // border:1px solid red;
    margin-top :90px;
    background-image url('../../../static/bg02.jpg');
    background-color #D6F2FE;
    .mainLeft
      flex:2
      padding-left:75px;
      #levelTwo
        position: relative;
        min-height:88vh;
    .mainRight
      flex:1;
      .panel
        width:300px;
        font-size:14px;
        margin-left:50px;
        .panel-body
          border: 1px solid #d5d5d5;
          border-bottom: none;
          border-radius: 3px;
          margin-bottom:10px;
          .form-group
            height:50px;
            line-height:50px;
            background-color:#fff;
            border-bottom: 1px solid #d5d5d5;
            overflow: hidden;
            .form-control
              width: 100%;
              box-sizing: border-box;
              padding:10px;
              &:focus
                outline: none;
        .rlBtn
          height:40px;
          line-height:40px;
          text-align:center;
          background: #42b983;
          border-radius: 3px;
          font-size:20px;
          color: #fff;
          margin-bottom:10px;
          cursor:pointer;
        .toggle
          color:#0f88eb;
          cursor:pointer;
      .info
        width:300px;
        font-size:14px;
        margin-left:50px;
        line-height:20px;
        padding:20px;
        background-color:#fff;
        border: 1px solid #d5d5d5;
        #logout
          cursor:pointer;
</style>
