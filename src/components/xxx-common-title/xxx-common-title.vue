<template>
	<view class="day-recommend-container">
		<view class="day-text-container">
			<slot name="text-recommend-slot"></slot>
		</view>
		
		<view class="riqi-container">
			<slot name="icon-recomment-slot"></slot>
		</view>
	</view>
</template>

<script setup>
	
</script>

<style scoped lang="scss">
	.day-recommend-container {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-top: 50rpx;
		background-color: white;
		border-radius: 20rpx;
		padding: 20rpx;
		
		.day-text-container {
			font-size: 50rpx;
			font-weight: 500;
		}
		
		.riqi-class {
			font-size: 40rpx;
			color:#2A9D8E
		}
	}
</style>
