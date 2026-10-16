<template>
	<view class="sort-detail-container">
		<view class="sort-image-grid-container">
			<view @click="gotoPreview" class="image-item" v-for='imgItem in currentImgArr' :key="imgItem.id">
				<image :src="imgItem.imageUrl" mode="aspectFill"></image>
			</view>

		</view>
	</view>
</template>

<script setup lang="ts">
import { ref } from 'vue';

definePage({
  style: {
    navigationStyle: 'default',
    navigationBarTitleText: '分类详情',
  },
})

const gotoPreview = ()=> {
	uni.navigateTo({
		url:'/pages/xianxiami/xxx-preview/xxx-preview'
	})
}

	interface Props {
		type : string
	}
	
	const props = defineProps<Props>();
	
	const sortDetailImgArr = ref([
		{	
			id : 1,
			type : 'pet',
			imageArr : [ 
				{
					id : 1,
					imageUrl : '/static/images/xxm/classify1.jpg'
				},
				{
					id : 2,
					imageUrl : '/static/images/xxm/classify2.jpg'
				}
			]
		},
		{
			id : 2,
			type : 'girl',
			imageArr : [ 
				{
					id : 3,
					imageUrl : '/static/images/xxm/classify1.jpg'
				}
			]
		},
		
		{
			id : 3,
			type : 'sexy',
			imageArr : [ 
				{
					id : 4,
					imageUrl : '/static/images/avatar.jpg'
				},
				{
					id : 5,
					imageUrl : '/static/images/avatar.jpg'
				},
				{
					id : 6,
					imageUrl : '/static/images/avatar.jpg'
				},
				{
					id : 7,
					imageUrl : '/static/images/avatar.jpg'
				},
				{
					id : 8,
					imageUrl : '/static/images/xxm/classify2.jpg'
				},
				{
					id : 9,
					imageUrl : '/static/images/xxm/classify1.jpg'
				}
			]
		},
	])
	
	console.log("aaaa",props.type)
	
	const currentImgArr = sortDetailImgArr.value.find(item => item.type === props.type).imageArr;
</script>

<style scoped lang="scss">
	.sort-detail-container {
		padding:0rpx 10rpx;
		
		.sort-image-grid-container {
			display:grid;
			grid-template-columns: repeat(3,minmax(0, 1fr));
			gap:20rpx;
			.image-item {
				width: 240rpx;
				height: 430rpx;
				image {
					width: 100%;
					height: 100%;
				}
			}
		}
	}
</style>
