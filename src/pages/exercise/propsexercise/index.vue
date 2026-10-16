<script lang="ts" setup>
defineOptions({
  name: '',
  options: {
    virtualHost: true,
  },
})
const props = defineProps({
  imgUrl: {
    type: String,
    default: '',
  },
  username: {
    type: String,
    default: '匿名',
  },
})
definePage({
  style: {
    navigationBarTitleText: 'props练习',
  },
})
</script>

<template>
  <view class="infoView">
    <image :src=" props.imgUrl " mode="widthFix" />
    <view>{{ props.username }}</view>
  </view>
</template>

<style lang="scss" scoped>
.infoView {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f0f0f0;
  image {
    width: 100rpx;
    height: 100rpx;
    border-radius: 50%;
  }

  view {
    font-size: 28rpx;
    color: #333;
    margin-top: 20rpx;
  }
}
</style>
