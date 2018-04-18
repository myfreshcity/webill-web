<template>
  <div class="dashboard-container">
    <!--<div class="dashboard-text">name:{{name}}</div>
    <div class="dashboard-text">role:<span v-for='role in roles' :key='role'>{{role}}</span></div>-->
    <!--<p class="p-head">欢迎使用微账房</p>-->
    <div class="head">
    	<span class="head-left"><img src="../../../static/images/logo/logo.png"/></span>
    	<ul class="right-title">
      	<li class="li-active" @click="goAccount">{{userInfo.mobileNo}}</li>
      	<li class="line">|</li>
      	<li class="li-active" @click="goReport">报告模板</li>
      	<li class="line">|</li>
      	<li @click="logout" class="li-active">退出</li>
      </ul>
    </div>
    <div class="nav">
    	 <p class="p1"><span class="span-left"></span>让您的每一笔业务都"有据"可依<span class="span-right"></span></p>
    	 <ul class="nav-ul1">
    	 	   <li>
    	 	   	<dl>
    	 	   		<dt><img src="../../../static/images/welcome/wel1.png"/></dt>
    	 	   		<dd>
    	 	   		   <p class="nav-ul1-p1">基本信息核查</p>
    	 	   		   <p>对客户姓名、身份证号、手机号、地址及联系人号码多维度验真，核查客户申请资料真实性</p>
    	 	   		</dd>
    	 	   	</dl>
    	 	   </li>
    	 	   <li>
    	 	   	<dl>
    	 	   		<dt><img src="../../../static/images/welcome/wel2.png"/></dt>
    	 	   		<dd>
    	 	   		   <p class="nav-ul1-p1">信用风险检测</p>
    	 	   		   <p>整合权威数据源，查询客户通话黑名单信息及金融机构的通话信息，全面评估客户信用风险</p>
    	 	   		</dd>
    	 	   	</dl>
    	 	   </li>
    	 	   <li class="nav-li-right">
    	 	   	<dl>
    	 	   		<dt><img src="../../../static/images/welcome/wel3.png"/></dt>
    	 	   		<dd>
    	 	   		   <p class="nav-ul1-p1">催收风险分析</p>
    	 	   		   <p>依托运营商数据，查询客户催收信息及疑似催收信息，帮助分析客户催收风险</p>
    	 	   		</dd>
    	 	   	</dl>
    	 	   </li>
    	 </ul>
    	  <ul class="nav-ul1 nav-ul2">
    	 	   <li>
    	 	   	<dl>
    	 	   		<dt><img src="../../../static/images/welcome/wel4.png"/></dt>
    	 	   		<dd>
    	 	   		   <p class="nav-ul1-p1">多平台借贷检测</p>
    	 	   		   <p>通过跨平台联动机制，识别多平台借贷的高风险客户</p>
    	 	   		</dd>
    	 	   	</dl>
    	 	   </li>
    	 	   <li class="nav-li-right">
    	 	   	<dl>
    	 	   		<dt><img src="../../../static/images/welcome/wel5.png"/></dt>
    	 	   		<dd>
    	 	   		   <p class="nav-ul1-p1">数据基本统计</p>
    	 	   		   <p>联系人区域汇总及长时间联系人、高频联系人统计展示</p>
    	 	   		</dd>
    	 	   	</dl>
    	 	   </li>
    	 </ul>
    	 <span class="span-btn">
    	 	<el-button  @click="goTemplate" class="btn1">查看样例</el-button>
				<el-button  type="primary" @click="toBegin" class="btn2">马上体验</el-button>
    	 </span>
    </div>
    <vefoot></vefoot>
  </div>
</template>

