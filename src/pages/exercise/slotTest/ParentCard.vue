<template>
  <view class="parent-card-container">
    <view class="parent-card">
      <ProductCard :product="phone">
        <button @click="addCart">
          加入购物车
        </button>
      </ProductCard>

      <ProductCard :product="book">
        <button @click="buyNow">
          立即购买
        </button>
      </ProductCard>
    </view>
  </view>
</template>

<script setup>
import ProductCard from './ProductCard.vue'

const phone = {
  name: 'iPhone',
  price: 5999,
  image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&q=80',
}

const book = {
  name: 'Vue 入门',
  price: 69,
  image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800&q=80',
}

function addCart() {
  console.log('加入购物车')
}

function buyNow() {
  console.log('立即购买')
}
</script>

<style scoped>
.parent-card-container {
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.parent-card {
  width: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap:20px;
}
</style>
