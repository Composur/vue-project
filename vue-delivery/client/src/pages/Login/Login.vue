<template>
  <section class="loginContainer">
    <div class="loginInner">
      <div class="login_header">
        <!-- <h2 class="login_logo">特好吃外卖</h2> -->
        <div class="login_header_title">
          <a href="javascript:;" :class="{on:msgLogin}" @click="changeLoginMode">短信登录</a>
          <a href="javascript:;" :class="{on:!msgLogin}" @click="changeLoginMode">密码登录</a>
        </div>
      </div>
      <div class="login_content">
        <form>
          <!-- 短信登录 -->
          <div :class="{on:msgLogin}">
            <section class="login_message">
              <input type="tel" maxlength="11" placeholder="手机号" v-model="phoneNum">
              <button
                :disabled="!pass"
                class="get_verification"
                :class="{pass:pass}"
                @click.prevent="getCode"
              >{{countdownNum===0?'获取验证码':`已发送（${countdownNum}s）`}}</button>
            </section>
            <section class="login_verification">
              <input type="tel" maxlength="8" class="show" placeholder="验证码" v-model="code">
            </section>
            <section class="login_hint">
              温馨提示：未注册的手机号，登录时将自动注册，且代表已同意
              <a href="javascript:;">《用户服务协议》</a>
            </section>
          </div>
          <!-- 密码登录 -->
          <div :class="{on:!msgLogin}">
            <section>
              <section class="login_message">
                <input type="tel" maxlength="11" placeholder="手机/邮箱/用户名" v-model="username">
              </section>
              <section class="login_verification">
                <input type="text" maxlength="8" placeholder="密码" v-if="passwordShow" v-model="pwd">
                <input type="password" maxlength="8" placeholder="密码" v-else v-model="pwd">
                <div
                  class="switch_button off"
                  :class="{on:passwordShow}"
                  @click.prevent="passwordSwitch"
                >
                  <div class="switch_circle" :class="{right:passwordShow}"></div>
                  <span class="switch_text">...</span>
                </div>
              </section>
              <section class="login_message">
                <input type="text" maxlength="11" placeholder="验证码" v-model="captcha">
                <!-- <img class="get_verification" src="./images/captcha.svg" alt="captcha" @click.prevent="getCode"> -->
                <img class="get_verification" :src="captchaHref" alt="captcha" ref="captcha" @click.prevent="getCode">
              </section>
            </section>
          </div>
          <button class="login_submit" @click.prevent="Login">登录</button>
        </form>
        <a href="javascript:;" class="about_us">关于我们</a>
      </div>
      <a href="javascript:" class="go_back" @click="$router.back()">
        <i class="iconfont iconback"></i>
      </a>
    </div>
    <!-- 提示框 -->
    <Alert v-show="showWaringBorder" :alertText='alertText' @closeTip="closeTip" />
  </section>
</template>
<script>
import { mapActions, mapState ,mapGetters } from 'vuex'
import {GET_LOGIN,GET_CODE, GET_LOGIN_MSG} from '../../store/mutations_types.js'
import config from '../../config'
import Alert from '../../components/AlertTip/AlertTip'

export default {
  data() {
    return {
      msgLogin: false, //true 短信登录 false 密码登录
      phoneNum: "", // 手机号
      countdownNum: 0, //倒计时
      passwordShow: false,
      pwd: "", //密码
      code: "", // 短信验证码
      captcha: "", // 图形验证码
      username: "", // 用户名
      alertText:'',// alert 提示信息
      showWaringBorder:false,// alert 提示信息
      captchaHref:config.captchaHref
    };
  },
  methods: {
    ...mapActions([GET_LOGIN,GET_CODE,GET_LOGIN_MSG]),
    Login() {
      // 短信登录
      const right = this.checkParams()
      if(!right) return 
      if (this.msgLogin) {
        const params = {
          phone:this.phoneNum,
          code:this.code
        };
        this[GET_LOGIN_MSG](params)
      } else {
        // 点击登录后 刷新验证码
        const params = {
          name:this.username,
          pwd:this.pwd,
          captcha:this.captcha
        };
        this[GET_LOGIN](params)
      }
    },
    checkParams() {
      const { msgLogin, phoneNum, code, captcha, pwd, username,} = this;
      let text = "";
      if (msgLogin) {
        if(!phoneNum){
          text = "请输入正确的手机号！";
        } else if (!/^\d{6}$/.test(code)) {
          text = "请输入正确的验证码！";
        }
       
      } else {
        if (!username) {
          text = "请输入用户名！";
        } else if (!pwd) {
          text = "请输入密码！";
        } else if (!captcha) {
          text = "请输入验证码！";
        }
      }
      // let {alertText,showWaringBorder } = this
      if(text){
        this.showTip(text)
        return false
      }else {
        return true
      }
    },
    changeLoginMode() {
      this.msgLogin = !this.msgLogin;
    },
    // 验证码
    getCode() {
      if(this.msgLogin){
        // 倒计时 短信验证码
        if (!this.countdownNum) {
          this.countdownNum = 3;
          this.timer = setInterval(() => {
            this.countdownNum--;
            if (this.countdownNum <= 0) {
              clearInterval(this.timer);
            }
          }, 1000);
        }
        this[GET_CODE]({phone:this.phoneNum})
      }else{
        // 密码登录的-图形验证码
        this.$refs.captcha.src=this.captchaHref+'?t='+new Date()
      }
    },
    passwordSwitch() {
      this.passwordShow = !this.passwordShow;
    },
    closeTip(){
      // this.alertText = text
      this.showWaringBorder = !this.showWaringBorder
    },
    showTip(msg){
      this.showWaringBorder=true
      this.alertText=msg
    }
  },
  watch: {
    // 用户信息
    loginUserInfo(value){
      this.$nextTick(()=>{
         if(value.code){
          this.showTip(value.msg)
          this.getCode()
          return
        }
        // 登录成功后的逻辑
        this.$router.replace('/user')
      })
    },
    msgCode(){
      this.$nextTick(()=>{
        // 短信登录
        // 
      })
    }
  },
  computed: {
    // 手机号码校验
    pass() {
      // return /^[1]([3-9])[0-9]{9}$/.test(this.phoneNum)
      return /^1/.test(this.phoneNum);
    },
    // store 上的用户信息
    ...mapState(['loginUserInfo','msgCode']),
    ...mapGetters(['doLoginUserInfo'])
  },
  components:{
    Alert,
  }
};
</script>
<style lang="stylus">
@import '../../common/stylus/mixins.styl';

