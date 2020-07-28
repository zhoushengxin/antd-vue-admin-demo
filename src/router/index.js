import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import UserLayout from '@/layouts/UserLayout'
import BasicLayout from '@/layouts/BasicLayout'

import system from './routes/system'
import dashboard from './routes/dashboard'

export const constantRoutes = [
  {
    path: '/user',
    component: UserLayout,
    redirect: '/user/login',
    children: [
      {
        path: '/user/login',
        name: 'login',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/login')
      }
    ]
  },
  {
    path: '/404',
    component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404')
  }
]

export const asyncRoutes = [
  {
    path: '/',
    redirect: '/system/index',
    component: BasicLayout,
    children: [
      system,
      dashboard
    ]
  }

  // 404 page must be placed at the end !!!
  // { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
