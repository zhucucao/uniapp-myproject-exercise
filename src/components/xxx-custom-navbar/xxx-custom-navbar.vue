<!-- components/CustomNavbar.vue -->

<template>
  <view>
    <!-- fixed 导航栏 -->
    <view
      class="navbar"
      :style="{
        height: totalHeight + 'px',
        backgroundColor
      }"
    >
      <!-- 状态栏占位 -->
      <view
        :style="{
          height: statusBarHeight + 'px'
        }"
      />

      <!-- Navbar 主体 -->
      <view
        class="navbar-main"
        :style="{
          height: navBarHeight + 'px'
        }"
      >
        <!-- 左侧 -->
        <view
          class="navbar-left"
          @click="handleBack"
        >
          <text
            v-if="showBack"
            class="back-icon"
          >
            ‹
          </text>
        </view>

        <!-- 标题 -->
        <view class="navbar-title">
          {{ title }}
        </view>

        <!-- 右侧占位 -->
        <view
          class="navbar-right"
          :style="{
            width: rightSafeWidth + 'px'
          }"
        />
      </view>
    </view>

    <!-- 因为 navbar 是 fixed，所以这里占位 -->
    <view
	  v-if="placeholder"
      :style="{
        height: totalHeight + 'px'
      }"
    />
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps({
  title: {
    type: String,
    default: ''
  },

  showBack: {
    type: Boolean,
    default: false
  },

  backgroundColor: {
    type: String,
    default: '#ffffff'
  },
  placeholder: {
	  type: Boolean,
	  default: true
  }
})

const statusBarHeight = ref(0)

// navbar 主体高度
const navBarHeight = ref(44)

// status + navbar
const totalHeight = ref(44)

// 为右边微信胶囊预留空间
const rightSafeWidth = ref(0)

onMounted(() => {
  initNavbar()
})

const initNavbar = () => {
  const systemInfo = uni.getSystemInfoSync()

  statusBarHeight.value =
    systemInfo.statusBarHeight || 10

  // 默认导航区域 44px
  navBarHeight.value = 34

  // 小程序支持胶囊 API 时
  if (
    typeof uni.getMenuButtonBoundingClientRect ===
    'function'
  ) {
    const menu = uni.getMenuButtonBoundingClientRect()

    if (menu && menu.height) {
      // 胶囊顶部距离状态栏底部的间距
      const gap =
        menu.top - statusBarHeight.value

      // navbar 高度：
      // 上间距 + 胶囊高度 + 下间距
      navBarHeight.value =
        menu.height + gap * 2

      // 给右侧胶囊留出位置
      rightSafeWidth.value =
        systemInfo.windowWidth - menu.left
    }
  }

  totalHeight.value =
    statusBarHeight.value +
    navBarHeight.value
}

const handleBack = () => {
  if (!props.showBack) return

  uni.navigateBack({
    delta: 1
  })
}
</script>

<style scoped>
.navbar {
  position: fixed;

  left: 0;
  top: 0;

  width: 100%;

  z-index: 999;

  box-sizing: border-box;
}

.navbar-main {
  position: relative;

  display: flex;
  align-items: center;

  width: 100%;
}

.navbar-left {
  position: relative;
  z-index: 2;

  width: 60px;
  height: 100%;

  display: flex;
  align-items: center;

  padding-left: 16px;

  box-sizing: border-box;
}

.back-icon {
  font-size: 32px;
  line-height: 1;
}

.navbar-title {
  position: absolute;

  left: 50%;
  top: 50%;

  transform: translate(-50%, -50%);

  font-size: 17px;
  font-weight: 500;

  white-space: nowrap;
}

.navbar-right {
  margin-left: auto;
  height: 100%;
}
</style>