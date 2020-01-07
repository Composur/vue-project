import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = ()=> import('../pages/Home')

const User = ()=> import('../pages/User')

import Order from '../pages/Order'
import Search from '../pages/Search'

const Login = ()=> import( '../pages/Login/Login.vue')

const Detail = ()=> import( '@pages/Detail')
const Appraise = ()=> import( '@pages/Detail/Appraise')
const Business = ()=> import( '@pages/Detail/Business')
const OrderFood = ()=> import( '@pages/Detail/OrderFood')

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
      path:'/detail',
      component:Detail,
      children:[
        {
          path:'/',
          redirect:'orderFood'
        },
        {
          path:'orderFood',
          component:OrderFood,
        },
        {
          path:'appraise',
          component:Appraise,
        },
        {
          path:'business',
          component:Business,
        },
      ]
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