import router from './router'
import store from './store'
import { message } from 'ant-design-vue'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
// import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/user/login'] // no redirect whitelist

router.beforeEach(async(to, from, next) => {
  NProgress.start()
  const hasToken = getToken()
  if (hasToken) {
    if (to.path === '/user') {
      next({ path: '/' })
      NProgress.done()
    } else {
      const hasRoles = store.state.permission.routes.length
      if (hasRoles) {
        next()
      } else {
        try {
          store.dispatch('user/getRole').then(() => {
            store.dispatch('permission/generateRoutes').then(accessedRoutes => {
              router.addRoutes(accessedRoutes)
              next({ ...to, replace: true })
            })
          })
        } catch (error) {
          await store.dispatch('user/resetToken')
          message.error(error || 'Has Error')
          next(`/user`)
          NProgress.done()
        }
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next(`/user`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
