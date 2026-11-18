// src/store/wallpaper.ts
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type { StoredScoreResult, SortDetail } from '@/types/xxm/xxxType'


export const useWallpaperStore = defineStore('wallpaper',()=> {
	// state
	const list = ref<SortDetail[]>([]);
	const currentIndex = ref<number>(0);
	
	
	// getter
	const currentWallpaper = computed(()=> {
		return list.value[currentIndex.value];
	})
	const total = computed<number>(()=>list.value.length);
	
	const scoredWallpaperList = ref<StoredScoreResult[]>([]);
	//actions
	function setList(data:SortDetail[]) {
		list.value = data;
		currentIndex.value = 0
	}
	
	function setCurrentIndex(index:number) {
		currentIndex.value = index
	}
	
	function addScoredWallpaperList(data:StoredScoreResult) {
		scoredWallpaperList.value.push(data);
	}
	
	 return {
	    list,
	    currentIndex,
	    currentWallpaper,
	    total,
	    setList,
	    setCurrentIndex,
		addScoredWallpaperList,
		scoredWallpaperList
	  }
},{
    persist: true,
  })