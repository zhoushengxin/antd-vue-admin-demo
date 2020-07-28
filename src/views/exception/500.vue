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
  name: 'Exception500',
  components: {
    Exception
  },
  data() {
    return {
      imgUrl: 'https://gw.alipayobjects.com/zos/rmsportal/RVRUAYdCGeYNBWoKiIwB.svg',
      status: '500',
      statusText: '抱歉，服务器出错了'
    }
  }
}
</script>
