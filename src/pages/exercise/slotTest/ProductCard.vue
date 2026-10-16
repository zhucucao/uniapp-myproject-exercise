<template>
  <view class="card">
    <image :src="product.image" class="cover" />

    <view class="title">
      {{ product.name }}
    </view>

    <view class="price">
      ¥{{ product.price }}
    </view>

    <!-- 操作区交给父组件决定 -->
    <view class="actions">
      <slot />
    </view>
  </view>
</template>

<script setup>
defineProps({
  product: {
    type: Object,
    required: true,
  },
})
</script>

<style scoped>
.card {
  width: 300px;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-sizing: border-box;
}

.cover {
  width: 100%;
  height: 180px;
}

.title {
  margin-top: 10px;
  font-size: 16px;
}

.price {
  margin-top: 6px;
  color: red;
}

.actions {
  margin-top: 12px;
}
</style>
