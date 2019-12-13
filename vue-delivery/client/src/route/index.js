import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../pages/Home'
import Order from '../pages/Order'
import User from '../pages/User'
import Search from '../pages/Search'
import Login from '../pages/Login/Login.vue'






Vue.use(VueRouter)


const Router = new VueRouter({
  routes:[
    {
      path:'/home',
      component:Home,
      meta:{
        show:true
      }
    },
    {
      path:'/order',
      component:Order,
      meta:{
        show:true
      }
    },
    {
      path:'/user',
      component:User,
      meta:{
        show:true
      }
    },
    {
      path:'/search',
      component:Search,
      meta:{
        show:true
      }
    },
    {
      path:'/login',
      component:Login
    },
    {
      path:'/',
      component:Home,
      meta:{
        show:true
      }
    },
  ]
})

Router.beforeEach((to,from,next)=>{
  next()
})

export default Router