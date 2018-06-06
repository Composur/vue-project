import vue from 'vue'
import vuex from 'vuex'
vue.use(vuex)
export default new vuex.Store({
    state:{
        count:0
    },
    mutations:{
        increment() {
            this.state.count++
        },
        decrement() {
            this.state.count--
        }
    }
})