.loginContainer {
  width: 100%;
  height: 100%;
  background: #fff;

  .loginInner {
    padding-top: 60px;
    width: 80%;
    margin: 0 auto;

    .login_header {
      .login_logo {
        font-size: 40px;
        font-weight: bold;
        color: #02a774;
        text-align: center;
      }

      .login_header_title {
        padding-top: 40px;
        text-align: center;

        >a {
          color: #333;
          font-size: 14px;
          padding-bottom: 4px;

          &:first-child {
            margin-right: 40px;
          }

          &.on {
            color: #02a774;
            font-weight: 700;
            border-bottom: 2px solid #02a774;
          }
        }
      }
    }

    .login_content {
      >form {
        >div {
          display: none;

          &.on {
            display: block;
          }

          input {
            width: 100%;
            height: 100%;
            padding-left: 10px;
            box-sizing: border-box;
            border: 1px solid #ddd;
            border-radius: 4px;
            outline: 0;
            font: 400 14px Arial;

            &:focus {
              border: 1px solid #02a774;
            }
          }

          .login_message {
            position: relative;
            margin-top: 16px;
            height: 48px;
            font-size: 14px;
            background: #fff;

            .get_verification {
              position: absolute;
              top: 50%;
              right: 10px;
              transform: translateY(-50%);
              border: 0;
              color: #ccc;
              font-size: 14px;
              background: transparent;

              &.pass {
                color: #000;
              }
            }
          }

          .login_verification {
            position: relative;
            margin-top: 16px;
            height: 48px;
            font-size: 14px;
            background: #fff;

            .switch_button {
              font-size: 12px;
              border: 1px solid #ddd;
              border-radius: 8px;
              transition: background-color 0.3s, border-color 0.3s;
              padding: 0 6px;
              width: 30px;
              height: 16px;
              line-height: 16px;
              color: #fff;
              position: absolute;
              top: 50%;
              right: 10px;
              transform: translateY(-50%);

              &.off {
                background: #fff;

                .switch_text {
                  float: right;
                  color: #ddd;
                }
              }

              &.on {
                background: #02a774;
              }

              >.switch_circle {
                position: absolute;
                top: -1px;
                left: -1px;
                width: 16px;
                height: 16px;
                border: 1px solid #ddd;
                border-radius: 50%;
                background: #fff;
                box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
                transition: transform 0.3s;

                &.right {
                  transform: translateX(26px);
                }
              }
            }
          }

          .login_hint {
            margin-top: 12px;
            color: #999;
            font-size: 14px;
            line-height: 20px;

            >a {
              color: #02a774;
            }
          }
        }

        .login_submit {
          display: block;
          width: 100%;
          height: 42px;
          margin-top: 30px;
          border-radius: 4px;
          background: #4cd96f;
          color: #fff;
          text-align: center;
          font-size: 16px;
          line-height: 42px;
          border: 0;
        }
      }

      .about_us {
        display: block;
        font-size: 12px;
        margin-top: 20px;
        text-align: center;
        color: #999;
      }
    }

    .go_back {
      position: absolute;
      top: 5px;
      left: 5px;
      width: 30px;
      height: 30px;

      >.iconfont {
        font-size: 20px;
        color: #999;
      }
    }
  }
}
</style>
