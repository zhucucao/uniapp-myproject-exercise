<template>
	<xxx-custom-navbar title="虾米壁纸a" :placeholder="false" :showBack="true"></xxx-custom-navbar>
	<!-- 	<xxx-common-mynavbar></xxx-common-mynavbar> -->
	<view class="preview-page" @click="showInfoChange">
		<view class="preview-container">
			<view class="preview-image">
				<swiper :current="currentIndex" :indicator-dots="true" :circular="true" indicator-color="white"
					@change="swiperChange" :duration="500">
					<swiper-item v-for="(item ,index) in wallImageUrl">
						<image :src="item.bigPicurl" mode="aspectFill" />
					</swiper-item>
				</swiper>
			</view>

			<view class="preview-info-container" v-show="showInfo">
				<view class="info">
					<view class="info-top">
						<view class="inco-top-count">
							{{currentPage}}
						</view>
						<view class="inco-top-time">
							<uni-dateformat :date="Date.now()" format="hh:mm"></uni-dateformat>
						</view>
						<view class="inco-top-date">
							<uni-dateformat :date="Date.now()" format="yyyy/MM/dd"></uni-dateformat>
						</view>
					</view>

				</view>
			</view>

			<view class="preview-info-bottom" v-show="showInfo" @click.stop>
				<view class="info-bottom">
					<view class="info-item" @click="openPopup">
						<view class="iconfont icon-xinxi icon-text"></view>
						<text>信息</text>
					</view>
					<view class="info-item" @click="openScorePop">
						<view class="iconfont icon-shoucang  icon-text"></view>
						<text>{{ currentScoreRecord ? currentScoreRecord.score + '分' : '评分' }}</text>
					</view>
					<view class="info-item" @click="downloadWallPaper">
						<view class="iconfont icon-xiazai  icon-text"></view>
						<text>下载</text>
					</view>
				</view>
			</view>

			<view @click.stop>
				<uni-popup ref="infoPopup" type="bottom"  background-color="#fff"
  border-radius="30rpx 30rpx 0 0">
					<view class="infoPopup">
						<view class="popHeader">
							<view></view>
							<view class="title">壁纸信息</view>
							<view class="close" @click="closePopup">
								<uni-icons type="closeempty" size="18" color="#999"></uni-icons>
							</view>
						</view>
						<scroll-view scroll-y>
							<view class="content">
								<view class="row">
									<view class="label">壁纸ID:</view>
									<text selectable class="value">{{currentWallpaper._id}}</text>
								</view>
								<view class="row">
									<view class="label">发布者:</view>
									<text selectable class="value">{{currentWallpaper.nickname}}</text>
								</view>

								<view class="row">
									<view class="label">评分:</view>
									<view class='value rotebox'>
										<uni-rate readonly :value="Number(currentWallpaper.score)"></uni-rate>
										<text class="score">{{currentWallpaper.score}}分</text>
									</view>
								</view>
								<view class="row">
									<view class="label">标签:</view>
									<view class='value tabs'>
										<view class="tab" v-for="(item,index) in currentWallpaper.tabs" :key="index">
											{{item}}
										</view>
									</view>
								</view>


								<view class="copyRight">
									<text>{{currentWallpaper.description}}</text>
								</view>
							</view>
						</scroll-view>
					</view>
				</uni-popup>
			</view>


			<view @click.stop>
				<uni-popup ref="infoScorePopup" type="center">
					<view class="infoScorePopup">
						<view class="scoreHeader">
							<view></view>
							<view>壁纸信息</view>
							<view class="close" @click="closeScorePop">
								<uni-icons type="closeempty" size="18" color="#999"></uni-icons>
							</view>
						</view>

						<view class="scoreContent">
							<uni-rate v-model="giveScore" allow-half :readonly="hasScored || submiting"></uni-rate>
							<text>{{giveScore}}分</text>
						</view>

						<view class="scoreFooter">
							<button plain type="default" size="mini" @click="addScore"
								:disabled="hasScored || !giveScore || submiting">
								{{ hasScored ? '已评分' : '确认评分' }}</button>
						</view>
					</view>
				</uni-popup>
			</view>

		</view>
	</view>
</template>

