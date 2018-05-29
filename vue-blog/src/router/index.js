import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/page/Login/template.vue'
import Register from '@/page/Register/template.vue'
import Index from '@/page/Index/template.vue'
import Edit from '@/page/Edit/template.vue'
import Detail from '@/page/Detail/template.vue'
import Create from '@/page/Create/template.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: Login
    },
    {
      path: '/login',
      name: 'HelloWorld',
      component: Login
    },
    {
      path: '/register',
      name: 'test',
      component: Register
    },
    {
      path: '/index',
      name: 'test',
      component: Index
    },
    {
      path: '/edit',
      name: 'test',
      component: Edit
    },
    {
      path: '/detail',
      name: 'test',
      component: Detail
    },
    {
      path: '/create',
      name: 'test',
      component: Create
    }
  ]
})
