<template>
	<view class="page">
		<view class="header"> 
			<view class="header-title">uni-app 生命周期</view>
			<view class="header-desc">页面生命周期可视化 Demo</view>
		</view>
		
		<view class="status-card">
		
			<view class="status-left">
				<view class="status-dot">
					
				</view>
				
				<view>
					<view class="status-title">
						页面显示中
					</view>
					<view class="status-desc">
						当前页面状态
					</view>
				</view>
			</view>
			
			<view class="status-count">
				{{logs.length}}
			</view>
		</view>
		
		<view class="section-title">
			生命周期
		</view>
		
	<view class="life-list">
	  <view
	    v-for="item in lifeList"
	    :key="item.name"
	    class="life-item"
	  >
	    <view
	      class="life-icon"
	      :class="item.className"
	    >
	      {{ item.icon }}
	    </view>
	
	    <view class="life-content">
	      <view class="life-name">
	        {{ item.name }}
	      </view>
	
	      <view class="life-desc">
	        {{ item.desc }}
	      </view>
	    </view>
	  </view>
	</view>
	
	<view class="section-title">
		测试操作
	</view>
	
	
	<view class="section-operation">
		<view class="operation-common operation-detail">
			<button @click="gotoDetail">进入详情页</button>
		</view>
		
		<view class="operation-common operation-clear">
			<button @click="clearLog">清空日志</button>
		</view>
	</view>
	
	<view class="section-log">
		<view class="section-log-left">
			生命周期日志
		</view>
		<view class="section-log-right">{{logs.length}}</view>
	</view>
	
	<view class="section-log-detail">
		<view v-if="logs.length ==0" class="empty">
			暂无内容
		</view>
		<view class="section-log-detail-item" v-for="(log,index) in logs" :key="log.logsIndex">
			<view class="log-item-number">
				{{log.logsIndex}}
			</view>
			
			<view class="log-item-content">
				<view class="log-content-desc">
					{{log.name}}
				</view>
				<view class="log-content-time">
					{{log.time}}
				</view>
			</view>
		</view>
	</view>
	
	</view>
	

</template>

<script setup>
import {
  onLoad,
  onShow,
  onReady,
  onHide,
  onUnload,
  onPullDownRefresh,
  onReachBottom
} from '@dcloudio/uni-app'
	const lifeList = reactive([
	{
	  name: 'onLoad',
	  desc: '页面加载，适合接收参数、初始化数据',
	  icon: 'L',
	  className: 'blue'
	},
	{
	  name: 'onShow',
	  desc: '页面每次显示都会触发',
	  icon: 'S',
	  className: 'green'
	},
	{
	  name: 'onReady',
	  desc: '页面首次渲染完成',
	  icon: 'R',
	  className: 'purple'
	},
	{
	  name: 'onHide',
	  desc: '页面被其他页面遮住',
	  icon: 'H',
	  className: 'orange'
	},
	{
	  name: 'onUnload',
	  desc: '页面关闭、销毁',
	  icon: 'U',
	  className: 'red'
	}
	]);
	
	const logs = ref([]);
	
	const clearLog = (()=> {
		logs.value = [];
		logsIndex.value = 0;
	})
	
	let logsIndex = ref(0);
	
	const  addLog  = (name) => {
		const date = new Date();
		const time = [
		  String(date.getHours()).padStart(2, '0'),
		  String(date.getMinutes()).padStart(2, '0'),
		  String(date.getSeconds()).padStart(2, '0')
		].join(':');
		logsIndex.value++;
		logs.value.unshift({
			logsIndex: logsIndex.value,
			name,
			time
		});
		console.log(`[生命周期 ${name}] - ${time}`)
	}
	
	const gotoDetail = ()=> {
		uni.navigateTo({
			url:'/pages/exercise/unilifeCycle/customUniLife/customUniLifeDetail?id=111'
		})
	}
	
	onLoad((options)=> {
		addLog("onload")
	})
	
	onShow(()=> {
		addLog("onshow")
	})
	
	onReady(()=> {
		addLog("onReady")
	})
	onHide(()=> {
		addLog("onHide");
	})
	onUnload(()=> {
		addLog("onunload")
	})
	
	onReachBottom(() => {
	  addLog('onReachBottom')
	})
	
</script>

