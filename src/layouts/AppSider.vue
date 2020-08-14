<template>
  <a-layout-sider v-model="collapsed" :trigger="null" collapsible>

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

</style>
