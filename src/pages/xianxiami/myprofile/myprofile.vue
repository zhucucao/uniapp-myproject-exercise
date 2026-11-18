<template>
	<view class="profile-page">
		<view v-if="currentUserInfo"  class="profile-container">
			<view class="info-container">
				<view class="info-image">
					<image src="/static/images/xxmLogo.png" mode="aspectFill" />
				</view>
				<view class="info-ip">{{currentUserInfo.IP}}</view>
				<view class="info-address">来自：{{currentUserInfo.address.province}}</view>
			</view>


			<view class="operation-list">
				<view v-for="item in operationList" :key="item.id" class="operation-item">
					<xxx-profile-detail v-bind="item" @click-item="handleOperationClick" />
				</view>

			</view>

			<view class="operation-list">
				<view v-for="item in operationSecondList" class="operation-item" :key="item.id">
					<xxx-profile-detail v-bind="item" @click-item="handleOperationClick" />
				</view>

			</view>
		</view>
		
		<view v-else>
			<wd-loading text="加载中"></wd-loading>
		</view>
	</view>
</template>

<script setup lang="ts">
	import type { UserInfo } from '@/types/xxm/xxxType';
	import { requestPersonalInfo } from '@/api/xxxApi'
	const handleOperationClick = (type) => {
		console.log('点击的是：', type)
		if(type ==="download" || type === "score") {
			uni.navigateTo({
				url: `/pages/xianxiami/xxx-sort-detail/xxx-sort-detail?source=${type}`
			})
		}
		
		if(type === "commonTitle" || type === "update") {
			if(type === "commonTitle") {
				uni.navigateTo({
					url: `/pages/xianxiami/xxx-notice/xxx-notice?_id=6536358ce0ec19c8d67fbe82`
				})
			}else {
				uni.navigateTo({
					url: `/pages/xianxiami/xxx-notice/xxx-notice?_id=65361e318b0da4ca084e3ce0`
				})
			}
		}
	}

	definePage({
		style: {
			navigationStyle: 'default',
			navigationBarTitleText: '个人'
		}
	})

	const currentUserInfo = ref<UserInfo>();

	onLoad(async (option) => {
		await queryUserInfo();
	})


	const queryUserInfo = async () => {
		try {
			const resData = await requestPersonalInfo();
			currentUserInfo.value = resData.data;
			console.log(resData)
		} catch (error) {
			console.log(error)
		} finally {

		}
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
		type: 'update',
	},
	{
		id: 5,
		icon: 'icon-15',
		iconColor: '#2DB18C',
		title: '常见问题',
		value: 8,
		type: 'commonTitle',
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