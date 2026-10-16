<script lang="ts" setup>
import propsexercise from '../propsexercise/index.vue'

defineOptions({
  name: '',
  options: {
    virtualHost: true,
  },
})
definePage({
  style: {
    navigationBarTitleText: '父组件',
  },
})
</script>

<template>
  <view class="">
    <propsexercise img-url="https://img.yzcdn.cn/vant/cat.jpeg" username="张三" />
    <propsexercise img-url="https://img.yzcdn.cn/vant/cat.jpeg" username="李四" />
    <propsexercise img-url="https://img.yzcdn.cn/vant/cat.jpeg" username="周八" />
  </view>
</template>

<style lang="scss" scoped>
//
</style>
