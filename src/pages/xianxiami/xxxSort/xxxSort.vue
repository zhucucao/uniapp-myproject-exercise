<template>
	<xxx-custom-navbar title="自定义分类"  ></xxx-custom-navbar>
	<view class="sort-page common-background-color">
		<view class="sort-container">
			<xxx-common-pic v-for="item in commonPicArr" :item="item" :key="item.id"></xxx-common-pic>
		</view>
	</view>
</template>

<script setup lang="ts">
	definePage({
	    style: {
	      navigationStyle : "custom"
	    },
	  })
	const commonPicArr = ref([
		{
			id : 1,
			timeTitle : "2月前更新",
			sortTitle : "可爱萌宠",
			type : "pet",
			imageUrl : "/static/images/xxm/preview_small.webp"
		},
		{
			id : 2,
			timeTitle : "2分钟前更新",
			sortTitle : "黑丝辣妹",
			type : "girl",
			imageUrl : "/static/images/xxm/classify2.jpg"
		},
		{
			id : 3,
			timeTitle : "1分钟前更新",
			sortTitle : "性感尤物",
			type : "sexy",
			imageUrl : "/static/images/xxm/classify1.jpg"
		},
	])
</script>

<style lang="scss" scoped>
	.sort-page {
		padding:30rpx
	}
	.sort-container {
		display:grid;
		grid-template-columns: repeat(3,1fr);
		gap:20rpx
	}
</style>
