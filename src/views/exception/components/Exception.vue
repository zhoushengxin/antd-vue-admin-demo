<template>
  <div class="exception">
    <div class="exception__img">
      <img :src="imgUrl" :alt="status">
    </div>
    <div class="exception__content">
      <h1 class="exception__status">{{ status }}</h1>
      <div v-if="statusText" class="exception__status_text">
        {{ statusText }}
      </div>
      <div class="exception__action">
        <a-button type="primary" @click="goHome">返回首页</a-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Exception',
  props: {
    imgUrl: {
      type: String,
      required: true
    },
    status: {
      type: String,
      required: true
    },
    statusText: {
      type: String,
      default: ''
    }
  },
  methods: {
    goHome() {
      this.$router.push({
        name: 'dashboard'
      })
    }
  }
}
</script>

<style lang="less" scoped>
.exception {
  height: 80%;
  min-height: 500px;
  margin-top: 150px;
  align-items: center;
  text-align: center;

  &__img {
    display: inline-block;
    padding-right: 52px;
    zoom: 1;

    & > img {
      height: 360px;
      max-width: 430px;
    }
  }

  &__content {
    display: inline-block;
    flex: auto;
  }

  &__status {
    margin-bottom: 24px;
    font-size: 72px;
    font-weight: 600;
    color: #434e59;
    line-height: 72px;
  }

  &__status_text {
    margin-bottom: 20px;
    font-size: 20px;
    color: rgba(0, 0, 0, .45);
    line-height: 28px;
  }
}
</style>
