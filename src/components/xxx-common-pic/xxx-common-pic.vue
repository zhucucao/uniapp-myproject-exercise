<template>
	<view class="image-content-">
		<navigator class="image-container" v-if="!isMore" 
		 :url="`/pages/xianxiami/xxx-sort-detail/xxx-sort-detail?type=${props.item?.type}`">
			<view class="top-title-item ">{{props.item.timeTitle}}</view>
			<image mode="aspectFill" :src="props.item.imageUrl" />
			<view class="bottom-title-item">{{props.item.sortTitle}}</view>
		</navigator>

		<navigator class="image-container" v-if="isMore" @click="moreSwitchTab">
			<image mode="aspectFill" src="/static/images/xxm/more.jpg" />
			<view class="bottom-title-item-mask mask">
				<uni-icons type="more-filled" size="30"></uni-icons>
				<text>更多</text>
			</view>
		</navigator>
	</view>
</template>

<script setup lang="ts">
	import { ref } from 'vue'
	type CommonPicItem = {	
	  id: number
	  timeTitle: string
	  sortTitle: string
	  type: string
	  imageUrl: string
	}
	
	const props = defineProps<{
	  item?: CommonPicItem
	  isMore?: boolean
	}>();
	
	const moreSwitchTab = () => {
		uni.switchTab({
			url : '/pages/xianxiami/xxxSort/xxxSort'
		})
	}
	
</script>

<style lang="scss" scoped>
	.image-container {
		position: relative;

		.top-title-item {
			position: absolute;
			top: 0;
			left: 0;
			z-index: 2;
			color: white;
			background: rgba(250, 129, 90, 0.7);
			backdrop-filter: blur(20rpx);
			padding: 6rpx 14rpx;
			border-bottom-right-radius: 18rpx;
			border-top-left-radius: 15rpx;
			font-size: 22rpx;
		}

		image {
			display: block;
			width: 100%;
			border-radius: 15rpx;
		}

		.bottom-title-item {
			position: absolute;
			left: 0;
			bottom: 0;
			// background-color: #A1A1A1;
			display: flex;
			height: 100rpx;
			width: 100%;
			justify-content: center;
			font-size: 35rpx;
			color: white;
			align-items: center;
			background: rgba(0, 0, 0, 0.2);
			backdrop-filter: blur(30rpx);
			border-radius: 15rpx;
		}

		.bottom-title-item-mask {
			position: absolute;
			left: 0;
			bottom: 0;
			display: flex;
			flex-direction: column;
			font-size: 20rpx;
			height: 100%;
			width: 100%;
			justify-content: center;
			font-size: 35rpx;
			color: white;
			align-items: center;
			background: rgba(0, 0, 0, 0.2);
			backdrop-filter: blur(30rpx);
			border-radius: 15rpx;
		}


	}
</style>