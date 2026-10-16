<template>
	<!-- <xxx-custom-navbar title="猪猪侠" ></xxx-custom-navbar> -->
	<xxx-common-mynavbar commonTitle="猪猪侠"></xxx-common-mynavbar>
	<view class="page-container common-background-color">
		<view class="page">
			<view class="swipper-container">
				<swiper :indicator-dots="true" indicator-active-color="#ffffff" :autoplay="true" :circular="true"
					:interval="3000" :duration="500">
					<swiper-item v-for="item in bannerImageArr" :key="item._id">
						<image :src="item.picurl" mode="aspectFill" />
					</swiper-item>

					<!-- 	<swiper-item>
						<image src="/static/wallpaper/banner2.jpg" mode="aspectFill" />
					</swiper-item>

					<swiper-item>
						<image src="/static/wallpaper/banner3.jpg" mode="aspectFill" />
					</swiper-item> -->
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
						<swiper-item @click="goTextDetailPage" v-for="item in commonTextArr">
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
						
						<navigator :key="item._id" v-for="item in imageDayRamdomArr" url='/pages/xianxiami/xxx-sort-detail/xxx-sort-detail?type=girl' class="image-item">
							<image :src="item.smallPicurl" />
						</navigator>
						
						<!-- 
						<navigator url='/pages/xianxiami/xxx-sort-detail/xxx-sort-detail?type=girl' class="image-item">
							<image src="/static/images/xxm/classify1.jpg" />
						</navigator>

						<navigator url='/pages/xianxiami/xxx-sort-detail/xxx-sort-detail?type=pet' class="image-item">
							<image src="/static/images/xxm/classify2.jpg" />
						</navigator>

						<navigator url='/pages/xianxiami/xxx-sort-detail/xxx-sort-detail?type=sexy' class="image-item">
							<image src="/static/images/xxm/classify2.jpg" />
						</navigator>

						<navigator url='/pages/xianxiami/xxx-sort-detail/xxx-sort-detail?type=sexy' class="image-item">
							<image src="/static/images/xxm/classify2.jpg" />
						</navigator> -->

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
				<xxx-common-pic v-for="item in commonPicArr" :item="item"></xxx-common-pic>
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

	interface BannerItem {
		_id : string,
		picurl : string,
		sort : number,
		target : string,
		url : string
	}

	interface XxxApiResponse<T> {
		author : string,
		data : T,
		errCode : number,
		errMsg : string,
		timeCost : number
	}

	interface CommonTextItem {
		author : string,
		publish_date : number,
		select : boolean,
		title : string,
		view_count : number,
		_id : string
	}

	interface DayRecommendImage {
		description : string,
		classid : string,
		smallPicurl : string,
		tabs : string[],
		_id : string,
		score : string,
		nickname : string
	}

	const commonPicArr = ref([
		{
			id: 1,
			timeTitle: "2月前更新",
			sortTitle: "可爱萌宠",
			type: "pet",
			imageUrl: "/static/images/xxm/preview_small.webp"
		},
		{
			id: 2,
			timeTitle: "2分钟前更新",
			sortTitle: "黑丝辣妹",
			type: "girl",
			imageUrl: "/static/images/xxm/classify2.jpg"
		},
		{
			id: 3,
			timeTitle: "1分钟前更新",
			sortTitle: "性感尤物",
			type: "sexy",
			imageUrl: "/static/images/xxm/classify1.jpg"
		},
	])

	const goTextDetailPage = () => {
		uni.navigateTo({
			url: '/pages/xianxiami/xxx-notice/xxx-notice'
		})
	}
	onMounted(() => {
		console.log("--------------------------")
		queryBaner();
		queryCommonText();
		getDayRandom();
	})

	let bannerImageArr = ref<BannerItem[]>([]);
	let commonTextArr = ref<CommonTextItem[]>([]);

	const imageDayRamdomArr = ref<DayRecommendImage[]>([]);

	const queryBaner = () => {
		uni.request({
			url: 'https://tea.qingnian8.com/api/bizhi/homeBanner',
			method: 'GET',
			header: {
				'access-key': '113150'
			},
			success(res) {
				const result = res.data as XxxApiResponse<BannerItem[]>
				bannerImageArr.value = result.data
			},
			fail(err) {
				console.log(err)
			},
			complete() {
				console.log('请求结束')
			}
		})
	}
	// 公告
	const queryCommonText = () => {
		uni.request({
			url: 'https://tea.qingnian8.com/api/bizhi/wallNewsList',
			method: 'GET',
			header: {
				'access-key': '113150'
			},
			data: {
				pageSize: 5
			},
			success(res) {
				const result = res.data as XxxApiResponse<CommonTextItem[]>
				console.log(result.errCode)
				commonTextArr.value = result.data
			},
			fail(err) {
				console.log(err)
			},
			complete() {
				console.log('请求结束')
			}
		})
	}

	// 每日推荐
	const getDayRandom = async () => {
		try {
			const res = await uni.request({
				url: 'https://tea.qingnian8.com/api/bizhi/randomWall',
				method: 'GET',
				header: {
					'access-key': '113150'
				}
			})
			const result = res.data as XxxApiResponse<DayRecommendImage[]>;
			if (result.errCode !== 0) {
				console.log("接口返回错误：", result.errMsg);
				return;
			}
			imageDayRamdomArr.value = result.data;

			console.log("每日推荐：", imageDayRamdomArr.value);

		} catch (error) {
			console.log("error:", error)
		}

	}
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