<template>
  <view class="page">
    <view class="card">
      <view class="icon">
        ✓
      </view>

      <view class="title">
        详情页面
      </view>

      <view class="desc">
        此时首页已经触发了 onHide
      </view>

      <view class="params">
        收到参数 id：
        <text>{{ id }}</text>
      </view>

      <button
        class="back-btn"
        @click="back"
      >
        返回首页
      </button>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'
import {
  onLoad,
  onShow,
  onReady,
  onUnload
} from '@dcloudio/uni-app'

const id = ref('')

onLoad((options) => {
  id.value = options.id

  console.log('详情页 onLoad')
})

onShow(() => {
  console.log('详情页 onShow')
})

onReady(() => {
  console.log('详情页 onReady')
})

onUnload(() => {
  console.log('详情页 onUnload')
})

function back() {
  uni.navigateBack()
}
</script>

<style lang="scss" scoped>
page {
  background: #f5f6fa;
}

.page {
  min-height: 100vh;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 40rpx;

  box-sizing: border-box;
}

.card {
  width: 100%;

  padding: 70rpx 40rpx 50rpx;

  text-align: center;

  background: #ffffff;

  border-radius: 32rpx;

  box-shadow: 0 20rpx 60rpx rgba(0, 0, 0, 0.08);
}

.icon {
  display: flex;
  align-items: center;
  justify-content: center;

  width: 120rpx;
  height: 120rpx;

  margin: 0 auto 35rpx;

  font-size: 55rpx;
  font-weight: bold;

  color: #ffffff;
  background: #4f46e5;

  border-radius: 50%;

  box-shadow: 0 15rpx 35rpx rgba(79, 70, 229, 0.25);
}

.title {
  font-size: 42rpx;
  font-weight: 700;

  color: #1f2937;
}

.desc {
  margin-top: 15rpx;

  font-size: 26rpx;

  color: #9ca3af;
}

.params {
  margin-top: 40rpx;
  padding: 25rpx;

  font-size: 27rpx;

  color: #6b7280;
  background: #f9fafb;

  border-radius: 18rpx;
}

.params text {
  font-weight: 700;
  color: #4f46e5;
}

.back-btn {
  margin-top: 45rpx;

  height: 90rpx;
  line-height: 90rpx;

  font-size: 29rpx;
  font-weight: 600;

  color: #ffffff;
  background: #4f46e5;

  border-radius: 20rpx;
}

.back-btn::after {
  border: none;
}
</style>