<template>
  <view class="card">
    <image :src="product.image" class="cover" />

    <view class="title">
      {{ product.name }}
    </view>

    <view class="price">
      ¥{{ product.price }}
    </view>

    <button @click="handleAddCart">
      加入购物车
    </button>
  </view>
</template>

<script setup>
const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['add-cart'])

function handleAddCart() {
  emit('add-cart', props.product)
}
</script> 

<style scoped>
	.card {
		width: 300px;
		border: 1px solid #ddd;
		border-radius: 8px;
		padding:10px;
	}
	
	.cover {
		width:100%;
	}
	
	.price {
		margin-top: 10px;
		color:red;
		margin-bottom: 5px;
	}
</style>