import { defineStore } from "pinia";
import { ref } from "vue";
import { CommonUtil } from '@wot-ui/ui'


interface SearchHistoryType {
	id : string,
	content : string
}

export const useSearchHistoryStore = defineStore('searchHistory',()=> {
	const searchHistoryList = ref<SearchHistoryType[]>([]);
	
	
	const addSearchHistory = (content:string) => {
		const data : SearchHistoryType  = {
			  id:  CommonUtil.uuid(),
			  content
		}
		searchHistoryList.value = searchHistoryList.value.filter( item => item.content != content);
	    searchHistoryList.value.unshift(data);
		searchHistoryList.value = searchHistoryList.value.slice(0, 10);
	}
	
	const removeAllSearchHistory = ()=> {
		searchHistoryList.value = [];
	}
	
	const removeSearchHistory = (id:string)=> {
		searchHistoryList.value = searchHistoryList.value.filter(
		        item => item.id !== id
		    );
	}
	
	return {
		searchHistoryList,
		addSearchHistory,
		removeAllSearchHistory,
		removeSearchHistory
	}
},{
	 persist: true,
})