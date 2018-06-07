import Vue from 'vue'
import Vuex from 'vuex'
import auth from './module/auth'
import blog from './module/blog'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        auth,
        blog
    }
})