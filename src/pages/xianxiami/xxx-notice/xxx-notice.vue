<template>
	<view class="noticeContainer">
		<view class="noticePage">
				<view class="noticeTitle">
					<text class="noticeText">{{defaultNotice.title}}</text>
				</view>
				<view class="noticeTime">
					<text>{{defaultNotice.author}}</text>
					<uni-dateformat :date="defaultNotice.publish_date" format="yyyy-MM-dd hh:mm:ss"></uni-dateformat>
				</view>
				<!-- <view class="noticeContent">
					<view class="contentTitle">
						<text class="iconfont icon-guding guding"></text>
						<text class="gudingContent">壁纸是否可以免费使用?</text>
					</view>
					<view class="contentDetail">
						<text>“咸虾米壁纸”小程序/H5，内的所有图片均可免费下载，但是图片版权属于上传者或者图片来源作者，下载后仅可自己欣赏或个人使用，不能用作商业用途。</text>
					</view>
				</view> -->
				
				<view class="noticeContent">
					<mp-html :content="defaultNotice.content"/>
				</view>

				<view class="noticeTotalCount">
					<text>{{defaultNotice.view_count}}</text>
				</view>
		</view>
	</view>
</template>

<script setup lang="ts">
	import { requestNoticeDetail } from '@/api/xxxApi'
	import type { NoticeDetail } from '@/types/xxm/xxxType';
	definePage({
		style: {
			navigationStyle: 'default',
			navigationBarTitleText: '公告详情',
		},
	})

	let defaultNotice = ref<NoticeDetail>(null);

	onLoad(async (option) => {
		const id = option?._id
		if (id) {
			defaultNotice.value = await queryNoticeDetail(id);
		}
	})

	const queryNoticeDetail = async (_id : string) => {
		return (await requestNoticeDetail(_id)).data;
	}
</script>

<style lang="scss" scoped>
	.noticeContainer {
		width: 100%;
		height: 100vh;
		padding: 30rpx;
		box-sizing: border-box;

		.noticePage {
			width: 100%;
			height: 100%;
			display: flex;
			flex-direction: column;
			gap: 40rpx;

			.noticeTitle {
				width: 100%;

				.noticeText {
					width: 100%;
					font-size: 40rpx;
					font-weight: 700;
				}
			}

			.noticeTime {
				width: 100%;
				display: flex;
				align-items: center;
				gap: 20rpx;
				font-size: 30rpx;
				color: lightgray;
			}

			.noticeContent {
				.contentTitle {
					font-size: 40rpx;

					.guding {
						color: red;
						font-size: 40rpx;
						margin-right: 5rpx;
					}

					.gudingContent {
						font-weight: 700;
					}
				}

				.contentDetail {
					margin-top: 5rpx;
				}

			}

			.noticeTotalCount {
				color: lightgrey;
			}

		}
	}
</style>