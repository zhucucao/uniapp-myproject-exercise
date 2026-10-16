<template>
  <view class="page">
    <view class="header">
      <text class="title">商品详情</text>
      <text class="status">{{ pageStatus }}</text>
    </view>

    <view v-if="loading" class="loading">
      商品加载中...
    </view>

    <view v-else class="card">
      <image
        :src="product.image"
        class="cover"
        mode="aspectFill"
      />

      <view class="info">
        <text class="name">{{ product.name }}</text>

        <text class="price">
          ¥{{ product.price }}
        </text>

        <text class="desc">
          {{ product.desc }}
        </text>
      </view>

      <button class="buy-btn" @click="buyNow">
        立即购买
      </button>
    </view>

    <view class="log-box">
      <text class="log-title">生命周期日志</text>

      <text
        v-for="(item, index) in logs"
        :key="index"
        class="log-item"
      >
        {{ item }}
      </text>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'
import {
  onLoad,
  onShow,
  onReady,
  onPullDownRefresh,
  onUnload,
} from '@dcloudio/uni-app'

const loading = ref(true)

const pageStatus = ref('初始化中')

const logs = ref([])

const product = ref({
  id: '',
  name: '',
  price: 0,
  desc: '',
  image: '',
})

let timer = null

function addLog(text) {
  logs.value.unshift(text)
}

// 1. 页面加载
onLoad((options) => {
  addLog(`onLoad：商品 id = ${options.id || 1}`)

  pageStatus.value = '页面加载'

  loadProduct(options.id || 1)

  timer = setInterval(() => {
    console.log('页面存活中...')
  }, 3000)
})

// 2. 页面每次显示
onShow(() => {
  addLog('onShow：页面显示')

  pageStatus.value = '页面显示'

  // 实际业务里经常做：
  // 页面曝光统计
  // 返回页面后刷新部分数据
  console.log('记录商品详情页曝光')
})

// 3. 页面首次渲染完成
onReady(() => {
  addLog('onReady：首次渲染完成')

  pageStatus.value = '渲染完成'
})

// 4. 下拉刷新
onPullDownRefresh(async () => {
  addLog('onPullDownRefresh：重新加载商品')

  pageStatus.value = '刷新中'

  await loadProduct(product.value.id || 1)

  uni.stopPullDownRefresh()

  pageStatus.value = '刷新完成'
})

// 5. 页面卸载
onUnload(() => {
  addLog('onUnload：页面销毁')

  clearInterval(timer)

  console.log('定时器已清理')
})

function loadProduct(id) {
  loading.value = true

  return new Promise((resolve) => {
    setTimeout(() => {
      product.value = {
        id,
        name: 'iPhone 16 Pro',
        price: 7999,
        desc: '这是一个用来学习 uni-app 生命周期的商品详情页。',
        image:
          'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&q=80',
      }

      loading.value = false

      addLog('商品数据加载完成')

      resolve()
    }, 800)
  })
}

function buyNow() {
  uni.showToast({
    title: `购买 ${product.value.name}`,
    icon: 'none',
  })
}
</script>

<style scoped>
.page {
  min-height: 100vh;
  padding: 20px;
  box-sizing: border-box;
  background-color: #f5f6f8;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.title {
  font-size: 24px;
  font-weight: bold;
}

.status {
  font-size: 13px;
  color: #666;
  background-color: white;
  padding: 6px 10px;
  border-radius: 20px;
}

.loading {
  padding: 50px 0;
  text-align: center;
  color: #999;
}

.card {
  padding: 16px;
  background-color: white;
  border-radius: 12px;
}

.cover {
  width: 100%;
  height: 220px;
  border-radius: 10px;
}

.info {
  display: flex;
  flex-direction: column;
  margin-top: 16px;
}

.name {
  font-size: 20px;
  font-weight: bold;
}

.price {
  margin-top: 10px;
  font-size: 22px;
  font-weight: bold;
  color: #e64340;
}

.desc {
  margin-top: 10px;
  line-height: 1.7;
  color: #666;
}

.buy-btn {
  margin-top: 20px;
}

.log-box {
  margin-top: 20px;
  padding: 16px;
  background-color: white;
  border-radius: 12px;
}

.log-title {
  display: block;
  margin-bottom: 10px;
  font-weight: bold;
}

.log-item {
  display: block;
  padding: 6px 0;
  font-size: 13px;
  color: #666;
  border-bottom: 1px solid #eee;
}
</style>