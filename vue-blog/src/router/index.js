import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/page/Login/template.vue'
import Register from '@/page/Register/template.vue'
import Index from '@/page/Index/template.vue'
import Edit from '@/page/Edit/template.vue'
import Detail from '@/page/Detail/template.vue'
import Create from '@/page/Create/template.vue'
import User from '@/page/User/template.vue'

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
