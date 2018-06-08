import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/page/Login/login.vue'
import Register from '@/page/Register/register.vue'
import Index from '@/page/Index/index.vue'
import Edit from '@/page/Edit/edit.vue'
import Detail from '@/page/Detail/detail.vue'
import Create from '@/page/Create/create.vue'
import User from '@/page/User/user.vue'

import store from '@/store/index'
 window.store=store
 let {isLogin}=store.dispatch('checkLogin').then(result=>console.log(result))
 console.log(isLogin)

Vue.use(Router)

const router=new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/login',
      name: 'HelloWorld',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/edit/:blogId',
      name: 'Edit',
      component: Edit,
      meta:{requiresAuth:true}
    },
    {
      path: '/detail/:blogId',
      name: 'Detail',
      component: Detail
    },
    {
      path: '/user/:userId',
      name: 'User',
      component: User,
      meta:{requiresAuth:true}
    },
    {
      path: '/create',
      name: 'Create',
      component: Create,
      meta:{requiresAuth:true}
    }
  ]
})
// 路由守卫
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (true) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next() // 确保一定要调用 next()
  }
});
export default router

// 实现懒加载
// const lazyRouter= new Router({
//   routes:[
//     {
//       path:'/',
//       component:()=> import('@/src/page/user.vue')
//     },
//     {
//       path:'/',
//       component:()=> import('@/src/edit/edit.vue')
//     }
//   ]
// })