<script setup lang="ts">
	import type { PreviewBigImgDetail, StoredScoreResult } from '@/types/xxm/xxxType';
	import {
		useWallpaperStore
	} from "@/store/wallpaper"

	import { storeToRefs } from "pinia";

	import { requestSetupScore } from '@/api/xxxApi'


	definePage({
		style: {
			navigationStyle: "custom"
		},
	})

	onLoad(() => {
		initScore();
	})

	const wallpaperStore = useWallpaperStore();


	const {
		list,
		currentIndex,
		currentWallpaper,
		total,
		scoredWallpaperList
	} =
		storeToRefs(wallpaperStore);

	const wallImageUrl = computed(() => {
		return list.value.map(({ _id, smallPicurl, description, classid, tabs, nickname, score }) => ({
			_id: _id,
			bigPicurl: smallPicurl.replace('_small.webp', '.jpg'),
			description,
			classid,
			tabs,
			nickname,
			score
		}))
	})


	const currentScoreRecord = computed(() => {
		const wallId = currentWallpaper.value?._id

		return scoredWallpaperList.value.find(
			item => item.id === wallId,
		)
	})
	const hasScored = computed(() => !!currentScoreRecord.value)


	let giveScore = ref(0);


	const currentPage = computed(() => {
		return `${currentIndex.value + 1} / ${total.value}`
	})

	const swiperChange = (event) => {
		wallpaperStore.setCurrentIndex(event.detail.current);
		initScore();
	}

	let showInfo = ref(true);

	let showInfoChange = () => {
		showInfo.value = !showInfo.value;
	}

	const showInfoDetail = () => {
		console.log('查看信息')
	}

	const toggleFavorite = () => {
		console.log('收藏')
	}

	const downloading = ref(false)

	const downloadWallPaper = async () => {
		if (downloading.value) return
		const picUrl = currentWallpaper.value.smallPicurl.replace(
			'_small.webp',
			'.jpg',
		)
		downloading.value = true;
		console.log('下载', picUrl)
		try {
			const permitted = await ensureAlbumPermission()
			if (!permitted) {
				return
			}

			const imageInfo = await uni.getImageInfo({
				src: picUrl
			})

			await uni.saveImageToPhotosAlbum({
				filePath: imageInfo.path
			})

			uni.showToast({
				title: '保存成功',
				icon: 'success',
			})

		} catch (error) {
			if(error && error.errMsg === 'saveImageToPhotosAlbum:fail cancel') {
				uni.showToast({
					title: '已取消下载',
					icon: 'none',
				})
			}else {
				uni.showToast({
					title: '保存失败，请稍后重试',
					icon: 'none',
				})
			}
			console.error('Save wallpaper failed:', error)

			
		} finally {
			downloading.value = false
		}

	}

	const ensureAlbumPermission = async () : Promise<boolean> => {
		const { authSetting } = await uni.getSetting({});
		const allowed = authSetting['scope.writePhotosAlbum']
		if (allowed) {
			return true
		}
		if (allowed === undefined) {
			try {
				await uni.authorize({
					scope: 'scope.writePhotosAlbum'
				})
				return true
			} catch {
				uni.showToast({
					title: '未获得相册权限,请先开启权限',
					icon: 'none'
				})
				return false
			}
		}

		// Previously denied: ask before opening settings.
		const { confirm } = await uni.showModal({
			title: '需要相册权限',
			content: '保存壁纸需要相册权限，请在设置中允许保存到相册。',
			confirmText: '去设置',
			cancelText: '取消',
		})


		if (!confirm) {
			return false
		}

		const settings = await uni.openSetting({})

		return settings.authSetting['scope.writePhotosAlbum'] === true
	}


	const infoPopup = ref(null);

	const infoScorePopup = ref(null);

	const openScorePop = () => {
		initScore();
		infoScorePopup.value.open();
	}

	const closeScorePop = () => {
		infoScorePopup.value.close();
	}

	const openPopup = () => {
		infoPopup.value.open()
	}

	const closePopup = () => {
		infoPopup.value.close()
	}

	let submiting = ref(false);

	const addScore = async () => {
		if (hasScored.value || submiting.value || !giveScore.value || !currentWallpaper.value) return;
		console.log("评分");
		const { _id, classid } = currentWallpaper.value;
		const score = giveScore.value;
		try {
			submiting.value = true;
			const result = await requestSetupScore(classid, _id, score);
			if (result.errCode === 0) {
				const storedData : StoredScoreResult = {
					id: _id,
					score
				}
				wallpaperStore.addScoredWallpaperList(storedData);
			}
		} finally {
			submiting.value = false;
			infoScorePopup.value.close();
		}

	}

	const initScore = () => {
		giveScore.value = currentScoreRecord.value?.score ?? 0
	}

	const downloadCurrentImage = () => {

	}
