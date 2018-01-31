<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>
<style>
	/*客户列表页面样式*/
	html,body,#app {height: 100%;min-width: 1100px;min-height: 600px;font-size: .16rem;}
	.client-table .cell{
		text-align: center;
	}
	/*#foot-page .el-pager li{
		border: 1px #ccc solid;
		border-radius: 5px;
		margin-right: 5px;
	}*/
	.client-steps .is-process{
		color: #ccc;
		border-color: #ccc;
	}
	.client-steps .is-process .is-text{
		/*border: none;*/
	}
	.client-serach{
		padding-left: 20px;
		padding-top: 10px;
	}
	#foot-page .el-pagination{
		margin-top: 20px;
		display: flex;
		justify-content:center;
	}
	
	/*报告页面样式*/
	.report-tabs .el-tabs__nav-wrap::after{
		display: none;
		height: 0;
	}
</style>