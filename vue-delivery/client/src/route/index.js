import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../pages/Home'
import Order from '../pages/Order'
import User from '../pages/User'
import Search from '../pages/Search'

Vue.use(VueRouter)

const Router = new VueRouter({
  routes:[
    {
      path:'/home',
      component:Home
    },
    {
      path:'/order',
      component:Order
    },
    {
      path:'/user',
      component:User
    },
    {
      path:'/search',
      component:Search
    },
    {
      path:'/',
      component:Home
    },
  ]
})

export default Router