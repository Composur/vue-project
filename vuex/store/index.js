import vue from 'vue'
import vuex from 'vuex'
vue.use(vuex)
export default new vuex.Store({
    state:{
        todos:[
            { id: 1, text: '...', done: true },
            { id: 2, text: '...', done: false }
        ],
    },
    getters: {
        doneTodos:state=>{
            return state.todos.filter((todo)=>{
                todo.done
            }).length
        }   
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
