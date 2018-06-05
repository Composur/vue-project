import auth from '@/api/auth'

const state = {
    user:null,
    isLogin:false 
}
const getters= {
    user:state=>state.user,
    isLogin:state=>state.isLogin
}
const mutations = {
    setUser(state,payload) {
        state.user=payload.user
    },
    setLogin(state,payload) {
        start.uesr=payload.uesr
    }
}
const actions = {
    login({commit},{username,password}) {
        // promise
      return  auth.login({username,password}).then(()=>{
            commit('setUser',{user:res.data})
            commit('setLogin',{isLogin:true})
        })
    },
   async  register({commit},{username,password}) {
            let res=await auth.register({username,password})
            commit('setLogin',{isLogin:true})

            return res.data
    },


    async logout({commit}) {
        await auth.logout()
        commit('setUser',{user:null})
        commit('setLogin',{isLogin:false})
    },
    async checkLogin({commit,state}) {
        if(state.isLogin) return true
        let res=await auth.getInfo()
        commit('setLogin',{isLogin:res.isLogin})
        if(!state.isLogin) return false
        commit('setUser',{user:res.data})
        return true
    }
}
export default {
    state : {},
    getters : {},
    mutations : {},
    actions : {}
}