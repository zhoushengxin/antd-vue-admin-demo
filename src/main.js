import Vue from 'vue'

import store from './store'
import router from '@/router'

import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import './global.less'

import '@/permission'

import '../mock'

import App from './App.vue'

Vue.use(Antd)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
