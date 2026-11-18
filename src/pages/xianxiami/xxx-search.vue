
<template>
	<view class="searchContainer">
		<view class="pageContainer">
			<!-- 搜索框 -->
			<view class="searchView">
				<wd-search
					class="searchView"
					:focus="searchFocused"
					variant="light"
					v-model="keyword"
					focus-when-clear
					:maxlength="20"
				>
					<template #suffix>
						<view class="searchBtn" @click="handleSearch">
							搜索
						</view>
					</template>
				</wd-search>
			</view>

			<!-- 最近搜索 -->
			<view class="searchHistoryContainer">
				<view class="historyTextContainer">
					<view class="recentSearchText">最近搜索</view>
					<view class="deleteBtn">
						<wd-button
							type="info"
							variant="light"
							size="small"
							icon="delete"
							@click="handleDelete"
						/>
					</view>
				</view>

				<view class="historyContent">
					<wd-tag
						v-for="item in searchHistoryList"
						:key="item.id"
						@close="tagRemove(item.id)"
						closable
						variant="light"
						@click="handleTagSearch(item.content)"
						round
					>
						{{ item.content }}
					</wd-tag>
				</view>
			</view>

			<!-- 热门搜索 -->
			<view class="hotSearchContainer">
				<view class="hotTextContainer">
					<view class="hotSearchText">热门搜索</view>
				</view>

				<view class="hotSearchTagContainer">
					<wd-tag type="default" variant="light" round @click="handleTagSearch('ggbond')">ggbond</wd-tag>
					<wd-tag type="default" variant="dark" round @click="handleTagSearch('美女')">美女</wd-tag>
					<wd-tag type="default" variant="plain" round @click="handleTagSearch('帅哥')">帅哥</wd-tag>
					<wd-tag type="default" variant="dashed" round @click="handleTagSearch('宠物')">宠物</wd-tag>
					<wd-tag type="default" variant="text" round @click="handleTagSearch('卡通')">卡通</wd-tag>
				</view>
			</view>

			<!-- 搜索结果 -->
			<view class="searchResultContainer">
				<view
					class="searchImageView"
					v-for="(item, index) in searchResultList"
					:key="index"
				>
					<image
						mode="aspectFill"
						:src="item.smallPicurl"
					/>
				</view>
			</view>

			<!-- 首次搜索加载 -->
			<view v-if="searchLoading" class="statusContainer">
				<wd-loading />
			</view>

			<!-- 分页加载中 -->
			<wd-loadmore
				v-if="hasData && loadingMore"
				state="loading"
			/>

			<!-- 没有更多数据 -->
			<wd-loadmore
				v-else-if="hasData && !hasMore && !loadMoreError"
				state="finished"
			/>

			<!-- 分页加载失败，点击重试 -->
			<view
				v-else-if="hasData && loadMoreError"
				class="loadError"
				@click="loadMoreData"
			>
				加载失败，点击重试
			</view>

			<!-- 搜索失败 -->
			<view
				v-if="searchError && !searchLoading"
				class="noMoreContainer"
				@click="handleSearch"
			>
				<wd-icon name="refresh" size="24px" />
				<text>搜索失败，点击重试</text>
			</view>

			<!-- 搜索无结果 -->
			<view
				class="noMoreContainer"
				v-else-if="hasSearched && !searchLoading && !hasData && !searchError"
			>
				<wd-icon name="no-result" size="24px" />
			</view>
		</view>
	</view>
</template>

<script setup lang="ts">
import { useSearchHistoryStore } from "@/store/searchHistory";
import { storeToRefs } from "pinia";
import { requestSearchResult } from "@/api/xxxApi";
import type { DayRecommendImage } from "@/types/xxm/xxxType";

// ==================== 常量 ====================

// 每页请求数量，需要与后端分页配置保持一致
const PAGE_SIZE = 9;


// ==================== 搜索状态 ====================

// 搜索关键词
const keyword = ref<string>("");

// 搜索框聚焦状态
const searchFocused = ref<boolean>(false);

// 当前页码
const pageNumber = ref<number>(1);

// 搜索结果
const searchResultList = ref<DayRecommendImage[]>([]);

// 是否已经执行过搜索
const hasSearched = ref<boolean>(false);

// 是否有搜索结果
const hasData = computed(() => {
	return searchResultList.value.length > 0;
});

// 首次搜索是否正在加载
const searchLoading = ref<boolean>(false);

// 首次搜索是否失败
const searchError = ref<boolean>(false);


// ==================== 分页状态 ====================

// 是否还有更多数据
const hasMore = ref<boolean>(false);

// 是否正在加载下一页
const loadingMore = ref<boolean>(false);

// 分页请求是否失败
const loadMoreError = ref<boolean>(false);


// ==================== 请求标识 ====================

// 用于避免旧搜索请求覆盖新搜索结果
let searchRequestId = 0;


// ==================== Pinia ====================

const searchHistoryStore = useSearchHistoryStore();

const { searchHistoryList } = storeToRefs(searchHistoryStore);

const {
	addSearchHistory,
	removeSearchHistory,
	removeAllSearchHistory
} = searchHistoryStore;


// ==============tag 搜索============================

const  handleTagSearch = async(targetValue) => {
	if(!targetValue) {
		return 
	}
	keyword.value = targetValue;
	handleSearch();
}


// ==================== 首次搜索 ====================

