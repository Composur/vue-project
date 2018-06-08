import {mapActions} from 'vuex'

export default {
  data () {
    return {
      username: '',
      password:''
    }
  },
  methods:{
    ...mapActions(['login']),
    onLogin() {
      console.log('login')
      this.login({username:this.username,password:this.password}).then(()=>{
        // this.$router.push({path:'/'})
        log(this.$router.query.redirect)
        this.$router.push({path:this.$router.query.redirect || '/'})
      })
      // alert(this.username+this.password)
    }
  }
}
