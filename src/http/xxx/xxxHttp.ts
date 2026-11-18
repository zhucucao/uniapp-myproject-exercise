
import type { HttpRequest, XxxApiResponse } from '@/types/xxm/xxxType';


const BASE_URL = "https://tea.qingnian8.com";



export function xxxRequest<T>(config : HttpRequest): Promise<XxxApiResponse<T>> {
	let { url, header,method,data } = config;
	// url = BASE_URL + url;
	// #ifdef H5
	url = import.meta.env.VITE_APP_PROXY_ENABLE === 'true'
	  ? import.meta.env.VITE_APP_PROXY_PREFIX + url
	  : BASE_URL + url
	// #endif
	
	// #ifndef H5
	url = BASE_URL + url
	// #endif
	return new Promise((resolve, reject) => {
		uni.request({
			url,
			method,
			header: {
			  ...header,
			  'access-key': '606966'
			},
			data: data ?? {},
			success(res) {
				const resData = res.data as XxxApiResponse<T>;
				if (resData.errCode === 0) {
					resolve(resData);
				} else if (resData.errCode === 400) {
					uni.showModal({
						title: "错误提示",
						content: resData.errMsg,
						showCancel: false
					})
					reject(resData)
				} else {
					uni.showToast({
						title: resData.errMsg,
						icon: "none"
					})
					reject(resData)
				}
			},
			fail(res) {
				uni.showToast({
					title: res.errMsg || "网络请求失败",
					icon: "none"
				})
				reject(res)
			}
		})
	})
}