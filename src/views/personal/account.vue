<!--我的账户-->

<template>
	<div class="content">
		<p class="p-head">我的数据</p>
		<div class="nav">
			<ul class="dataMsg-ul">
				<li class="li1">
					<p class="p1">客户信息基础版</p>
					<p class="p2">剩余次数：{{user.standardTimes}}次<span @click="toBuy(0)">购买</span></p>
				</li>
				<li>
					<p class="p1">客户信息标准版</p>
					<p class="p2">剩余次数：{{user.advancedTimes}}次<span @click="toBuy(1)">购买</span></p>
				</li>
			</ul>
			<ul class="userMsg-ul">
				<li>用户手机&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;&nbsp;{{user.mobileNo}}</li>
				<li>用户类型&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;&nbsp;{{type}}</li>
				<li>用户等级&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;&nbsp;{{level}}</li>
				<li>真实姓名&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;&nbsp;{{user.realName}}<span v-show="isReal" class="userMsg-ul-span1">已认证</span><span v-show="!isReal" class="userMsg-ul-span2" @click="goAutonym()">未认证</span></li>
			</ul>
		</div>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'
	import { getLoginUser } from '@/utils/utils'
	import { getToken } from '@/utils/auth' // 验权
	import Cookies from 'js-cookie'
	export default{
		data(){
			return{
				level:"试用会员",
				type:"个人",
				mobile:"18721267525",
				isReal:true,
				realName:"张亚东",
				user:{}
			}
		},
		mounted:function(){
			const _this=this
			if(_this.userInfo.mobileNo){
				 const url=_this.$backStage('/api/user/getUserById/'+_this.userInfo.id)
					     this.$http.get(url)
					      .then((response) => { 
					          if(response.data.status==200){
					             _this.$store.dispatch('UserInfo', response.data.obj)
					             _this.user=_this.userInfo
								 if(_this.user.isVerified==0){
									_this.isReal=false
								 }else{
									_this.isReal=true
								 }
					          }else{
					          	_this.$alert("获取用户信息有误", '系统提示', {
							          confirmButtonText: '确定',
							        });
					          }
					         
					      }).catch(function(response){
				             _this.$alert("获取用户信息有误", '系统提示', {
							          confirmButtonText: '确定',
							});
				})
				
			}  else{
          	 if (getToken()) {
    	         const url=_this.$backStage('/api/user/login')
					     _this.$http.post(url,{"mobileNo":Cookies.get("_wibn"),"password":Cookies.get("_wibp"),'checkFlag':"pwd"})
					      .then((response) => { 
					          if(response.data.status==200){
					             _this.$store.dispatch('UserInfo', response.data.obj)
					             _this.user=_this.userInfo
								 if(_this.user.isVerified==0){
									_this.isReal=false
								 }else{
									_this.isReal=true
								 }
					          }else{
					          	_this.$alert("登录信息有误，请退出后重新登录", '系统提示', {
							          confirmButtonText: '确定',
							        });
					          }
					         
					      }).catch(function(response){
				             _this.$alert("登录信息有误，请退出后重新登录", '系统提示', {
							          confirmButtonText: '确定',
							        });
				        })
             }
          }
		},
		methods:{
			goAutonym(){
				this.$router.push({path:'/personal/autonym'})
			},
			toBuy(index){
				this.$store.dispatch('MsgType', index)
				this.$router.push({path:'/personal/buyData'})
			}
		},
		 computed: {
		    ...mapGetters([
		      'userInfo'
		    ])
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
	
	.content .nav .dataMsg-ul{
		width: 80%;
		display: flex;
		margin-bottom: .8rem;
	}
	.content .nav .dataMsg-ul li{
		padding: .3rem;
		flex: 1;
		border: 1px #E3E7F1 solid;
		height: 1.5rem;
	}
	.content .nav .dataMsg-ul .li1{
		margin-right:1rem ;
	}
	.content .nav .dataMsg-ul  li .p1{
		font-size: .2rem;
		margin-bottom: .3rem;
	}
	.content .nav .dataMsg-ul  li .p2{
		text-align: center;
		position: relative;
	}
	.content .nav .dataMsg-ul  li span{
		background: #0BB1FF;
		color: #fff;
		padding: .1rem .2rem;
		position: absolute;
		right: .2rem;
		top: -.1rem;
		font-size: .16rem;
	}
	.content .nav .userMsg-ul{
		width: 80%;
		border: 1px #E3E7F1 solid;
		padding: .3rem;
		padding-bottom: 0;
	}
	.content .nav .userMsg-ul li{
		margin-bottom: .5rem;
	}
	.content .nav .userMsg-ul li .userMsg-ul-span1{
		margin-left: .2rem;
		margin-right: .2rem;
		color: #3cc477;
	}
	.content .nav .userMsg-ul li .userMsg-ul-span2{
		color: red;
	}
</style>