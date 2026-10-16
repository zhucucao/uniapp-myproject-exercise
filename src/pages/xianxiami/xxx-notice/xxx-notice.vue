<template>
	<view class="noticeContainer">
		<view class="noticePage">
			<view class="noticeTitle">
				<text class="noticeText">常见问题、自行排查</text>
			</view>
			<view class="noticeTime">
				<text>闲虾米</text>
				<uni-dateformat :date="Date.now()" format="yyyy-MM-dd hh:mm:ss"></uni-dateformat>
			</view>
			<view class="noticeContent">
				<view class="contentTitle">
					<text class="iconfont icon-guding guding"></text>
					<text class="gudingContent">壁纸是否可以免费使用?</text>
				</view>
				<view class="contentDetail">
					<text>“咸虾米壁纸”小程序/H5，内的所有图片均可免费下载，但是图片版权属于上传者或者图片来源作者，下载后仅可自己欣赏或个人使用，不能用作商业用途。</text>
				</view>
			</view>
			<view class="noticeContent">
				<view class="contentTitle">
					<text class="iconfont icon-guding guding"></text>
					<text class="gudingContent">下载壁纸提示请求频繁?</text>
				</view>
				<view class="contentDetail">
					<text>同一张壁纸，不能重复下载，防止有些用户误操作，重复对一张图片下载而浪费你的存储空间，也是为了防止被恶意频繁请求。</text>
				</view>
			</view>
			<view class="noticeContent">
				<view class="contentTitle">
					<text class="iconfont icon-guding guding"></text>
					<text class="gudingContent">进入图片预览后，大图无法展现?</text>
				</view>
				<view class="contentDetail">
					<text>有时壁纸会比较大，收到服务器带宽及你的网络环境影响，有时间加载会比较慢，需要用户耐心等待，或者返回上一层后重新进入再查看。</text>
				</view>
			</view>
			
			<view class="noticeContent">
				<view class="contentTitle">
					<text class="iconfont icon-guding guding"></text>
					<text class="gudingContent">如果你觉得图片侵权了?</text>
				</view>
				<view class="contentDetail">
					<text>图片来自于网络，由用户自行上传，所有监管不能
及时，如果被侵权了，请提供侵权证据，反馈给管理QQ:513894357，进行删除</text>
				</view>
			</view>
			
			<view class="noticeTotalCount">
				<text>阅读 486</text>
			</view>
		</view>
	</view>
</template>

<script setup>
	definePage({
	  style: {
	    navigationStyle: 'default',
	    navigationBarTitleText: '公告详情',
	  },
	})
</script>

<style lang="scss" scoped>
	.noticeContainer {
		width: 100%;
		height: 100vh;
		padding:30rpx;
		box-sizing: border-box;
		.noticePage {
			width: 100%;
			height: 100%;
			display: flex;
			flex-direction: column;
			gap:40rpx;
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
				gap:20rpx;
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
				color:lightgrey;
			}
			
		}
	}
</style>
