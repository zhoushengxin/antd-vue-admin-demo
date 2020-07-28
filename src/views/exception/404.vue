<template>
  <exception
    :img-url="imgUrl"
    :status="status"
    :status-text="statusText"
  />
</template>

<script>
import Exception from './components/Exception.vue'

export default {
  name: 'Exception404',
  components: {
    Exception
  },
  data() {
    return {
      imgUrl: 'https://gw.alipayobjects.com/zos/rmsportal/KpnpchXsobRgLElEozzI.svg',
      status: '404',
      statusText: '抱歉，你访问的页面不存在'
    }
  }
}
</script>
