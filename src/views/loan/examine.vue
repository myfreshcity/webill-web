<!--业务员审查-->

<template>
	<div class="content">
	    <p class="p-head">业务员审查</p>
	    <div v-if="step1">
			<p class="p-nav">请输入客户身份证号进行查询</p>
			<p class="p-nav">身份证号：<el-input class="nav-input"></el-input></p>
			<p class="p-nav"> <el-button type="primary" @click="examine">下一步</el-button></p>
		</div>
		<div v-if="step2" class="step2-div">
			<p class="step2-p1">客户姓名——身份证号</p>
			<ul class="step2-ul">
				<li class="li-head"><span>申请借款日期</span><span>借款金额</span><span>申请状态</span></li>
				<li><span>2018-05-01</span><span>8000</span><span>通过</span></li>
				<li><span>2018-05-01</span><span>8000</span><span>待审核</span></li>
				<li><span>2018-05-01</span><span>8000</span><span>查看拒绝原因</span></li>
			</ul>
			<p class="step2-p2">客户没有历史借贷记录</p>
			<p class="step2-p2"><el-button  @click="goBack">返回</el-button><el-button type="primary" @click="nextStep">下一步</el-button></p>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				step1:true,
				step2:false,
			}
		},
		methods:{
			examine(){
				this.step1=false
				this.step2=true
			},
			goBack(){
				this.step1=true
				this.step2=false
			},
			nextStep(){
				this.$router.push({path:'/loan/loanApply'})
			}
		}
	}
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
	.step2-div{
		width: 100%;
	}
	.step2-p1{
		padding-top: 30px;
		padding-left: 30px;
		font-size: 20px;
	}
	.step2-p2{
		font-size: 20px;
		text-align: center;
		margin-bottom: 30px;
	}
	.step2-ul{
		margin: 0 auto;
		margin-top: 30px;
		margin-bottom: 10px;
		padding: 50px;
	}
	.step2-ul li{
		display: flex;
		border: 1px #E3E7F1 solid;
		border-top:none ;
		border-right:none ;
	}
	.step2-ul .li-head{
		border-top: 1px #E3E7F1 solid;
	}
	.step2-ul li span{
		padding: 15px 0px;
		text-align: center;
		flex: 1;
		font-size: 18px;
		border-right: 1px #E3E7F1 solid;
	}
</style>