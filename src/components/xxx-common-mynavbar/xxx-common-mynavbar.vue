<template>
	<view class="layout">
		<!-- fixed -->
		<view class="navbar">
			<view class="statusBar" :style="{height: statusBarHeight + 'px'}"></view>
			<view class="titleBar" :style="{height:navBarHeight + 'px'}">
				<view class="title">{{commonTitle}}</view>
				<view class="search">
					<uni-icons class="icon" type="search" color="#888" size="18"></uni-icons>
					<text class="text">搜索</text>
				</view>
			</view>
		</view>
		
		<!-- 占位:status + nav bar -->
		<view class="fill" :style="{height: totalHeight + 'px'}">
			
		</view>
	</view>
</template>

<script setup >
	
	defineProps({
		commonTitle : {
			type : String,
			default : '默认标题'
		}
	})
	
	import { getHeaderHeights } from '@/utils/headerCalculate'
	
	const statusBarHeight = ref(0)
	const navBarHeight = ref(44)
	const totalHeight = ref(44)
	
	onMounted(() => {
	  const heights = getHeaderHeights()
	  statusBarHeight.value = heights.statusBarHeight
	  navBarHeight.value = heights.navBarHeight
	  totalHeight.value = heights.totalHeight
	})
	
	// // 状态栏
	// const statusBarHeight = ref(0)

	// // 导航栏 主体高度
	// const navBarHeight = ref(44)

	// // 总高度 status + navbar
	// const totalHeight = ref(44)
	
	// onMounted(() => {
	// 	initHeight();
	// })

	// const initHeight = () => {
	//   const systemInfo = uni.getSystemInfoSync();
	//   statusBarHeight.value =
	//     systemInfo.statusBarHeight || 10;
	// 	// 小程序支持胶囊 API 时
	// 	if (
	// 	  typeof uni.getMenuButtonBoundingClientRect ===
	// 	  'function'
	// 	) {
	// 		const menu = uni.getMenuButtonBoundingClientRect();
			
		
	// 		if(menu && menu.height) {
	// 			let {top,height} =  uni.getMenuButtonBoundingClientRect();
				
	// 			navBarHeight.value = height + (top - statusBarHeight.value) * 2;
				
	// 			totalHeight.value = navBarHeight.value + statusBarHeight.value;
	// 		}
			
	// 	}
		
	// }
</script>

<style lang="scss" scoped>
	.layout {
		.navbar {
			position: fixed;
			top:0;
			left: 0;
			width: 100%;
			z-index: 10;
			background:
				linear-gradient(to bottom,transparent,#fff 400rpx),
				linear-gradient(to right,#beecd8 20%,#F4E2D8);
			
			.statusBar {
			}
			
			.titleBar {
				display: flex;
				align-items: center;
				padding: 0 30rpx;
				.title {
					font-size:22px;
					font-weight: 700;
					color: #000;
				}
				
				.search {
					width: 220rpx;
					height: 50rpx;
					border-radius: 60rpx;
					border:1px solid #fff;
					margin-left: 30rpx;
					color: #999;
					font-size: 28rpx;
					display: flex;
					align-items: center;
					padding:5rpx;
					.icon {
						margin-left: 5rpx;
					}
					
					.text {
						padding-left: 10rpx;
					}
				}
			}
			
		}
		
		.fill {
			
		}
	}
</style>
