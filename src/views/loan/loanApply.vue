<!--贷款申请-->

<template>
	<div class="content">
		<p class="p-head"><el-button type="primary">贷款申请</el-button><el-button >未完成列表</el-button></p>
		<el-tabs v-model="activeName" type="card" @tab-click="handleClick">
		    <el-tab-pane label="借款信息" name="first"></el-tab-pane>
		    <el-tab-pane label="基本信息" name="second"></el-tab-pane>
		    <el-tab-pane label="联系人信息" name="third"></el-tab-pane>
		    <el-tab-pane label="资产信息" name="fourth"></el-tab-pane>
		    <el-tab-pane label="负债及银行信息" name="five"></el-tab-pane>
		</el-tabs>
		<!--借款信息-->
		<div v-if="navShow==1" class="nav nav1">
			<ul>
				<li>
					<span class="span-left">门店</span>
					<span class="span-right">
						 <el-select v-model="data1.shop" placeholder="请选择门店">
					        <el-option label="上海门店" value="0"></el-option>
					        <el-option label="苏州门店" value="1"></el-option>
					     </el-select>
					</span>
				</li>
				<li>
					<span class="span-left">中介</span>
					<span class="span-right">
						<el-input v-model="data1.agent" class="nav-input"></el-input>
					</span>
				</li>
				<li>
					<span class="span-left">借款金额</span>
					<span class="span-right">
						<el-input v-model="data1.loanMoney" class="nav-input"></el-input>
					</span>
				</li>
				<li>
					<span class="span-left">用途</span>
					<span class="span-right">
						<el-input v-model="data1.way" class="nav-input"></el-input>
					</span>
				</li>
			</ul>
			<p class="p-btn"><el-button type="primary" @click="nextStep(1)">下一步</el-button></p>
		</div>
		<!--基本信息-->
		<div v-if="navShow==2" class="nav2">
			<p class="p-title"><span class="span-line"></span>个人信息</p>
				<div class="nav-person">
					
				</div>
			<p class="p-title"><span class="span-line"></span>公司信息</p>
		</div>
		<!--联系人信息-->
		<div v-if="navShow==3">
			
		</div>
		<!--资产信息-->
		<div v-if="navShow==4">
			
		</div>
		<!--负债及银行信息-->
		<div v-if="navShow==5">
			
		</div>
	</div>
</template>

<script>
	 export default {
	    data() {
	      return {
	        activeName: 'first',
	        navShow:1,      //展示不同模块
	        step:1,         //模块是否能被看到
	        data1:{
	        	shop:"",    //门店
	        	agent:"",   //中介
	        	loanMoney:"",   //借款金额
	        	way:"",         //用途
	        }
	      }
	    },
	    methods: {
	      handleClick() {
	        console.log(this.activeName);
	        if(this.activeName=="first"){
	        	this.navShow=1
	        }else if(this.activeName=="second"){
	        	if(this.step>1){
	        		this.navShow=2
	        	}else{
	        	    this.$alert("请完善之前的信息", '系统提示', {
			                  confirmButtonText: '确定',
					});
					this.navShow=0
	        	}
	        }
	        else if(this.activeName=="third"){
	        	if(this.step>2){
	        		this.navShow=3
	        	}else{
	        	    this.$alert("请完善之前的信息", '系统提示', {
			                  confirmButtonText: '确定',
					});
					this.navShow=0
	        	}
	        }
	        else if(this.activeName=="fourth"){
	        	if(this.step>3){
	        		this.navShow=4
	        	}else{
	        	    this.$alert("请完善之前的信息", '系统提示', {
			                  confirmButtonText: '确定',
					});
					this.navShow=0
	        	}
	        }
	        else if(this.activeName=="five"){
	        	if(this.step>4){
	        		this.navShow=5
	        	}else{
	        	    this.$alert("请完善之前的信息", '系统提示', {
			                  confirmButtonText: '确定',
					})
	        	    this.navShow=0;
	        	}
	        }
	      },
	      nextStep(index){
	      	if(index==1){
	      		this.activeName='second',
	            this.navShow=2, 
	      		this.step=2
	      	}
	      }
	    }
	  }
</script>

<style scoped>
	.content{
		padding: 20px 20px;
	}
	.p-head{
		margin-bottom: 30px;
	}
	.nav1 ul{
		width: 100%;
		margin-top: 80px;
	}
	.nav1 ul li{
		width: 400px;
		margin: 0 auto;
		display: flex;
		height: 60px;
	}
	.nav1 ul li .span-left{
		flex: .5;
		line-height:45px;
	}
	.nav-input{
		width: 200px ;
	}
	.p-btn{
		text-align: center;
	}
	.span-line{
		float: left;
		width: 5px;
		height: 16px;
		background: #0BB1FF;
		margin-right: 5px;
	}
	.nav2 .p-title{
		font-size: 18px;
	}
	.nav-person{
		width: 100%;
		height: 500px;
		margin: 20px;
		border: 1px #E3E7F1 solid;
	}
</style>