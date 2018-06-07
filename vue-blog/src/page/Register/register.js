import {mapActions} from 'vuex'
export default {
  name: 'test',
  data () {
    return {
        username:'',
        password:''
    }
  },
  methods: {
    ...mapActions(['register']),
    onRegister() {
      console.log('reRegister')
      this.register({username:this.username,password:this.password})
    }
  }
}