const handleSearch = async () => {

	const query = keyword.value.trim();

	// 关键词校验
	if (!query) {
		return;
	}

	// 创建新的请求标识
	const requestId = ++searchRequestId;

	// 重置搜索状态
	pageNumber.value = 1;
	hasMore.value = false;
	loadingMore.value = false;
	loadMoreError.value = false;

	searchResultList.value = [];

	hasSearched.value = true;
	searchError.value = false;
	searchLoading.value = true;

	try {

		// 请求第一页
		const result = await requestSearchResult(query, 1);

		// 如果已经发起了新的搜索，忽略旧请求
		if (requestId !== searchRequestId) {
			return;
		}

		const data = result.data ?? [];

		// 保存搜索结果
		searchResultList.value = data;

		// 判断是否还有下一页
		hasMore.value = data.length >= PAGE_SIZE;

		// 保存搜索历史
		addSearchHistory(query);

		// 重新聚焦搜索框
		searchFocused.value = false;

		setTimeout(() => {
			searchFocused.value = true;
		}, 200);

	} catch (error) {

		if (requestId === searchRequestId) {
			console.error("搜索失败：", error);

			searchError.value = true;

			uni.showToast({
				title: "搜索失败",
				icon: "none"
			});
		}

	} finally {

		// 避免旧请求影响新请求的加载状态
		if (requestId === searchRequestId) {
			searchLoading.value = false;
		}
	}
};


// ==================== 加载下一页 ====================

const loadMoreData = async () => {

	// 基础条件校验
	if (
		!keyword.value.trim() ||
		!hasMore.value ||
		loadingMore.value ||
		searchLoading.value
	) {
		return;
	}

	// 记录当前搜索请求标识
	const requestId = searchRequestId;

	// 下一页页码
	const nextPage = pageNumber.value + 1;

	loadingMore.value = true;
	loadMoreError.value = false;

	try {

		// 请求下一页
		const result = await requestSearchResult(
			keyword.value.trim(),
			nextPage
		);

		// 如果用户已经重新搜索，忽略旧分页请求
		if (requestId !== searchRequestId) {
			return;
		}

		const data = result.data ?? [];

		// 合并搜索结果
		searchResultList.value = [
			...searchResultList.value,
			...data
		];

		// 请求成功后才更新页码
		pageNumber.value = nextPage;

		// 判断是否还有下一页
		hasMore.value = data.length >= PAGE_SIZE;

	} catch (error) {

		if (requestId === searchRequestId) {
			console.error("加载更多失败：", error);

			loadMoreError.value = true;

			uni.showToast({
				title: "加载失败，请重试",
				icon: "none"
			});
		}

	} finally {

		// 只修改当前搜索对应的加载状态
		if (requestId === searchRequestId) {
			loadingMore.value = false;
		}
	}
};


// ==================== 触底加载 ====================

onReachBottom(() => {
	console.log("chudichudichudichudichudichudi")
	loadMoreData();
});


// ==================== 搜索历史 ====================

// 清空搜索历史
const handleDelete = () => {
	removeAllSearchHistory();
};

// 删除单条搜索历史
const tagRemove = (id: string) => {
	removeSearchHistory(id);
};

</script>

<style lang="scss" scoped>
.searchContainer {
	width: 100%;
	box-sizing: border-box;
	min-height: 100vh;
}

.pageContainer {
	width: 100%;
	padding: 10rpx 30rpx;
	box-sizing: border-box;

	.searchView {
		width: 100%;
		box-sizing: border-box;
		border-radius: 20rpx;

		.searchBtn {
			background-color: lightblue;
			padding: 10rpx 20rpx;
			border-radius: 20rpx;
			font-size: 16rpx;
			text-align: center;
		}
	}

	.searchHistoryContainer {
		width: 100%;
		box-sizing: border-box;
		margin-top: 20rpx;

		.historyTextContainer {
			display: flex;
			justify-content: space-between;
			align-items: center;
			box-sizing: border-box;

			.recentSearchText {
				font-size: 30rpx;
				font-weight: 600;
			}

			.deleteBtn {
				--wot-button-info-color: green;
				--wot-button-info-color-active: #555;
				--wot-button-size-icon-small: 46rpx;
			}
		}

		.historyContent {
			width: 100%;
			margin-top: 20rpx;
			display: flex;
			flex-direction: row;
			gap: 20rpx;
			flex-wrap: wrap;

			--wot-tag-info-light-bg: #f5f5f5;
			--wot-tag-info-color: #222;
			--wot-tag-default-font-size: 26rpx;
			--wot-tag-default-round-padding: 10rpx 24rpx;
		}
	}

	.hotSearchContainer {
		width: 100%;
		box-sizing: border-box;
		margin-top: 40rpx;

		.hotTextContainer {
			font-size: 30rpx;
			font-weight: 600;
		}

		.hotSearchTagContainer {
			margin-top: 20rpx;
			box-sizing: border-box;
			width: 100%;
			display: flex;
			gap: 20rpx;

			--wot-tag-info-light-bg: #f5f5f5;
			--wot-tag-info-color: #222;
			--wot-tag-default-font-size: 26rpx;
			--wot-tag-default-round-padding: 10rpx 24rpx;
		}
	}

	.searchResultContainer {
		width: 100%;
		margin-top: 30rpx;
		box-sizing: border-box;
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 10rpx;

		.searchImageView {
			width: 100%;
			box-sizing: border-box;

			image {
				width: 100%;
				box-sizing: border-box;
			}
		}
	}

	.statusContainer {
		display: flex;
		justify-content: center;
		padding: 30rpx 0;
	}

	.loadError {
		text-align: center;
		padding: 30rpx 0;
		color: #999;
		font-size: 26rpx;
	}

	.noMoreContainer {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 10rpx;
		padding: 30rpx 0;
		color: #999;
		font-size: 26rpx;
	}
}
</style>
