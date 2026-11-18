
import {xxxRequest} from '@/http/xxx/xxxHttp'
	import type { BannerItem, CommonTextItem, DayRecommendImage,BigClassify
	,SortDetail,SetUpScoreResult,UserInfo,MyScoreDownload ,NoticeDetail} from '@/types/xxm/xxxType';
// 获取轮播图
export function requestBannerList() {
  return xxxRequest<BannerItem[]>({
    url: '/api/bizhi/homeBanner'
  });
}
// 公告
export function requestNoticeList() {
	return xxxRequest<CommonTextItem[]>({
		url : '/api/bizhi/wallNewsList',
		data: {
			pageSize: 5
		}
	})
}
// 每日推荐
export function requestDailyRecommend() {
	return xxxRequest<DayRecommendImage[]>({
		url : '/api/bizhi/randomWall',
	})
}
// 搜索
export function requestSearchResult(keyword:string,pageNum:number) {
	return xxxRequest<DayRecommendImage[]>({
		url : '/api/bizhi/searchWall',
		data : {
			keyword,
			pageNum,
			pageSize:9
		}
	})
}


// 专题分类
export function requestBigClassify() {
	return xxxRequest<BigClassify[]>({
		url: '/api/bizhi/classify',
		data: {
			select:false
		}
	})
}

//  分类详情列表
export function requestSortDetail(classId:string,pageNumber:number) {
	return xxxRequest<SortDetail[]>({
		url: '/api/bizhi/wallList',
		data: {
			pageNum: pageNumber,
			classid:classId,
			pageSize : 10
		}
	})
}

// 评分
export function requestSetupScore(classid:string,wallId:string,userScore:number) {
	
	return xxxRequest<SetUpScoreResult>({
		url : '/api/bizhi/setupScore',
		data : {
			classid,
			wallId,
			userScore
		}
	})
}

// 个人信息
export function requestPersonalInfo() {
	return xxxRequest<UserInfo>({
		url : '/api/bizhi/userInfo'
	})
}

// 我的下载/评分

export function requestMyDownloadOrScore(type:string,pageNumber:number) {
	return xxxRequest<MyScoreDownload[]>({
		url : '/api/bizhi/userWallList',
		data : {
			type,
			pageNumber,
			pageSize:10
		}
	})
}


// 公告详情

export function requestNoticeDetail(id:string) {
	return xxxRequest<NoticeDetail>({
		url : '/api/bizhi/wallNewsDetail',
		data : {
			id
		}
	})
}