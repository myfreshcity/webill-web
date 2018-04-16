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
	html,body,#app {height: 100%;min-width: 1200px;min-height: 600px;font-size: .16rem;}
	.client-table .cell{
		text-align: center;
	}
	.client-serach .dataInp .el-input__inner{
		padding-right: 0;
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
	.autoNav2 .el-form-item .el-form-item__label{
		width: 150px !important;
	}
	
	.nav3-span-right input{
		height: .4rem;
	}
	.nav3-span-right .el-input__prefix{
		height: .4rem;
		line-height: .4rem;
	}
	.nav3-span-right .el-radio-group .el-radio-button__inner{
		height: .4rem;
		line-height: .4rem;
		padding: 0 .1rem;
	}
	.nav3-span-right textarea{
		min-height: 0rem !important;
	}
</style>