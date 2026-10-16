<template>
	<xxx-custom-navbar title="虾米壁纸a" :placeholder="false" :showBack="true"></xxx-custom-navbar>
<!-- 	<xxx-common-mynavbar></xxx-common-mynavbar> -->
	<view class="preview-page" @click="showInfoChange">
		<view class="preview-container">
			<view class="preview-image">
				<swiper circular="true" indicator-dots="true" indicator-color="white" @change="swiperChange"
					:duration="500" :circular="true">
					<swiper-item v-for="(item ,index) in totalPage">
						<image src="/src/static/wallpaper/preview1.jpg" mode="aspectFill" />
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
						<text>{{giveScore}}分</text>
					</view>
					<view class="info-item" @click="downloadWallPaper">
						<view class="iconfont icon-xiazai  icon-text"></view>
						<text>下载</text>
					</view>
				</view>
			</view>

			<view @click.stop>
				<uni-popup ref="infoPopup" type="bottom">
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
									<text selectable class="value">123131231</text>
								</view>
								<view class="row">
									<view class="label">发布者:</view>
									<text selectable class="value">小咪想吃鱼</text>
								</view>

								<view class="row">
									<view class="label">评分:</view>
									<view class='value rotebox'>
										<uni-rate readonly :value="3.5"></uni-rate>
										<text class="score">3.5分</text>
									</view>
								</view>
								<view class="row">
									<view class="label">标签:</view>
									<view class='value tabs'>
										<view class="tab">美女</view>
										<view class="tab">黑丝</view>
										<view class="tab">长发</view>
									</view>
								</view>


								<view class="copyRight">
									<text>声明:本图片来自网络、如有侵权，联系xxxxxxxxxxxxxxxxxxxxxxxx</text>
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
							<uni-rate v-model="giveScore" allow-half></uni-rate>
							<text>{{giveScore}}分</text>
						</view>
						
						<view class="scoreFooter">
							<button plain type="default" size="mini" @click="addScore" :disabled="!giveScore">确认评分</button>
						</view>
					</view>
				</uni-popup>
			</view>

		</view>
	</view>
</template>

<script setup>
	definePage({
		style: {
			navigationStyle: "custom"
		},
	})

	let totalPage = ref(3);
	
	let giveScore = ref(0);


	const currentPage = ref(`1 / ${totalPage.value}`)

	// onReady(() => {
	// currentPage = 	`1 / ${totalPage.value}`
	// })

	const swiperChange = (event) => {
		const swiperCurrent = event.detail.current

		currentPage.value =
			`${swiperCurrent + 1} / ${totalPage.value}`
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

	const downloadWallPaper = () => {
		console.log('下载')
	}


	const infoPopup = ref(null);
	
	const infoScorePopup = ref(null);
	
	const openScorePop = ()=> {
		infoScorePopup.value.open();
	}
	
	const closeScorePop = ()=> {
		infoScorePopup.value.close();
	}

	const openPopup = () => {
		infoPopup.value.open()
	}

	const closePopup = () => {
		infoPopup.value.close()
	}
	
	const addScore = ()=> {
		console.log("评分");
		infoScorePopup.value.close();
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
			gap:30rpx;
			.scoreHeader {
				display: flex;
				justify-content: space-between;
				align-items: center;
				width: 100%;
			}
			
			.scoreContent {
				display: flex;
				align-items: center;
				gap:30rpx;
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