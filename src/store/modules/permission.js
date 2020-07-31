import { asyncRoutes, constantRoutes } from '@/router'
import { generatorDynamicRouter, flatPermission } from '@/utils/generator-routers'

export default {
  state: {
    tree: [],
    routes: [],
    addRoutes: []
  },

  getters: {
    permissionList(state) {
      return state.tree.length ? flatPermission(state.tree) : []
    },
    permissionUriList(state, getters) {
      return getters.permissionList.map(permission => permission.uri)
    }
  },

  mutations: {
    SET_PERMISSION_TREE: (state, tree) => {
      state.tree = tree
    },
    SET_ROUTES: (state, routes) => {
      state.addRoutes = routes
      state.routes = constantRoutes.concat(routes)
    }
  },

  actions: {
    generateRoutes({ commit }) {
      return new Promise(resolve => {
        const accessedRoutes = generatorDynamicRouter(asyncRoutes)
        commit('SET_ROUTES', accessedRoutes)
        resolve(accessedRoutes)
      })
    }
  }

}
