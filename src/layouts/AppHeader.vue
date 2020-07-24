<template>
  <a-layout-header style="background: #fff; padding: 0">
    <a-icon
      class="trigger"
      :type="collapsed ? 'menu-unfold' : 'menu-fold'"
      @click="() => (collapsed = !collapsed)"
    />
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
      collapsed: false
    }
  },
  computed: {
  },
  methods: {
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
.app-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: 100%;
  height: 56px;
  padding: 0 20px;
  line-height: 56px;
  background-color: #fff;
  border-bottom: 1px solid #eee;
  transition: width 0.2s;

  .ant-layout-has-sider & {
    width: calc(100% - 100px);
  }

  .ant-layout-has-sider.has-sider-sub & {
    width: calc(100% - 224px);
  }

  .app-breadcrumb {
    float: left;
    line-height: 56px;
  }

  &-menu {
    float: left;
    margin-right: 20px;
    line-height: 55px;
    border-bottom: none;

    & > .ant-menu-item,
    & > .ant-menu-item-active,
    & > .ant-menu-item:hover {
      top: 0;
      border-bottom: none;
    }
  }

  .app-user {
    float: left;
    cursor: pointer;

    &__avatar {
      margin-top: -0.1em;
    }

    &__name {
      display: inline-block;
      margin: 0 8px;
      line-height: 56px;
    }
  }
}
</style>