</script>

<style scoped lang="scss">
	.preview-page {
		width: 100%;
		height: 100vh;

		.infoScorePopup {
			background-color: #fff;
			padding: 30rpx;
			border-radius: 30rpx;
			overflow: hidden;
			width: 70vw;
			box-sizing: border-box;
			display: flex;
			flex-direction: column;
			align-items: center;
			gap: 30rpx;

			.scoreHeader {
				display: flex;
				justify-content: space-between;
				align-items: center;
				width: 100%;
			}

			.scoreContent {
				display: flex;
				align-items: center;
				gap: 30rpx;
			}
		}

		.infoPopup {
			background-color: #fff;
			padding: 30rpx;
			border-radius: 30rpx 30rpx 0 0;
			overflow: hidden;

			.popHeader {
				display: flex;
				justify-content: space-between;
				align-items: center;

				.title {
					font-size: 26rpx;
				}

				.close {
					padding: 6rpx;
				}
			}

			scroll-view {
				max-height: 50vh;

				.content {
					.row {
						display: flex;
						padding: 16rpx 0;
						font-size: 32rpx;
						line-height: 1.7em;
						gap: 20rpx;

						.label {
							color: lightgray;
							width: 140rpx;
							text-align: right;
							font-size: 30rpx;
						}

						.value {
							flex: 1
						}

						.rotebox {
							display: flex;
							align-items: center;

							.score {
								font-size: 26rpx;
								padding-left: 10rpx;
							}
						}

						.tabs {
							display: flex;
							flex-wrap: wrap;

							.tab {
								border: 1px solid #609C90;
								color: #609C90;
								font-size: 22rpx;
								padding: 5rpx 40rpx;
								border-radius: 40rpx;
								margin: 0 10rpx 10rpx 0;
							}
						}
					}

					.copyRight {
						padding: 30rpx;
						font-size: 28rpx;
						background: #F6F6F6;
						color: #666;
						border-radius: 10rpx;
						margin: 20rpx 0;
						line-height: 1.6em;
					}
				}
			}

		}

		.preview-info-bottom {
			position: absolute;
			left: 50%;
			bottom: 10%;
			transform: translateX(-50%);
			box-sizing: border-box;
			width: 480rpx;

			.info-bottom {
				color: white;
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 10rpx 55rpx;
				border-radius: 50rpx;
				box-sizing: border-box;
				background-color: lightgray;

				.info-item {
					display: flex;
					flex-direction: column;
					justify-content: center;
					gap: 15rpx;
					align-items: center;

					.icon-text {
						font-size: 50rpx;
					}
				}
			}
		}

		.preview-info-container {
			position: absolute;
			left: 50%;
			top: 15%;
			transform: translateX(-50%);
			z-index: 999;

			.info {
				display: flex;
				height: 20vh;
				flex-direction: column;
				justify-content: space-between;
				align-items: center;
				padding: 20rpx 20rpx;

				.info-top {
					display: flex;
					flex-direction: column;
					align-items: center;
					gap: 30rpx;

					.inco-top-count {
						padding: 8rpx 28rpx;
						background: rgba(0, 0, 0, 0.3);
						backdrop-filter: blur(20rpx);
						font-size: 28rpx;
						color: white;
						border-radius: 40rpx;
					}

					.inco-top-time {
						color: white;
						font-size: 100rpx;
						font-weight: 500;
					}

					.inco-top-date {
						color: white;
						font-size: 38rpx;
					}
				}


			}

		}

		.preview-container {
			width: 100%;
			height: 100%;
			position: relative;

			.preview-image {
				width: 100%;
				height: 100%;

				swiper {
					width: 100%;
					height: 100%;

					swiper-item {
						width: 100%;

						image {
							width: 100%;
							height: 100vh;
						}
					}
				}
			}
		}
	}
</style>