import { asyncRoutes, constantRoutes } from '@/router'
import { generatorDynamicRouter, flatPermission } from '@/utils/generator-routers'

const state = {
  tree: [],
  routes: [],
  addRoutes: []
}

const getters = {
  permissionList(state) {
    return state.tree.length ? flatPermission(state.tree) : []
  },
  permissionUriList(state, getters) {
    return getters.permissionList.map(permission => permission.uri)
  }
}

const mutations = {
  SET_PERMISSION_TREE: (state, tree) => {
    state.tree = tree
  },
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  generateRoutes({ commit }) {
    return new Promise(resolve => {
      const accessedRoutes = generatorDynamicRouter(asyncRoutes)
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
