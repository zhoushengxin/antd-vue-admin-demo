<template>
  <div class="main">
    <a-form
      id="formLogin"
      ref="formLogin"
      class="user-layout-login"
      :form="form"
      @submit="handleSubmit"
    >
      <a-tabs
        :active-key="customActiveKey"
        :tab-bar-style="{ textAlign: 'center', borderBottom: 'unset' }"
        @change="handleTabClick"
      >
        <a-tab-pane key="tab1" tab="账号密码登录">
          <a-form-item>
            <a-input
              v-decorator="[
                'username',
                {rules: [{ required: true, message: '请输入帐户名' }], validateTrigger: 'change',initialValue:'admin'}
              ]"
              size="large"
              type="text"
              placeholder="账户: admin"
            >
              <a-icon slot="prefix" type="user" :style="{ color: 'rgba(0,0,0,.25)' }" />
            </a-input>
          </a-form-item>

          <a-form-item>
            <a-input
              v-decorator="[
                'password',
                {rules: [{ required: true, message: '请输入密码' }], validateTrigger: 'blur',initialValue:'123456'}
              ]"
              size="large"
              type="password"
              autocomplete="false"
              placeholder="密码: admin or ant.design"
            >
              <a-icon slot="prefix" type="lock" :style="{ color: 'rgba(0,0,0,.25)' }" />
            </a-input>
          </a-form-item>
        </a-tab-pane>
      </a-tabs>

      <a-form-item style="margin-top:24px">
        <a-button
          size="large"
          type="primary"
          html-type="submit"
          class="login-button"
          :loading="loginBtn"
          :disabled="loginBtn"
        >确定</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>

export default {
  data() {
    return {
      customActiveKey: 'tab1',
      loginBtn: false,
      isLoginError: false,
      requiredTwoStepCaptcha: false,
      stepCaptchaVisible: false,
      form: this.$form.createForm(this)
    }
  },
  created() {

  },
  methods: {
    handleTabClick(key) {
      this.customActiveKey = key
      // this.form.resetFields()
    },
    handleSubmit(e) {
      e.preventDefault()
      const {
        form: { validateFields }
      } = this

      this.oginBtn = true

      validateFields((err, values) => {
        if (!err) {
          const loginParams = { ...values }
          this.$store.dispatch('user/login', loginParams).then((res) => {
            this.loginSuccess(res)
          }).catch((err) => {
            console.log(err)
            this.requestFailed(err)
          })
        } else {
          setTimeout(() => {
            this.loginBtn = false
          }, 600)
        }
      })
    },
    loginSuccess(res) {
      // 延迟 1 秒显示欢迎信息
      setTimeout(() => {
        this.$notification.success({
          message: '欢迎'
        })
      }, 1000)
      this.isLoginError = false
      this.$router.push({ path: '/system' })
    },
    requestFailed(err) {
      this.isLoginError = true
      this.$notification['error']({
        message: '错误',
        description: ((err.response || {}).data || {}).message || '请求出现错误，请稍后再试',
        duration: 4
      })
    }
  }
}
</script>

<style lang="less" scoped>
.user-layout-login {
  label {
    font-size: 14px;
  }

  .getCaptcha {
    display: block;
    width: 100%;
    height: 40px;
  }

  .forge-password {
    font-size: 14px;
  }

  button.login-button {
    padding: 0 15px;
    font-size: 16px;
    height: 40px;
    width: 100%;
  }

  .user-login-other {
    text-align: left;
    margin-top: 24px;
    line-height: 22px;

    .item-icon {
      font-size: 24px;
      color: rgba(0, 0, 0, 0.2);
      margin-left: 16px;
      vertical-align: middle;
      cursor: pointer;
      transition: color 0.3s;

      &:hover {
        color: #1890ff;
      }
    }

    .register {
      float: right;
    }
  }
}
</style>
