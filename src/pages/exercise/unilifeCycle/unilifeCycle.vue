<template>
  <view class="page">
    <!-- 顶部 -->
    <view class="header">
      <view class="header-title">uni-app 生命周期</view>
      <view class="header-desc">
        页面生命周期可视化 Demo
      </view>
    </view>

    <!-- 页面状态 -->
    <view class="status-card">
      <view class="status-left">
        <view class="status-dot"></view>

        <view>
          <view class="status-title">
            {{ pageStatus }}
          </view>

          <view class="status-desc">
            当前页面状态
          </view>
        </view>
      </view>

      <view class="status-count">
        {{ logs.length }}
      </view>
    </view>

    <!-- 生命周期说明 -->
    <view class="section-title">
      生命周期
    </view>

    <view class="life-list">
      <view
        v-for="item in lifeList"
        :key="item.name"
        class="life-item"
      >
        <view
          class="life-icon"
          :class="item.className"
        >
          {{ item.icon }}
        </view>

        <view class="life-content">
          <view class="life-name">
            {{ item.name }}
          </view>

          <view class="life-desc">
            {{ item.desc }}
          </view>
        </view>
      </view>
    </view>

    <!-- 操作 -->
    <view class="section-title">
      测试操作
    </view>

    <view class="button-box">
      <button
        class="action-button primary"
        @click="goDetail"
      >
        进入详情页
      </button>

      <button
        class="action-button"
        @click="clearLogs"
      >
        清空日志
      </button>
    </view>

    <!-- 日志 -->
    <view class="section-title log-title">
      <text>生命周期日志</text>

      <text class="log-total">
        {{ logs.length }} 条
      </text>
    </view>

    <view class="log-card">
      <view
        v-if="logs.length === 0"
        class="empty"
      >
        暂无日志
      </view>

      <view
        v-for="(item, index) in logs"
        :key="index"
        class="log-item"
      >
        <view class="log-index">
          {{ logs.length - index }}
        </view>

        <view class="log-info">
          <view class="log-name">
            {{ item.name }}
          </view>

          <view class="log-time">
            {{ item.time }}
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'
import {
  onLoad,
  onShow,
  onReady,
  onHide,
  onUnload,
  onPullDownRefresh,
  onReachBottom
} from '@dcloudio/uni-app'

const pageStatus = ref('初始化中')

const logs = ref([])

const lifeList = [
  {
    name: 'onLoad',
    desc: '页面加载，适合接收参数、初始化数据',
    icon: 'L',
    className: 'blue'
  },
  {
    name: 'onShow',
    desc: '页面每次显示都会触发',
    icon: 'S',
    className: 'green'
  },
  {
    name: 'onReady',
    desc: '页面首次渲染完成',
    icon: 'R',
    className: 'purple'
  },
  {
    name: 'onHide',
    desc: '页面被其他页面遮住',
    icon: 'H',
    className: 'orange'
  },
  {
    name: 'onUnload',
    desc: '页面关闭、销毁',
    icon: 'U',
    className: 'red'
  }
]

/**
 * 添加生命周期日志
 */
function addLog(name) {
  const date = new Date()

  const time = [
    String(date.getHours()).padStart(2, '0'),
    String(date.getMinutes()).padStart(2, '0'),
    String(date.getSeconds()).padStart(2, '0')
  ].join(':')

  logs.value.unshift({
    name,
    time
  })

  console.log(`[生命周期] ${name} - ${time}`)
}

/**
 * 进入详情页
 */
function goDetail() {
  uni.navigateTo({
    url: '/pages/exercise/unilifeCycle/child/child?id=100'
  })
}

/**
 * 清空日志
 */
function clearLogs() {
  logs.value = []
}

/**
 * 页面加载
 */
onLoad((options) => {
  pageStatus.value = '页面加载'

  addLog('onLoad')

  console.log('页面参数：', options)
})

/**
 * 页面显示
 */
onShow(() => {
  pageStatus.value = '页面显示中'

  addLog('onShow')
})

/**
 * 页面首次渲染完成
 */
onReady(() => {
  pageStatus.value = '页面渲染完成'

  addLog('onReady')
})

/**
 * 页面隐藏
 */
onHide(() => {
  pageStatus.value = '页面已隐藏'

  addLog('onHide')
})

/**
 * 页面销毁
 */
onUnload(() => {
  addLog('onUnload')
})

/**
 * 下拉刷新
 */
onPullDownRefresh(() => {
  addLog('onPullDownRefresh')

  setTimeout(() => {
    uni.stopPullDownRefresh()
  }, 800)
})

/**
 * 页面触底
 */
onReachBottom(() => {
  addLog('onReachBottom')
})
</script>

<style lang="scss" scoped>
page {
  background: #f5f6fa;
}

.page {
  min-height: 100vh;
  padding: 30rpx;
  box-sizing: border-box;
}

