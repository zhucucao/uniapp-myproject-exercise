<template>
	<view class="image-content-">
		<navigator class="image-container" v-if="!isMore" 
		 :url="`/pages/xianxiami/xxx-sort-detail/xxx-sort-detail?_id=${item._id}&name=${item.name}`">
			<view class="top-title-item "> {{ formatRelativeTime(item.updateTime) }}</view>
			<image mode="aspectFill" :src="item.picurl" />
			<view class="bottom-title-item">{{item.name}}</view>
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
	import type {CommonPicItem}  from '@/types/xxm/xxxType';
	
	defineProps<{
	  item?: CommonPicItem
	  isMore?: boolean
	}>();
	
	const moreSwitchTab = () => {
		uni.switchTab({
			url : '/pages/xianxiami/xxxSort/xxxSort'
		})
	}
	
	
	// 时间戳转相对时间
	function formatRelativeTime(timestamp: number): string {
	  const now = Date.now();
	  const diff = now - timestamp;
	
	  const minute = 60 * 1000;
	  const hour = 60 * minute;
	  const day = 24 * hour;
	  const month = 30 * day;
	  const year = 365 * day;
	
	  // 防止时间戳无效或属于未来
	  if (!Number.isFinite(timestamp) || timestamp <= 0) {
	    return '未知时间';
	  }
	
	  if (diff < 0) {
	    return '刚刚';
	  }
	
	  if (diff < minute) {
	    return '1分钟内';
	  }
	
	  if (diff < hour) {
	    return `${Math.floor(diff / minute)}分钟前`;
	  }
	
	  if (diff < day) {
	    return `${Math.floor(diff / hour)}小时前`;
	  }
	
	  if (diff < month) {
	    return `${Math.floor(diff / day)}天前`;
	  }
	
	  if (diff < year) {
	    return `${Math.floor(diff / month)}个月前`;
	  }
	
	  return `${Math.floor(diff / year)}年前`;
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