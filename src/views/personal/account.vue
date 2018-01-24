<!--我的账户-->

<template>
	<div class="content">
		<p class="p-head">欢迎，用户名</p>
		<div class="nav">
			<ul>
				<li>会员等级&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;&nbsp;{{level}}</li>
				<li>用户类型&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;&nbsp;{{type}}</li>
				<li>手机号码&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;&nbsp;{{mobile}}</li>
				<li>实名认证&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;&nbsp;<span v-show="isReal">已认证</span><el-button type="primary" @click="goAutonym"  v-show="!isReal">去认证</el-button></li>
			</ul>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				level:"试用会员",
				type:"个人",
				mobile:"18721267525",
				isReal:false,
			}
		},
		methods:{
			goAutonym(){
				this.$router.push({path:'/personal/autonym'})
			}
		}
	}
</script>

<style scoped>
	.content{
		padding: 30px;
	}
	.content .p-head{
		font-size: 20px;
		margin-bottom: 20px;
	}
	.content .nav{
		/*border: 1px #E3E7F1 solid;*/
		height: 500px;
	}
	.content .nav ul{
		font-size: 16px;
		width: 200px;
		margin: 0 auto;
		color: #666;
		padding-top: 30px;
	}
	.content .nav ul li{
		height: 30px;
		line-height: 30px;
		padding: 15px 0;
		margin-bottom: 25px;
	}
	.content .nav ul li .realSpan{
		display: inline-block;
		border: 1px #0BB1FF solid;
		padding: 0 10px;
	}
</style>