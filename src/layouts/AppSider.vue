<template>
  <a-layout-sider v-model="collapsed" :trigger="null" collapsible width="256px">

    <div class="logo">
      <router-link to="/">
        <img src="../assets/logo.png" alt="">
        <h1 v-if="!collapsed">Ant Design Pro</h1>
      </router-link>
    </div>

    <div>
      <a-menu
        mode="inline"
        theme="dark"
        :inline-collapsed="collapsed"
        :selected-keys="[mainMenuSelectedKey]"
        @click="handleClick"
      >
        <template v-for="item in mainMenu">
          <a-menu-item v-if="!item.children" :key="item.path">
            <a-icon type="pie-chart" />
            <span>{{ item.meta.title }}</span>
          </a-menu-item>
          <sub-menu v-else :key="item.path" :menu-info="item" />
        </template>
      </a-menu>
    </div>
  </a-layout-sider>
</template>

<script>

import { mapState } from 'vuex'
import SubMenu from './SubMenu'

export default {
  name: 'AppSider',
  components: {
    SubMenu
  },
  data() {
    return {
    }
  },
  computed: {
    ...mapState({
      // 动态主路由
      mainMenu: state => state.permission.addRoutes[0].children
    }),
    mainMenuSelectedKey() {
      return this.$route.path
    },
    collapsed() {
      return this.$store.state.app.sidebar.opened
    }
  },
  watch: {
    $route: function() {
      this.updateMenu()
    }
  },
  created() {
    // this.mainMenuSelectedKey = this.$route.path
  },
  methods: {
    handleClick({ key }) {
      this.$router.push(key)
    }
  }
}
</script>

<style lang="less" scoped>
#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

.logo{

  transition: all 0.5s;
  height: 64px;
    display: flex;
    align-items: center;
    justify-content: center;
  .router-link-active{
    display: flex;
    align-items: center;
    justify-content: center;
    img{
      width: 32px;
      height: 32px;
    }
    h1{
      color: #fff;
      font-size: 16px;
      margin: 0 0 0 12px;
      font-weight: 400;
    }
  }

}

</style>
