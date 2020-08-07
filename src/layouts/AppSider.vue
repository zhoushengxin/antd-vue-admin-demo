<template>
  <a-layout-sider v-model="collapsed" :trigger="null" collapsible>

    <div>
      <a-menu
        :default-selected-keys="['1']"
        :default-open-keys="['2']"
        mode="inline"
        theme="dark"
        :inline-collapsed="collapsed"
      >
        <template v-for="item in list">
          <a-menu-item v-if="!item.children" :key="item.key">
            <a-icon type="pie-chart" />
            <span>{{ item.title }}</span>
          </a-menu-item>
          <sub-menu v-else :key="item.key" :menu-info="item" />
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
      list: [
        {
          key: '1',
          title: 'Option 1'
        },
        {
          key: '2',
          title: 'Navigation 2',
          children: [
            {
              key: '2.1',
              title: 'Navigation 3',
              children: [{ key: '2.1.1', title: 'Option 2.1.1' }]
            }
          ]
        }
      ],
      subMenuOpenKeys: [],
      collapsed: false
    }
  },
  computed: {
    ...mapState({
      // 动态主路由
      mainMenu: state => state.permission.routes
    })
  },
  created() {
    console.log(this.mainMenu)
  },
  methods: {
    toggleCollapsed() {
      this.collapsed = !this.collapsed
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
