import axios from 'axios'
// import { Message } from 'element-ui'
import { getToken } from '@/utils/auth'

// const messageLoading = null

const wirteUrl = [
  `/manage/employee/login`
]

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent

    config.headers = {
      'Content-Type': 'application/json'
    }

    // if (!messageLoading) {
    //   messageLoading = Message({
    //     message: '<i class="el-message__icon el-icon-loading"></i><span class="el-message__content">正在加载中...</span>',
    //     offset: 50,
    //     type: 'loading',
    //     dangerouslyUseHTMLString: true,
    //     duration: 0
    //   })
    // }

    if (!wirteUrl.includes(config.url)) {
      if (config.data) {
        const dataJson = config.data
        dataJson.employeeToken = getToken()
        config.data = JSON.stringify(dataJson)
      } else {
        const dataJson = {}
        dataJson.employeeToken = getToken()
        config.data = dataJson
      }
    }

    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data
    // messageLoading = null
    // Message.closeAll()
    // if the custom code is not 20000, it is judged as an error.
    if (res.code !== '10000') {
      // Message({
      //   message: res.msg || '系统错误',
      //   type: 'error',
      //   duration: 5 * 1000
      // })
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res.data
    }
  },
  error => {
    // messageLoading = null
    // Message.closeAll()
    console.error('err---------' + error) // for debug
    // Message({
    //   message: error,
    //   type: 'error',
    //   duration: 5 * 1000
    // })
    return Promise.reject(error)
  }
)

export default service
