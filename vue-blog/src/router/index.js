import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/page/Login/login.vue'
import Register from '@/page/Register/register.vue'
import Index from '@/page/Index/index.vue'
import Edit from '@/page/Edit/edit.vue'
import Detail from '@/page/Detail/detail.vue'
import Create from '@/page/Create/create.vue'
import User from '@/page/User/user.vue'

Vue.use(Router)

export default new Router({
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
      path: '/edit',
      name: 'Edit',
      component: Edit
    },
    {
      path: '/detail',
      name: 'Detail',
      component: Detail
    },
    {
      path: '/user',
      name: 'User',
      component: User
    },
    {
      path: '/create',
      name: 'Create',
      component: Create
    }
  ]
})
