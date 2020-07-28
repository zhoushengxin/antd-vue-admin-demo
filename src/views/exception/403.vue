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
  name: 'Exception403',
  components: {
    Exception
  },
  data() {
    return {
      imgUrl: 'https://gw.alipayobjects.com/zos/rmsportal/wZcnGqRDyhPOEYFcZDnb.svg',
      status: '403',
      statusText: '抱歉，你无权访问该页面'
    }
  }
}
</script>
