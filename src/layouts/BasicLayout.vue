<template>
  <a-layout class="app">
    <app-sider />
    <a-layout class="app-main">
      <app-header :breadcrumbs="breadcrumbs" />
      <a-layout-content class="app-content">
        <transition name="page-transition">
          <router-view />
        </transition>
      </a-layout-content>
      <app-footer />
    </a-layout>
  </a-layout>
</template>

<script>
import AppHeader from './AppHeader.vue'
import AppSider from './AppSider.vue'
import AppFooter from './AppFooter.vue'

export default {
  name: 'BasicLayout',
  components: {
    AppHeader,
    AppSider,
    AppFooter
  },
  data() {
    return {
      mainMenuTitle: '',
      mainMenuSelectedKey: '',
      subMenus: [],
      subMenuOpenKey: '',
      subMenuSelectedKeys: [],
      breadcrumbs: []
    }
  },
  computed: {
    // mainMenus() {
    //   const { routes } = this.$store.getters
    //   const [indexRoute] = routes.filter(route => route.name === 'index')
    //   const menuRoutes = indexRoute && indexRoute.children ? indexRoute.children : []
    //   return menuRoutes.filter(menu => !menu.hidden)
    // },
    // showSubSider() {
    //   return !!this.subMenus.length
    // }
  },
  watch: {
    // $route: {
    //   handler() {
    //     this.handleRouteChange()
    //   },
    //   immediate: true
    // }
  },
  methods: {
    handleRouteChange() {
      const matchedRoute = this.$route.matched
      if (matchedRoute.length > 1) {
        this.mainMenuSelectedKey = matchedRoute[1].path
        this.mainMenuTitle = matchedRoute[1].meta.title
        const [curRoute] = this.mainMenus.filter(menu => menu.path === this.mainMenuSelectedKey)
        const [subMenus] = this.filterMenus([curRoute])
        this.subMenus = subMenus && subMenus.children ? subMenus.children : []
        if (matchedRoute.length > 2) {
          this.subMenuOpenKey = matchedRoute[2].path
        }
        const subMenuSelectedKeys = matchedRoute
          .map(item => item.path)
          .filter(item => !!item)
        this.subMenuSelectedKeys = [...new Set(subMenuSelectedKeys)]
        const menuLevel = this.getMenuLevel(
          this.subMenus,
          matchedRoute,
          this.$route.path
        )
        this.breadcrumbs = this.filterBreadcrumbs(matchedRoute.slice(menuLevel))
      }
    },
    filterMenus(menus) {
      const results = []
      menus.forEach((menu) => {
        const item = { ...menu }
        if (!item.hidden) {
          if (item.children) {
            item.children = this.filterMenus(item.children)
          }
          results.push(item)
        }
      })
      return results
    },
    filterBreadcrumbs(breadcrumbs) {
      const result = []
      const paths = []
      breadcrumbs.forEach((breadcrumb) => {
        if (!paths.includes(breadcrumb.path)) {
          paths.push(breadcrumb.path)
          result.push(breadcrumb)
        }
      })
      return result
    },
    getMenuLevel(subMenus, routes, curPath) {
      let menuLevel = 1
      if (subMenus.length) {
        menuLevel = 2
        const curSubMenu = subMenus.find(menu => menu.path === routes[2].path)
        if (curSubMenu.children && curSubMenu.children.length) {
          menuLevel = 3
        }
      }
      const level = routes.findIndex(route => route.path === curPath)
      return level > menuLevel ? menuLevel : level
    }
  }
}
</script>

<style lang="less" scoped>
.app {
  height: auto;
  overflow-x: hidden;

  &-main {
    min-height: 100vh;

    // .ant-layout-has-sider & {
    //   padding-left: 100px;
    // }

    // .ant-layout-has-sider.has-sider-sub & {
    //   padding-left: 224px;
    // }
  }

  &-content {
    margin: 66px 10px 0;
    z-index: 2;
  }

  &-inner {
    min-height: 400px;
    padding: 16px;
    background-color: #fff;
    overflow: hidden;
  }
}
</style>
