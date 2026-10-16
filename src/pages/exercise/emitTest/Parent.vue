<template>
  <view class="cardContainer">
	  <view class="cardView">
		  <ProductCard
		    :product="phone"
		    @add-cart="addCart"
		  />
	  </view>
  </view>
</template>

<script setup>
import ProductCard from './ProductCard.vue'

const phone = {
  id: 1,
  name: 'iPhone',
  price: 5999,
  image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&q=80',
}

function addCart(product) {
  console.log('加入购物车：', product)

  uni.showToast({
    title: `${product.name} 已加入购物车`,
    icon: 'none',
  })
}
</script>

<style scoped>
	.cardContainer{
		display:flex;
		flex-direction: column;
		align-items: center;
		height: 100vh;
		padding: 20px;
	}
	
	.cardView {
		width:300px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding:20px;
	}
</style>