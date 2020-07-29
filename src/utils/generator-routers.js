import store from '@/store'

/**
 * 获取可访问的路由表
 *
 * @export
 * @param { Array } routes 路由表
 * @returns { Array } accessedRoutes 可访问的路由表
 */
export function generatorDynamicRouter(routes) {
  // console.log(routes);
  return routes.filter((route) => {
    // 判断该路由是否需要验证权限
    if (route.meta && route.meta.permissions) {
      // 验证当前路由是否可访问
      if (authPermission(route.meta.permissions)) {
        // 如果存在子路由则递归生成可访问的子路由
        if (route.children && route.children.length) {
          route.children = generatorDynamicRouter(route.children)
        }
        return route
      }
    } else {
      // 如果存在子路由则递归生成可访问的子路由
      if (route.children && route.children.length) {
        route.children = generatorDynamicRouter(route.children)
      }
      return route
    }
    return false
  })
}

/**
 * 验证是否拥有权限
 *
 * @param { String, Array } permissionCode 权限标识
 * @returns { Boolean } hasPermission 是否拥有权限
 */
export function authPermission(permissionCode) {
  const { permissionUriList } = store.getters

  if (typeof permissionCode === 'string') {
    return permissionUriList.includes(permissionCode)
  }

  if (Array.isArray(permissionCode)) {
    return permissionCode.some(item => permissionUriList.includes(item))
  }

  return false
}

/**
 * 扁平化权限
 *
 * @param { Array } permissionTree 权限树
 * @returns { Array } permissionList 权限列表
 */
export function flatPermission(permissionTree) {
  let permissionList = []
  permissionTree.forEach((item) => {
    permissionList = [
      ...permissionList,
      {
        id: item.id,
        parentId: item.parentId,
        uri: item.uri,
        menuName: item.menuName
      }
    ]
    if (item.children && item.children.length) {
      permissionList = [
        ...permissionList,
        ...flatPermission(item.children)
      ]
    }
  })
  return permissionList
}