<script>
import Vefoot from '@/components/Vefoot'
import { mapGetters } from 'vuex'
import { getToken } from '@/utils/auth'
import Cookies from 'js-cookie'
import md5 from 'js-md5';
export default {
	components: { Vefoot },
  name: 'dashboard',
  mounted:function(){
//	if (getToken()) {
//  	         const url=this.$backStage('/api/user/login')
//  	         const _this=this
//					     _this.$http.post(url,{"mobileNo":Cookies.get("_wibn"),"password":Cookies.get("_wibp"),'checkFlag':"pwd"})
//					      .then((response) => { 
//					      	  console.log(response)
//					          if(response.data.status==200){
//					          	 Cookies.set('Admin-Token', "admin",7)
//					          	 Cookies.set('_wibn',response.data.obj.mobileNo,7 )
//					          	 Cookies.set('_wibp',response.data.obj.password,7 )
//					             this.$store.dispatch('UserInfo', response.data.obj)
//					             if(response.data.obj.realName){
//					             	this.$router.push({ path: '/client/clientList' })
//					             }
//					          }else{
//					          	_this.$alert("登录信息有误，请退出后重新登录", '系统提示', {
//							          confirmButtonText: '确定',
//							        });
//					          }
//					         
//					      }).catch(function(response){
//				             _this.$alert("登录信息有误，请退出后重新登录", '系统提示', {
//							          confirmButtonText: '确定',
//							        });
//				        })
//  }else{
//  	this.$router.push({ path: '/login/login' })
//  }
//  if(this.userInfo.realName){
//					this.$router.push({ path: '/client/clientList' })
//		}
  },
  methods:{
  	goTemplate(){
  		this.$router.push({path:'/template/temPageBase'})
  	},
  	toBegin(){
  		this.$router.push({path:'/client/newClient'})
  	},
  	logout() {
      this.$store.dispatch('LogOut').then(() => {
        location.reload() // 为了重新实例化vue-router对象 避免bug
      })
    },
    goReport(){
    	this.$router.push({path:'/template/temPageBase'})
    },
    goAccount(){
    	this.$router.push({path:'/personal/account'})
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'roles',
      'userInfo'
    ])
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard-container{
	background: url(../../../static/images/welcome/welcomebg.png) no-repeat;
	background-position: center .7rem; 
	background-size:100% 100%; 
	position: absolute;
	top: 0px;
	left: 0px;
	right: 0;
	bottom: 0;
	z-index: 10000;
}
.head{
		width: 100%;
		height: .7rem;
		line-height: .7rem;
		position: fixed;
		top: 0;
		left: 0;
		background: #fff;
	}
	.head .head-left{
		display: inline-block;
		margin-left: 18%;
		font-size: .2rem;
		height: .7rem;
		width: 1.25rem;
	}
	.head .head-left img{
		width: 100%;
		height: 100%;
	}
	.right-title{
		float: right;
		outline: none;
		margin-right: 10%;
		height: .7rem;
		line-height: .7rem;
}
.right-title li{
	float: left;
}
.right-title .line{
	padding: 0 20px;
}
.right-title .li-active:hover{
	color: #409EFF;
}
	.nav .p1{
		text-align: center;
		font-size: .42rem;
		margin-top: 1.2rem;
		color: #fff;
		margin-bottom: 1.66rem;
	}
	.nav .span-left{
		display: inline-block;
		border-top: 2px #fff solid;
		width: 1.74rem;
		height: .18rem;
		margin-right: .2rem;
	}
	.nav .span-right{
		display: inline-block;
		border-top: 2px #fff solid;
		width: 1.74rem;
		height: .18rem;
		margin-left: .2rem;
	}
	.nav-ul1 {
		width: 960px;
		margin: 0 auto;
	  overflow: hidden;
	}
	.nav-ul1 li{
		float: left;
		width: 240px;
		margin-right: 120px;
	  margin-bottom: .5rem;
	}
	.nav-ul2 li{
		margin-right: 160px;
	}
	.nav-ul2{
		width: 960px;
		padding: 0 160px;
	}
	.nav-ul1 .nav-li-right{
		margin-right: 0;
	}
	
	.nav-ul1 dt{
		margin-bottom: .24rem;
	}
	.nav-ul1 dt img{
		display: block;
		width: 52px;
		height: 62px;
		margin: 0 auto;
	}
	.nav-ul1 dd{
		text-align: center;
		font-size: 14px;
		color: #fff;
		line-height: 16px;
	}
	.nav-ul1 dd .nav-ul1-p1{
		font-size: 18px;
		margin-bottom: .16rem;
	}
	.span-btn{
		width: 1000px;
		text-align: center;
		position: absolute;
		bottom: 1rem;
		left: 50%;
		margin-left: -500px;
	}
	.span-btn .btn1{
		background: none;
		color: #fff;
		border-radius: .33rem;
		/*width: 1.4rem;*/
		margin-right: .3rem;
	}
	.span-btn .btn2{
		/*width: 1.4rem;*/
		border-radius: .33rem;
	}
</style>
