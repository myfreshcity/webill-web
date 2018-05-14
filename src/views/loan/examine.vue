<!--业务员审查-->

<template>
	<div class="content">
		<p class="p-head">业务员审查</p>
		<p class="p-nav">请输入客户身份证号进行查询</p>
		<p class="p-nav">身份证号：<el-input class="nav-input"></el-input></p>
		<p class="p-nav"> <el-button type="primary" >下一步</el-button></p>
	</div>
</template>

<script>
</script>

<style scoped>
	.p-head{
		height: 60px;
		line-height: 60px;
		font-size: 24px;
		background: #eee;
		padding-left: 20px;
		color: #666;
	}
	.p-nav{
		text-align: center;
		font-size: 18px;
		margin-top: 80px;
	}
	.p-nav .nav-input{
		width: 200px;
	}
</style>