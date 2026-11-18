<template>
	<view class="sort-detail-container">

		<!-- <view class="sort-image-grid-container">
			<view @click="gotoPreview" class="image-item" v-for='imgItem in sortDetailArr' :key="imgItem._id">
				<image :src="imgItem.smallPicurl" mode="aspectFill"></image>
			</view>
		</view> -->

		<view class="sort-image-grid-container">
			<template v-if="loading && sortDetailArr.length === 0">
				<view v-for="n in 9" :key="n" class="image-item">
					<wd-skeleton theme="image" animation="gradient" :row-col="[
		          { width: '100%', height: '430rpx', type: 'rect' }
		        ]" />
				</view>
			</template>

			<template v-else>
				<view v-for="(imgItem,index) in sortDetailArr" :key="imgItem._id" class="image-item"
					@click="gotoPreview(index)">
					<image :src="imgItem.smallPicurl" mode="aspectFill" />
				</view>
			</template>
		</view>

		<wd-loadmore :state="loadMoreState" loading-text="正在加载..." finished-text="没有更多壁纸了" />

	</view>
</template>

<script setup lang="ts">
	import { ref } from 'vue';
	import { requestSortDetail, requestMyDownloadOrScore } from '@/api/xxxApi'
	import type { SortDetail, PreviewDetail } from '@/types/xxm/xxxType';
	import { useWallpaperStore } from "@/store/wallpaper"

	const wallpaperStore = useWallpaperStore();

	definePage({
		style: {
			navigationStyle: 'default',
			navigationBarTitleText: '分类详情',
		}
	})

	let sortDetailArr = ref<SortDetail[]>([]);
	const defaultId = "652e519721821b97c60c07ab";
	let loading = ref<boolean>(false);
	const shareId = ref<string>('');
	const shareName = ref<string>('');
	const loadMoreState = computed<'loading' | 'finished' | undefined>(() => {
		if (loading.value) return 'loading'
		if (noMoreData.value) return 'finished'
		return undefined
	})

	const optionId = ref<string>("652e519721821b97c60c07ab");
	const source = ref<string>(null);
	onLoad(async (options) => {
		const id = options?._id
		source.value = options?.source;
		if (!(id || source.value)) {
			return
		}
		if (source.value) {
			const result = initMyScoreAndDownload(source.value);
			if (result) {
				await queryMyScoreAndDownload(source.value);
			}
			return;
		}

		optionId.value = id;
		shareName.value = options?.name || '分类详情'
		shareId.value = id;
		uni.setNavigationBarTitle({
			title: options?.name || '分类详情',
		})


		shareName.value = options?.name || '分类详情'
		shareId.value = id;

		try {
			await querySortDetail(id)
		}
		catch (error) {
			console.error('获取分类详情失败', error);
			loading.value = false;
			throw error;
		}
	})

	onReachBottom(async () => {
		if (loading.value || noMoreData.value) return
		try {
			if (source.value) {
				await queryMyScoreAndDownload(source.value);
			} else {
				await querySortDetail(optionId.value)
			}

		}
		catch (error) {
			console.error('加载下一页失败', error);
			throw error
		}
	})

	let pageNumber = ref<number>(1);
	let noMoreData = ref<boolean>(false);
	const querySortDetail = async (id : string) => {
		if (noMoreData.value || loading.value) {
			console.log("以达到最大数据")
			return;
		}
		try {
			loading.value = true;
			let result = await requestSortDetail(id, pageNumber.value);
			pageNumber.value++;
			if (result.data && result.data.length > 0) {
				sortDetailArr.value = [...sortDetailArr.value, ...result.data];

				// Fewer than 10 items means this is the last page.
				noMoreData.value = result.data.length < 10
			} else {
				if (sortDetailArr.value.length === 0) {
					loading.value = true;
					result = await requestSortDetail(defaultId, 1);
					sortDetailArr.value = result.data;
				} else {
					noMoreData.value = true;
				}
			}
			loading.value = false;
		} catch (error) {
			console.log("error", error)
		} finally {
			loading.value = false;
			wallpaperStore.setList(sortDetailArr.value);
		}
	}

	const gotoPreview = (index : number) => {
		wallpaperStore.setCurrentIndex(index)
		uni.navigateTo({
			url: '/pages/xianxiami/xxx-preview/xxx-preview'
		})
	}

	onShareAppMessage(() => {
		return {
			title: '分类分享',
			path: `/pages/xianxiami/xxx-sort-detail/xxx-sort-detail?_id=${encodeURIComponent(shareId.value)}&name=${encodeURIComponent(shareName.value)}`
		}
	})

	interface SourceItem {
		source : string;
		title : string;
	}

	const initMyScoreAndDownload = (source : string) : SourceItem | undefined => {
		const allowedSourceArr : SourceItem[] = [{
			source: "download",
			title: "我的下载"
		},
		{
			source: "score",
			title: "我的评分"
		}
		];

		const result = allowedSourceArr.find(item => item.source === source);
		if (result) {
			return result;
		} else {
			return null;
		}
	}

	const queryMyScoreAndDownload = async (source : string) => {
		try {
			const sourceItem = initMyScoreAndDownload(source);
			console.log("dddd", sourceItem)
			if (!sourceItem) {
				uni.showToast({
					title: "非法类型"
				});
				return;
			}
			let result = await requestMyDownloadOrScore(sourceItem.source, pageNumber.value);
			console.log("eeee", result)
			//
			pageNumber.value++;
			if (result.data && result.data.length > 0) {
				sortDetailArr.value = [...sortDetailArr.value, ...result.data];
			
				// Fewer than 10 items means this is the last page.
				noMoreData.value = result.data.length < 10
			} else {
				if (sortDetailArr.value.length === 0) {
					loading.value = true;
					result = await requestMyDownloadOrScore(sourceItem.source,pageNumber.value);
					sortDetailArr.value = result.data;
				} else {
					noMoreData.value = true;
				}
			}
			//
			uni.setNavigationBarTitle({
				title: sourceItem.title
			})
		}catch(error) {
			console.log("error:");
			pageNumber.value--;
		}
	}
</script>

<style scoped lang="scss">
	.sort-detail-container {
		padding: 0rpx 10rpx;

		.sort-image-grid-container {
			display: grid;
			grid-template-columns: repeat(3, minmax(0, 1fr));
			column-gap: 5rpx;
			row-gap: 20rpx;

			.image-item {
				// width: 240rpx;
				width: 100%;
				min-width: 0;
				height: 430rpx;

				image {
					width: 100%;
					height: 100%;
				}
			}
		}
	}
</style>