<template>
	<!-- <xxx-custom-navbar title="猪猪侠" ></xxx-custom-navbar> -->
	<xxx-common-mynavbar commonTitle="猪猪侠"></xxx-common-mynavbar>
	<view class="page-container common-background-color">
		<view class="page">
			<view class="swipper-container">
				<swiper :indicator-dots="true" indicator-active-color="#ffffff" :autoplay="true" :circular="true"
					:interval="3000" :duration="500">
					<swiper-item v-for="item in bannerImageArr" :key="item._id" @click="navicationToSortDetail(item)">
						<image :src="item.picurl" mode="aspectFill" />
					</swiper-item>
				</swiper>
			</view>

			<view class="text-container">
				<view class="text-left">
					<text class="iconfont icon-announcement notice-icon"></text>
					<text>公告</text>
				</view>
				<view class="text-middle">
					<swiper class="middle-swipper" :vertical="true" :autoplay="true" :interval="3000" :duration="500"
						:circular="true">
						<swiper-item @click="goTextDetailPage(item._id)" v-for="item in commonTextArr">
							<text>{{item.title}}</text>
						</swiper-item>
						<!-- <swiper-item @click="goTextDetailPage">
							<text>2我是一个粉刷匠，粉刷本领强222222222222222222222222222</text>
						</swiper-item>
						<swiper-item @click="goTextDetailPage">
							<text>3我是一个粉刷匠，粉刷本领强33333333333333333333333333</text>
						</swiper-item> -->
					</swiper>
				</view>
				<view class="text-right">
					<uni-icons type="forward" size="20"></uni-icons>
				</view>
			</view>

			<xxx-common-title>
				<template #['text-recommend-slot']>
					<text>每日推荐</text>
				</template>
				<template #['icon-recomment-slot']>
					<text class="iconfont  icon-riqi riqi-class "></text>
					<uni-dateformat :date="Date.now()" format="MM/dd" class="icon-text"></uni-dateformat>
				</template>
			</xxx-common-title>

			<view class="day-image-container">
				<view class="image-scroll-view-container">
					<scroll-view scroll-x show-scrollbar class="image-scroll">

						<navigator :key="item._id" v-for="item in imageDayRamdomArr"
							:url='`/pages/xianxiami/xxx-sort-detail/xxx-sort-detail?_id=${item.classid}&name=${item.nickname}`' class="image-item">
							<image :src="item.smallPicurl" />
						</navigator>

					</scroll-view>
				</view>
			</view>

			<xxx-common-title>
				<template #['text-recommend-slot']>
					<text>专题精选</text>
				</template>
				<template #['icon-recomment-slot']>
					<navigator class="more-text">More+</navigator>
				</template>
			</xxx-common-title>

			<view class="image-grid-container-list">
				<xxx-common-pic v-for="item in imageBigClassifyArr" :item="item"></xxx-common-pic>
				<xxx-common-pic :isMore="true"></xxx-common-pic>
			</view>
		</view>
	</view>
</template>

