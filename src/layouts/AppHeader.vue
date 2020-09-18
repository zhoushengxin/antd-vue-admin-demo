<template>
  <a-layout-header class="app-header">
    <a-icon
      class="trigger"
      :type="collapsed ? 'menu-unfold' : 'menu-fold'"
      @click="toggleSideBar"
    />

    <div class="breadcrumb">
      <a-breadcrumb>
        <a-breadcrumb-item v-for="(item, index) in breadList" :key="item.name">
          <router-link
            v-if="item.name != name && index != 1"
            :to="{ path: item.path === '' ? '/' : item.path }"
          >{{ item.meta.title }}</router-link>
          <span v-else>{{ item.meta.title }}</span>
        </a-breadcrumb-item>
      </a-breadcrumb>
    </div>

    <div class="right-menu">
      <a-dropdown placement="bottomRight">
        <span>
          <a-avatar size="small" src="https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png" />
          <span class="nick-name">admin</span>
        </span>
        <template v-slot:overlay>
          <a-menu class="ant-pro-drop-down menu" :selected-keys="[]">
            <a-menu-item key="center">
              <a-icon type="user" />
              个人中心
            </a-menu-item>
            <a-menu-item key="settings">
              <a-icon type="setting" />
              个人设置
            </a-menu-item>
            <a-menu-divider />
            <a-menu-item key="logout">
              <a-icon type="logout" />
              退出登录
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </div>

  </a-layout-header>
</template>

<script>

import { mapState } from 'vuex'

export default {
  name: 'AppHeader',
  props: {
    breadcrumbs: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      basePath: '/components/breadcrumb',
      name: '',
      breadList: []
    }
  },
  computed: {
    collapsed() {
      return this.$store.state.app.sidebar.opened
    },
    ...mapState({
      // 动态主路由
      mainMenu: state => state.permission.addRoutes[0].children
    })
  },
  watch: {
    $route() {
      this.getBreadcrumb()
    }
  },
  created() {
    this.getBreadcrumb()
  },
  methods: {
    getBreadcrumb() {
      this.breadList = []
      this.name = this.$route.name
      console.log(this.$route)
      this.$route.matched.forEach(item => {
        if (item.path) {
          this.breadList.push(item)
        }
      })
    },
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    handleMenu({ key }) {
      if (key === '/logout') {
        this.logout()
        return
      }
      this.$router.push(key)
    },
    logout() {
      this.$store
        .dispatch('logout')
        .then(() => {
          this.$message.success('退出成功')
          window.location.replace('/account/login')
        })
        .catch((err) => {
          this.$message.error(err.message)
        })
    }
  }
}
</script>

<style lang="less" scoped>

.app-header{
  background-color: #fff;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.breadcrumb{
  flex: 1;
  // text-align: left;
}

.trigger{
  // height: 50px;
  width: 30px;
  // line-height: 50px;
}

.right-menu{
  float: right;
  height: 100%;
  .nick-name{
    margin-left: 10px;
  }
}
</style>
