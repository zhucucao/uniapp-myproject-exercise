<template>
	<view class="page-container">
		<view class="page">
			<view class="seg-container">
				 <uni-segmented-control :current="current" :values="items" @clickItem="onClickItem" activeColor="#4cd964">
				 </uni-segmented-control>
			</view>
			<view class="image-container">
				<view class="image-item" v-for="(imageObj,index) in picArr" :key="imageObj._id">
					<image class="image-pic" :src="imageObj.url"  mode="widthFix" @click="previewImage(index)"/>
					<view class="image-content">{{imageObj.content }}</view>
					<view  class="author-item">
						<view>
							---{{imageObj.author}}
						</view>
					</view>
				</view>
			</view>
			<view class="fixedBtn">
				<view class="fix refresh" @click="refreshImage()">
					<uni-icons type="refresh" size="36"></uni-icons>
				</view>
				<view class="fix" @click="toTop">
					<uni-icons type="arrow-up" size="30"></uni-icons>
				</view>
				
			</view>
		</view>
	</view>
</template>

<script setup>
import { reactive } from 'vue';

	let current = ref(0);
	
	const items = ['全部', '猫咪', '狗狗']

	let picArr = ref([
		
	])
	
	const petTypeArr = ["all","cat","dog"]
	
	const onClickItem = (e) => {
	  current.value = e.currentIndex
	   picArr.value = []
	  imageRequest();
	}
	
	const refreshImage = ()=> {
		uni.startPullDownRefresh();
	}
	
	const toTop = ()=> {
		uni.pageScrollTo({
			scrollTop:0,
			duration:100
		})
	}
	
	const previewImage = (index)=> {
		uni.previewImage({
			urls:picArr.value.map((item)=>item.url),
			current:index
		})
	}
	
	const imageRequest = ()=> {
		uni.request({
			url:"/tools/petShow",
			method:"GET",
			header: {
			    'access-key': '317383'
			},
			data : {
				size : 10,
				type : petTypeArr[current.value]
			},
			success:(res)=> {
				picArr.value = [...picArr.value,...res.data.data]	
				console.log("----",picArr);
			},
			 complete: () => {
			      uni.stopPullDownRefresh()
			}
		})
	}
	
	onReady(()=> {
		imageRequest();
	});
	
	onReachBottom(()=> {
		imageRequest();
	})
	
	onPullDownRefresh(()=> {
		console.log("-----=======")
		picArr.value = [];
		imageRequest()
	})
	
	
	
</script>

<style scoped lang="scss">
	page {
	}       
	
	
	.page-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding:50rpx;
		box-sizing: border-box;
		background-color: antiquewhite;
	}
	
	.page {
		width: 100%;
	}
	.image-container {
	}
	
	.image-content {
		padding-left: 20rpx;
	}
	
	.image-item {
		width: 100%;
		display:flex;
		flex-direction: column;
		box-sizing: border-box;
		gap:20rpx;
		margin-bottom: 30rpx;
		border:1px solid white;
		padding:10rpx;
		border-radius: 20rpx;
		background-color: white;
		image {
			width: 100%;
		};
	}
	
	.image-pic {
		width: 100px;
	}
	
	.author-item {
		display:flex;
		justify-content: flex-end;
		color:lightgray;
	}
	
	.fixedBtn {
		position: fixed;
		right: 40rpx;
		bottom: 100rpx;
		z-index: 999;
		height: 100rpx;
	}
	.fix {
	  width: 80rpx;
	  height: 80rpx;
	
	  display: flex;
	  justify-content: center;
	  align-items: center;
	
	  border: 1px solid black;
	  background-color: white;
	
	  border-radius: 50%;
	
	  box-sizing: border-box;
	}
	.refresh {
		margin-bottom: 20rpx;
	}
	.seg-container {
		width: 100%;
		height: 90rpx;
	}
	
</style>
