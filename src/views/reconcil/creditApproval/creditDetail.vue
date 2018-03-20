<!--减免详情-->

<!--对账详情-->

<template>
	<div class="content">
		<p class="title">
			协商金额审批详情
		</p>
		<div class="nav1">
			<ul>
				<li class="li-head"><span class="span-left">客户姓名</span><span class="span-right"></span></li>
				<li><span class="span-left">借款金额</span><span class="span-right"></span></li>
				<li><span class="span-left">总期数</span><span class="span-right"></span></li>
			</ul>
		</div>
		<div class="nav2">
			<ul>
				<li class="nav2-li-head"><span>应还日期</span><span>还款期数</span><span>应还本息</span><span>逾期天数</span><span class="nav2-span-right">实还金额</span></li>
			</ul>
		</div>
		<div class="nav1 nav3">
			<ul>
				<li class="li-head"><span class="span-left">申请状态</span><span class="span-right">待审批</span></li>
				<li><span class="span-left">协商金额</span><span class="span-right">1000</span></li>
				<li><span class="span-left">处理批注</span><span class="span-right">无</span></li>
				<li><span class="span-left">协商有效期</span><span class="span-right">2018-3-8</span></li>
				<li>
					<span class="span-left">审核操作</span>
					<span class="span-right">
					    <el-radio v-model="selectType" label="0">&nbsp;通过</el-radio>
					    <el-radio v-model="selectType" label="1">&nbsp;拒绝</el-radio>
					</span>
				</li>
			</ul>
			 <p class="nav3-sub"><el-button v-waves type="primary">提交</el-button></p>
		</div>
	</div>
</template>

<script>
	import waves from '@/directive/waves/index.js' // 水波纹指令
	export default {
		 directives: {
		    waves
		 },
		 data(){
			return {
				selectType:'0',    //协商金额
			}
		}
	}
</script>

<style>
	
	.title{
		height: .5rem;
		background:#ccc ;
		line-height: .5rem;
		padding-left: .3rem;
	}
	.nav1{
		padding: .3rem;
	}
	.nav1 ul{
		width: 80%;
		margin-top: .2rem;
		padding: .2rem;
	}
	.nav1 ul li{
		border: 1px #E3E7F1 solid;
		display: flex;
	    height: .5rem;
	    line-height: .5rem;
	    text-align: center;
	    border-top:none ;
	}
	.nav1 ul .li-head{
		border-top:1px #E3E7F1 solid ;
	}
	.nav1 ul li span{
		flex: 1;
	}
	.nav1 ul li .span-left{
		flex: .3;
		border-right:1px #E3E7F1 solid ;
		background: #eee;
	}
	.nav2{
		padding: .3rem;
	}
	.nav2 ul{
		width: 80%;
		margin-top: .2rem;
		padding: .2rem;
	}
	.nav2 ul li{
		display: flex;
		height: .5rem;
		line-height: .5rem;
		border: 1px #E3E7F1 solid;
		border-top:none ;
	}
	.nav2 ul .nav2-li-head{
		border-top: 1px #E3E7F1 solid;
		background: #eee;
	}
	.nav2 ul li span{
		flex:1;
		text-align: center;
		border-right:1px #E3E7F1 solid ;
	}
	.nav2 ul li .nav2-span-right{
		border-right: none;
	}
	
	.nav3 .work-input{
		width: 30%;
	}
	.nav3 .dataInp{
		width: 30%;
	}
	.nav3 .remark-input{
		width: 90%;
	}
	.nav3-sub{
		text-align: center;
	}
</style>