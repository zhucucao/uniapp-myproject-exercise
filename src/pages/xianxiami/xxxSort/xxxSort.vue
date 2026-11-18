<template>
	<xxx-custom-navbar title="自定义分类"></xxx-custom-navbar>
	<view class="sort-page common-background-color">
		<view class="sort-container">
			<xxx-common-pic v-for="item in imageBigClassifyArr" :item="item" :key="item._id"></xxx-common-pic>
		</view>
	</view>
</template>

<script setup lang="ts">
	definePage({
		style: {
			navigationStyle: "custom"
		},
	})
	import { requestBigClassify } from '@/api/xxxApi'
	import type { BigClassify } from '@/types/xxm/xxxType';
	onMounted(() => {
		queryBigClassify();
	})
	let imageBigClassifyArr = ref<BigClassify[]>([]);
	// 专题精选
	const queryBigClassify = async () => {
		const result = await requestBigClassify();
		imageBigClassifyArr.value = result.data;
	}
</script>

<style lang="scss" scoped>
	.sort-page {
		padding: 30rpx
	}

	.sort-container {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 20rpx
	}
</style>