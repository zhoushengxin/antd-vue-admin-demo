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
  },
  watch: {

  },
  methods: {

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
