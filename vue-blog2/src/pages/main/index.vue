<template>
  <div class="index">

    <div class="header">
      <div class="navbar clearfix">
        <div class="navbar-header">
          <a class="navbar-brand" href="/">
            <span class="logo-world">{{title}}</span>
          </a>
        </div>
        <ul class="nav">
          <li v-for="(category,index) in categories" v-on:click.stop="navIndex(index,$event)" 
            v-bind:class="{ active:index==current}"
          >
            <router-link :to="{path:'/category', query:{id:category._id}}"
            >{{ category.name }}</router-link>
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
              <input type="password" class="form-control" placeholder="确认密码" v-model="repassword" @keyup.enter="register">
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
          <p>没有账号?去<span @click="toggleRL" class="toggle">注册</span>
          <span>&nbsp;测试账户:admin/admin</span>
          </p>
          <p class="text-danger">{{ warningInfo }}</p>
        </div>

        <transition name="fade">
         <div class="info" v-show="showLogined">
          <div class="title">你好<span class="text-danger" v-if="username">{{username }}</span></div>
          <p v-if="isAdmin">您是管理员,可以进入
            <el-button type="text">
              <router-link to="/admin">后台管理</router-link>
            </el-button>
          </p>
          <p v-else>
            <p>本博客为学习vue而使用</p>
            <p> <a type="success" href="https://github.com/Composur/vue-project/tree/master/vue-blog2" target="_blank">点击获取前端(vue)+后台(node)源码</a></p>
          </p>
          <p class="text-danger" id="logout" @click="logout" v-if="username">退出</p>
          <el-button type="primary" size="mini" class="more" id="logout" @click="logout" v-if="!username">点击登录</el-button>
        </div>
        </transition>
      </div>
    </div>
    <div class="footer">
     <div> <p>© 2019-2022 by 🍎 </p></div>
      <p><a href="http://beian.miit.gov.cn/" target="_blank">粤ICP备19121998号</a></p>
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
        title:'😍',
        current:0
      }
    },
    created() {
      this.$http.get('/admin/category').then(response => {
        if (!response.data.code) { // 之前登陆过
          this.showLogin = !this.showLogin;
          this.showLogined = !this.showLogined;
          if(response.data.userInfo){
          this.username = response.data.userInfo.username;
          this.isAdmin = response.data.userInfo.isAdmin;
          this.user = response.data.userInfo;
          }
        }
         this.categories = response.data.categories
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
        this.$http.post('/api/user/register', {
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
        this.$http.post('/api/user/login', {
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
        }, response => {
          console.log('error:' + response);
        })
      },
      logout() {
        this.$http.get('/api/user/logout').then(response => {
          this.showLogin = !this.showLogin;
          this.showLogined = !this.showLogined;
          this.user = {};
        }, response => {
          console.log(response);
        })
      },
      navIndex(index,e){
        this.current=index
      }
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
          line-height :1.2;
          // border:1px solid red;
          background-color #D6F2FE
          display:inline-block;
          width :60px;
          height :60px;
          border-radius :50%;
          font-size:20px;
          color: #2c3e50;
          font-weight:500;
          position relative;
          .logo-world
            position absolute;
            top: 15px;
            left: 15px;
            // border :1px solid red;   
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
        .active
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
      .fade-enter-active, .fade-leave-active 
        transition: opacity .5s;
      .fade-enter, .fade-leave-to
        opacity: 0;
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
        p
         margin-top 2px; 
        .more
          margin-top  2px;
          background #42b983;


.footer
  text-align: center;
  padding :10px;
  background-color :#fff;
</style>
