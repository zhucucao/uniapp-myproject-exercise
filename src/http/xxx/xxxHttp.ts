
interface httpRequest {
	url : string,
	header: Object,
	data? : Object
}

const BASE_URL = "https://tea.qingnian8.com"; 

export function xxxRequest(config:httpRequest)  {
	let {url,header} = config;
	
 	return new Promise((resolve,reject)=> {
		uni.request({
			url:'',
			header: {
				
			},
			data : {
				
			},
			success() {
				
			},
			fail() {
				
			}
		})
	})
}