<style scoped lang="scss">
	page {
	  background: #f5f6fa;
	}
	
	.page {
		min-height: 100vh;
		padding: 30rpx;
		box-sizing: border-box;
	}
	
	.header{
		padding:35rpx 10rpx 30rpx;
	}
	
	.header-title {
		font-size: 46rpx;
		font-weight: 700;
		color: #1f2937;
	}
	
	.header-desc {
		margin-top: 12rpx;
		font-size: 26rpx;
		color: #9ca3af;
	}
	
	.status-card {
		margin-top: 20rpx;
		// border:1px solid red;
		padding:35rpx 30rpx 35rpx;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		background-color: white;
		border-radius: 30rpx;
	}
	.status-left {
		display: flex;
		flex-direction: row;
		align-items: center;
	}
	.status-dot {
		width: 26rpx;
		height: 26rpx;
		background: #22c55e;
		border-radius: 50%;
		box-shadow: 0 0 0 10rpx rgba(34, 197, 94, 0.15);
		margin-right: 25rpx;
	}
	
	.status-title {
		font-size: 30rpx;
		font-weight: 700;
		color: #1f2937;
	}
	
	.status-desc {
		font-size: 20rpx;
		color: #9ca3af;
		margin-top: 10rpx;
	}
	
	.status-count {
		min-width: 70rpx;
		height: 70rpx;
		display: flex;
		justify-content: center;
		align-items: center;

		padding: 0 18rpx;
		
		font-size: 28rpx;
		font-weight: 700;
		
		color: #4f46e5;
		background: #eef2ff;
		
		border-radius: 18rpx;
	}
	
	.section-title {
		margin-top: 40rpx;
		font-weight: 600;
		margin-left: 10rpx;
	}
	
	.life-list {
		overflow: hidden;
		background: #ffffff;
		border-radius: 24rpx;
		box-shadow: 0 12rpx 40rpx rgba(0, 0, 0, 0.04);
	}
	
	.life-item {
		display: flex;
		align-items: center;
		padding: 28rpx 30rpx;
		border-bottom: 1rpx solid #f0f1f5;
	}
	
	
	.life-item:last-child {
		border-bottom: none;
	}

	.life-icon {
	  display: flex;
	  align-items: center;
	  justify-content: center;
	
	  width: 78rpx;
	  height: 78rpx;
	
	  margin-right: 24rpx;
	
	  border-radius: 22rpx;
	
	  font-size: 30rpx;
	  font-weight: 700;
	}
	
	
.life-icon.blue {
  color: #2563eb;
  background: #eff6ff;
}

.life-icon.green {
  color: #16a34a;
  background: #f0fdf4;
}

.life-icon.purple {
  color: #7c3aed;
  background: #f5f3ff;
}

.life-icon.orange {
  color: #ea580c;
  background: #fff7ed;
}

.life-icon.red {
  color: #dc2626;
  background: #fef2f2;
}
	
	.life-content {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
	
	.life-name {
		font-size:18px;
		font-weight: 600;
		margin-bottom: 5px;
	}
	
	.life-desc {
		font-size: 15px;
		color:lightgray;
	}
	
	.section-title {
		
	}
	
	.section-operation {
		display:flex;
		align-items: center;
		margin-top: 30rpx;
		gap:50rpx;
	}
	
	.operation-common {
	  flex: 1;
	  border-radius: 25rpx;

	  button {
		padding: 10rpx;
		border: none;
		background: transparent;
		font-size: 14px;
		&::after {
		  border: none;
		}
	  }
	}
	
	.operation-detail {
	
		background-color: #2563eb;
		button {
			color:white;
		}
	}
	
	.operation-clear {
		background-color: white;
	}
	
	.section-log {
		padding:20rpx 10rpx 20rpx;
		display: flex;
		margin-top: 20rpx;
		justify-content: space-between;
		align-items: center;
	}
	
	.section-log-left {
		font-size: 18px;
		font-weight: 700;
	}
	.section-log-right {
		color:lightgray;
	}
	
	.section-log-detail {
		background-color: black;
		color:white;
		padding:20rpx 30rpx 20rpx;
		border:1px solid black;
		border-radius: 20rpx;
		min-height: 100px;
	}
	
	.section-log-detail-item {
		display:flex;
		gap:50rpx;
		align-items: center;
		padding-bottom:20rpx;
		margin-bottom:10px;
		border-bottom: 1px solid lightgray;
	}
	
	.log-item-number {
		width: 30px;
		height: 30px;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-left: 5px;
		background-color: #4f46e5;
		border:1px ;
		border-radius: 10rpx;
	}
	
	.log-content-desc {
		font-size: 18px;
	}
	.log-content-time {
		color:lightgray;
	}
	
	.empty {
		display: flex;
		justify-content: center;
		align-items: center;
	    min-height: 200rpx;
	}
	
	
	
	
</style>
