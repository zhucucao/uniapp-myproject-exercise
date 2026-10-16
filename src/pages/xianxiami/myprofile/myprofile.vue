<template>
	<view class="profile-page">
		<view class="profile-container">
			<view class="info-container">
				<view class="info-image">
					<image src="/static/images/xxmLogo.png" mode="aspectFill" />
				</view>
				<view class="info-ip">119.163.181.236</view>
				<view class="info-address">来自：山东</view>
			</view>


			<view class="operation-list">
				<view v-for="item in operationList" :key="item.id" class="operation-item">
					<xxx-profile-detail v-bind="item" @click-item="handleOperationClick" />
				</view>

			</view>

			<view class="operation-list">
				<view v-for="item in operationSecondList" class="operation-item"
				:key="item.id"
				 >
					<xxx-profile-detail v-bind="item"
						@click-item="handleOperationClick" />
				</view>
				
			</view>
		</view>
	</view>
</template>

<script setup>
	const handleOperationClick = (type) => {
		console.log('点击的是：', type)
	}

	const operationList = ref([{
			id: 1,
			icon: 'icon-icon_386',
			iconColor: '#2DB18C',
			title: '我的下载',
			value: 10,
			type: 'download',
		},
		{
			id: 2,
			icon: 'icon-pingfen',
			iconColor: '#2DB18C',
			title: '我的评分',
			value: 10,
			type: 'score',
		},
		{
			id: 3,
			icon: 'icon-lianxikefu',
			iconColor: '#2DB18C',
			title: '联系客服',
			value: 0,
			type: 'kefu',
		},
	])

	const operationSecondList = ref([{
			id: 4,
			icon: 'icon-dingyuegengxin',
			iconColor: '#2DB18C',
			title: '订阅更新',
			value: 0,
			type: 'gengxin',
		},
		{
			id: 5,
			icon: 'icon-15',
			iconColor: '#2DB18C',
			title: '常见问题',
			value: 8,
			type: 'changjianwenti',
		}
	])
</script>

<style scoped lang="scss">
	.profile-page {
		padding: 30rpx;
		height: 100vh;

		background:
			linear-gradient(to bottom,
				rgba(255, 255, 255, 0) 0%,
				rgba(255, 255, 255, 0.3) 22%,
				#fff 42%),
			radial-gradient(circle at 10% 0%,
				rgba(172, 244, 220, 0.7) 0%,
				rgba(172, 244, 220, 0.25) 30%,
				transparent 55%),
			radial-gradient(circle at 95% 3%,
				rgba(255, 221, 203, 0.6) 0%,
				rgba(255, 221, 203, 0.2) 30%,
				transparent 55%),
			#fff;
	}

	.profile-container {
		width: 100%;
		margin-top: 50rpx;

		.info-container {
			display: flex;
			flex-direction: column;
			align-items: center;
			gap: 30rpx;
			padding-bottom: 60rpx;

			.info-image {
				margin-top: 30rpx;

				image {
					width: 200rpx;
					height: 200rpx;
					border-radius: 300rpx;
				}
			}

			.info-ip {
				font-size: 50rpx;
			}

			.info-address {
				font-size: 35rpx;
				color: #ACACAC;
			}
		}

		.operation-list {
			background-color: #fff;
			border: 1px solid #ACACAC;
			border-radius: 15rpx;
			overflow: hidden;

			.operation-item:not(:last-child) {
				border-bottom: 1rpx solid #ACACAC;
			}

			&:last-child {
				margin-top: 50rpx;
			}
		}
	}
</style>