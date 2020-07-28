import { asyncRoutes, constantRoutes } from '@/router'
import { } from '@/utils/generator-routers'
// import { getName } from '@/utils/auth'

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = []
  routes.forEach(route => {
    roles.forEach(role => {
      if (role.uri === route.path) {
        if (route.children.length === role.subMenus.length) {
          res.push(route)
        } else {
          const child = []
          if (route.children) {
            route.children.forEach(ele => {
              role.subMenus.forEach(nele => {
                if (nele.uri === ele.path) {
                  child.push(ele)
                }
              })
            })
          }
          route.children = child
          res.push(route)
        }
      }
    })
  })

  // const finaRouters = routes
  // finaRouters[0].children = res
  // console.log(finaRouters)
  res.push({
    path: '*',
    redirect: '/exception/404'
  })
  return res
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  generateRoutes({ commit }, roles) {
    return new Promise(resolve => {
      const accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