<script setup lang="ts">
	defineOptions({
		name: 'Home',
	})
	definePage({
		type: 'home',
		style: {
			navigationStyle: "custom"
		},
	})
	import type { HttpRequest, XxxApiResponse, BannerItem, CommonTextItem, DayRecommendImage,BigClassify } from '@/types/xxm/xxxType';
	import {requestBannerList,requestNoticeList,requestDailyRecommend,requestBigClassify} from '@/api/xxxApi'
	import { onShareTimeline } from '@dcloudio/uni-app'
	
	const getParam = (key: string, url: string): string => {
	    const match = url.match(new RegExp(`(?:^|&)${key}=([^&]*)`));
	    return match ? decodeURIComponent(match[1]) : '';
	};


	const navicationToSortDetail = (item:BannerItem)=> {
		const {_id,target,url,appid} = item;
		console.log("aaaaaaaaaaaaaaaaaaaa",target,_id);
		
		if(!target) {
			return;
		}
		if(target === "self") {
			const name = getParam('name',url);
			const id = getParam('id',url);
			const sortUrl = `/pages/xianxiami/xxx-sort-detail/xxx-sort-detail?_id=${id}&name=${name}`;
			uni.navigateTo({
				url: sortUrl
			})
		}else if (target === "miniProgram") {
			uni.navigateToMiniProgram({
				appId:appid,
				path:url
			})
		}
	}

	const goTextDetailPage = (_id:string) => {
		uni.navigateTo({
			url: `/pages/xianxiami/xxx-notice/xxx-notice?_id=${_id}`
		})
	}
	onMounted(() => {
		queryBaner();
		queryNoticeList();
		queryDailyRecommend();
		queryBigClassify();
	})

	let bannerImageArr = ref<BannerItem[]>([]);
	let commonTextArr = ref<CommonTextItem[]>([]);

	let imageDayRamdomArr = ref<DayRecommendImage[]>([]);
	
	let imageBigClassifyArr = ref<BigClassify[]>([]);

	// 轮播图
	const queryBaner = async () => {
		const result  =  await requestBannerList();
		bannerImageArr.value = result.data
	}
	// 公告
	const queryNoticeList = async() => {
		const result = await requestNoticeList();
		commonTextArr.value = result.data
		console.log("xxxx",commonTextArr.value)
	}

	// 每日推荐
	const queryDailyRecommend = async() => {
		const result = await requestDailyRecommend()
		imageDayRamdomArr.value = result.data;
	}
	// 专题精选
	const queryBigClassify = async() => {
		const result = await requestBigClassify();
		imageBigClassifyArr.value = result.data;
	}
	
	onShareAppMessage(()=> {
		return {
			title : '我的小程序壁紙',
			path : '/pages/xianxiami/xxxHome/xxxHome'
		}
	})
	
	onShareTimeline(()=> {
		  return {
		    title: '发现好看的壁纸，快来看看！',
		  }
	})
</script>

<style scoped lang="scss">
	.image-grid-container-list {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 16rpx;
		margin-top: 50rpx;
	}

	.page-container {
		width: 100%;
		box-sizing: border-box;
		min-height: 100vh;
	}

	.page {
		width: 100%;
		min-height: 100vh;
		box-sizing: border-box;
		padding: 10rpx 30rpx;
		// background-color: lightpink;
	}

	.swipper-container {
		width: 100%;
		box-sizing: border-box;
		border-radius: 16rpx;
		overflow: hidden;

		swiper {
			width: 100%;
			height: 340rpx;

			box-sizing: border-box;

			swiper-item {
				width: 100%;
				height: 100%;

				image {
					width: 100%;
					height: 100%;
				}
			}
		}

	}

	.notice-icon {
		font-size: 56rpx;
		color: #24AC86;
		font-weight: 700;
	}

	.text-container {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		margin-top: 50rpx;
		height: 70rpx;
		padding: 11rpx;
		border-radius: 28rpx;
		background-color: #F9F9F9;

		.text-left {
			display: flex;
			justify-content: flex-start;
			width: 150rpx;
			gap: 10rpx;
			height: 100%;
			align-items: center;
			color: #24AC86;
			font-weight: 700;
		}

		.text-middle {
			flex: 1;
			min-width: 0;
			display: flex;
			justify-content: center;
			align-items: center;
			height: 100%;

			.middle-swipper {
				width: 100%;
				height: 100%;

				swiper-item {
					text {
						display: block;
						width: 100%;
						height: 100%;
						line-height: 70rpx;
						text-overflow: ellipsis;
						white-space: nowrap;
						overflow: hidden;
					}
				}
			}
		}

		.text-right {
			width: 50rpx;
			height: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}

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
			color: #2A9D8E
		}
	}

	.day-image-container {
		width: 100%;
		margin-top: 50rpx;

		.image-scroll-view-container {
			.image-scroll {
				white-space: nowrap;
				width: 100%;

				.image-item {
					width: 220rpx;
					height: 430rpx;
					margin-right: 20rpx;
					display: inline-block;
				}

				.image-item image {
					width: 100%;
					height: 100%;
					border-radius: 16rpx;
				}
			}
		}
	}

	.more-text {
		font-size: 36rpx;
		color: #A1A1A1
	}

	.icon-text {
		margin-left: 10rpx;
		color: #2A9D8E
	}
</style>