/* 顶部区域 */
.header {
  padding: 35rpx 10rpx 30rpx;
}

.header-title {
  font-size: 46rpx;
  font-weight: 700;
  color: #1f2937;
}

.header-desc {
  margin-top: 12rpx;
  font-size: 26rpx;
  color: #9ca3af;
}

/* 状态卡片 */
.status-card {
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 32rpx;
  margin-bottom: 35rpx;

  background: #ffffff;
  border-radius: 24rpx;

  box-shadow: 0 12rpx 40rpx rgba(0, 0, 0, 0.05);
}

.status-left {
  display: flex;
  align-items: center;
}

.status-dot {
  width: 20rpx;
  height: 20rpx;
  margin-right: 22rpx;

  background: #22c55e;
  border-radius: 50%;

  box-shadow: 0 0 0 10rpx rgba(34, 197, 94, 0.12);
}

.status-title {
  font-size: 30rpx;
  font-weight: 600;
  color: #1f2937;
}

.status-desc {
  margin-top: 8rpx;
  font-size: 23rpx;
  color: #9ca3af;
}

.status-count {
  display: flex;
  align-items: center;
  justify-content: center;

  min-width: 70rpx;
  height: 70rpx;

  padding: 0 18rpx;

  font-size: 28rpx;
  font-weight: 700;

  color: #4f46e5;
  background: #eef2ff;

  border-radius: 18rpx;
}

/* 标题 */
.section-title {
  margin: 35rpx 5rpx 20rpx;

  font-size: 30rpx;
  font-weight: 700;

  color: #374151;
}

/* 生命周期列表 */
.life-list {
  overflow: hidden;

  background: #ffffff;
  border-radius: 24rpx;

  box-shadow: 0 12rpx 40rpx rgba(0, 0, 0, 0.04);
}

.life-item {
  display: flex;
  align-items: center;

  padding: 28rpx 30rpx;

  border-bottom: 1rpx solid #f0f1f5;
}

.life-item:last-child {
  border-bottom: none;
}

.life-icon {
  display: flex;
  align-items: center;
  justify-content: center;

  width: 78rpx;
  height: 78rpx;

  margin-right: 24rpx;

  border-radius: 22rpx;

  font-size: 30rpx;
  font-weight: 700;
}

.life-icon.blue {
  color: #2563eb;
  background: #eff6ff;
}

.life-icon.green {
  color: #16a34a;
  background: #f0fdf4;
}

.life-icon.purple {
  color: #7c3aed;
  background: #f5f3ff;
}

.life-icon.orange {
  color: #ea580c;
  background: #fff7ed;
}

.life-icon.red {
  color: #dc2626;
  background: #fef2f2;
}

.life-content {
  flex: 1;
}

.life-name {
  font-size: 29rpx;
  font-weight: 600;
  color: #1f2937;
}

.life-desc {
  margin-top: 8rpx;

  font-size: 24rpx;
  line-height: 1.5;

  color: #9ca3af;
}

/* 按钮 */
.button-box {
  display: flex;
  gap: 20rpx;
}

.action-button {
  flex: 1;

  height: 88rpx;
  line-height: 88rpx;

  margin: 0;
  padding: 0;

  font-size: 28rpx;
  font-weight: 600;

  color: #374151;
  background: #ffffff;

  border-radius: 20rpx;

  box-shadow: 0 8rpx 25rpx rgba(0, 0, 0, 0.04);
}

.action-button::after {
  border: none;
}

.action-button.primary {
  color: #ffffff;
  background: #4f46e5;
}

/* 日志标题 */
.log-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.log-total {
  font-size: 23rpx;
  font-weight: 400;
  color: #9ca3af;
}

/* 日志 */
.log-card {
  min-height: 200rpx;

  padding: 10rpx 28rpx;

  background: #111827;

  border-radius: 24rpx;

  box-shadow: 0 12rpx 40rpx rgba(17, 24, 39, 0.18);
}

.log-item {
  display: flex;
  align-items: center;

  padding: 25rpx 0;

  border-bottom: 1rpx solid rgba(255, 255, 255, 0.08);
}

.log-item:last-child {
  border-bottom: none;
}

.log-index {
  display: flex;
  align-items: center;
  justify-content: center;

  width: 52rpx;
  height: 52rpx;

  margin-right: 20rpx;

  font-size: 22rpx;

  color: #a5b4fc;
  background: rgba(99, 102, 241, 0.18);

  border-radius: 14rpx;
}

.log-info {
  flex: 1;
}

.log-name {
  font-size: 27rpx;
  font-weight: 600;

  color: #f9fafb;
}

.log-time {
  margin-top: 6rpx;

  font-size: 22rpx;

  color: #6b7280;
}

.empty {
  padding: 70rpx 0;

  text-align: center;

  font-size: 25rpx;

  color: #6b7280;
}
</style>