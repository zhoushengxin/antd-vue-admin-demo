<template>
  <a-layout-header class="app-header">
    <a-icon
      class="trigger"
      :type="collapsed ? 'menu-unfold' : 'menu-fold'"
      @click="toggleSideBar"
    />

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
    }
  },
  computed: {
    collapsed() {
      return this.$store.state.app.sidebar.opened
    }
  },
  methods: {
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

.trigger{
  height: 50px;
  width: 30px;
  line-height: 50px;
}

.right-menu{
  float: right;
  height: 100%;
  .nick-name{
    margin-left: 10px;
  }
}
</style>
