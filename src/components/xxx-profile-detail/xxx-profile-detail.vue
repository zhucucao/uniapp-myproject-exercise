<template>
	<view class="operation-container" @click="handleClick">
		<view class="operation-btn-container">
			<view class="left-operation icon-common-flex">
				<text :class="['iconfont' ,'icon-left-image',props.icon]"></text>
				<text>{{props.title}}</text>
			</view>
			<view class="right-operation icon-common-flex icon-right" 
			>
				<text v-if='props.value > 0' >{{props.value}}</text>
				<text class="iconfont icon-youjiantou"></text>
			</view>
			
			 <!-- 只在微信小程序中生成客服按钮 -->
			      <!-- #ifdef MP-WEIXIN -->
			      <button
			        v-if="props.type === 'kefu'"
			        class="kefu-cover-button"
			        open-type="contact"
			        hover-class="none"
			        @click.stop
			      />
			      <!-- #endif -->
			
			
		</view>
		
	</view>
</template>

<script setup lang="ts">

type OperationItem  = {
  id: number
  icon: string
  iconColor: string
  title: string
  value: number
  type: string
}
	
const props = withDefaults(defineProps<OperationItem>(),{
			id : 1,
			icon : 'icon-icon_386',
			iconColor : '#2DB18C',
			title : '我的下载',
			value : 10,
			type : 'download',
		}) ;
		
const emit = defineEmits<{
  (e: 'click-item', type: string): void
}>()

const handleClick = () => {
  emit('click-item', props.type)
}

</script>

<style scoped lang="scss">
	  .kefu-cover-button {
	    position: absolute;
	    z-index: 10;
	    top: 0;
	    right: 0;
	    bottom: 0;
	    left: 0;
	
	    width: 100%;
	    height: 100%;
	    margin: 0;
	    padding: 0;
	
	    opacity: 1;
	    background: transparent;
	    border: none;
		// background-color: #2DB18C;
	
	    &::after {
	      border: none;
	    }
	  }
	
	.operation-container {
		position: relative;
		padding: 30rpx;
		box-sizing: border-box;

		.operation-btn-container {
			display: flex;
			justify-content: space-between;
			align-items: center;

			.icon-left-image {
				font-size: 40rpx;
				color: #2DB18C;
			}

			.icon-right {
				color: #ACACAC;
			}
		}
	}

	.icon-common-flex {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 20rpx
	}
</style>