<!--等待页面-->

<template>
	<div class="content">
		<el-steps :active="active"  align-center  class="client-steps">
		  <el-step title="创建客户"></el-step>
		  <el-step title="完善基本信息"></el-step>
		  <el-step title="填写运营商服务密码"></el-step>
		</el-steps>
		<div class="nav">
			<p class="p-load" v-loading="loading">
				
			</p>
			<p class="p1">客户信息获取中</p>
			<p class="p2">由于运营商不稳定获取信息需等待1-5分钟</p>
			<p>
				<el-button @click="goClient" class="subPwd">继续创建</el-button>
			    <el-button type="primary" @click="goList()">返回列表</el-button>
			</p>
		</div>
    </div>
</template>

<script>
	export default{
		data(){
			return{
				loading:true,
				active: 3,
			}
		},
		methods:{
			goClient(){
				this.$router.push({path:'/client/newClient'})
			},
			goList(){
				this.$router.push({path:'/client/clientList'})
			}
		}
		
	}
</script>

<style scoped>
	.content{
		padding: 0 200px;
	    padding-top: 80px;
	}
	.nav{
		margin: 0 80px;
		margin-top: 50px;
		height: 600px;
		border:1px #E3E7F1 solid;
	}
	.nav p{
		text-align: center;
	}
	.nav .p-load{
		height: 100px;
	}
	.nav .p1{
		font-size: 20px;
		color: #333;
		margin-bottom: 30px;
	}
	.nav .p2{
		font-size: 14px;
		color: #666;
		margin-bottom: 30px;
	}
</style>