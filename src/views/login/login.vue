<template>
	<div class="content">
		<div class="head">
			<span class="head-left">微账房</span>
		</div>
		<!--<div class="box2">
			<p class="box2-p1">无忧放贷、尽在掌握</p>
			<p class="box2-p2">一站式解决贷前、贷中、贷后管理</p>
		</div>-->
		<div class="box">
			<div class="loginTab">
				<div class="login-p" @click="changeTab(1)" :class="{'p-active':passwordLogin}">
					<span>密码登录</span>
				</div>
				<span class="line"></span>
				<div class="login-t" @click="changeTab(2)" :class="{'t-active':!passwordLogin}">
					<span>快捷登录</span>
				</div>
			</div>
			<div class="nav">
				<p class="p-tel"><input placeholder="请输入手机号" v-model="mobileNo" maxlength="11" @blur="onBlurMobile"/><img src="../../../static/images/login/qingchu.png" v-show="mobileNoClear" @click="clearMobile()"/></p>
				<p class="p-password" v-show="passwordLogin">
					<input placeholder="密码6-20位、字母组合" v-if="passwordShow" type='text' v-model="password" maxlength="20" @blur="onBlurPassword">
					<input placeholder="密码6-20位、字母组合" v-if="!passwordShow" type='password' v-model="password" maxlength="20" @blur="onBlurPassword">
					<span @click="showPassword()">
						<img src="../../../static/images/login/mimakejian.png"  v-show="passwordShow"/>
						<img src="../../../static/images/login/mimabukejian.png" v-show="!passwordShow"/>
					</span>
					<img src="../../../static/images/login/qingchu.png" v-show="passwordClear" @click="clearPassword()"/>
				</p>
				<p class="p-code" v-show="!passwordLogin"><input placeholder="请输入短信验证码" v-model="code" maxlength="6" @blur="onBlurCode"/><span @click="getCode()">{{codeText|msgTime}}</span><img src="../../../static/images/login/qingchu.png" v-show="codeClear" v-on:click="clearCode()"/></p>
			</div>
			<el-button type="primary" style="width:80%;" :loading="loading" @click.native.prevent="login()">
                                  登录
            </el-button>
            <p class="p-forget" v-show="passwordLogin"><span @click="goRegister()" class="span-left">注册新用户</span><span @click="forgetPassword()" class="span-right">忘记密码？</span></p>
			<!--<button class="btn-password" v-show="passwordLogin" @click="loginP()" :disabled="disabled" :class="{'btn-active':!disabled}" >会员登录</button>-->
			<!--<button class="btn-msg" v-show="!passwordLogin" @click="loginM()" :disabled="disabled" :class="{'btn-active':!disabled}">会员登录</button>-->
	    </div>
	</div>
</template>

<script>
	import Cookies from 'js-cookie'
    import md5 from 'js-md5';
	export default {
		 data(){
		  	return{
		  		title:"会员登录",
		  		disabled:true,
		  		mobile:"18888888888",
		  		code:"",
		  		codeText:"获取验证码",
		  		disabled1:true,
		  		showTip:false,
		  		message:"",
		  		passwordShow:false,
		  		passwordLogin:true,
		  		password:"a111111",
		  		mobileNo:"18888888888",
		  		passwordClear:false,
		  		mobileNoClear:false,
		  		codeClear:false,
		  		openId:"",
		  		loginForm: {
			        username: 'admin',
			        password: '111111'
			    },
			    loading: false,
		  	}
		 },
		  filters: {
				  msgTime(data){
				  	if(typeof(data)=="number"){
				  		return data + "s后重发"
				  	}else{
				  		return data
				  	}
				  }
		  },
		  mounted:function(){
//		  	if(this.getLoginUser.openId){
//		  		this.openId=this.getLoginUser.openId
//		  	}
		//	sessionStorage.setItem('login',3);
		  },
		  beforeUpdate:function(){
		  	//检测每次的输入信息
		  	if(this.passwordLogin){
		  		const part1=/[0-9a-zA-Z]{6,20}/;
				const result1=part1.test(this.password);
				const part2=/^[1][3,4,5,7,8,9]\d{9}$/
				const result2=part2.test(this.mobileNo);
				if(!result1||!result2){
			  		this.disabled=true;
			  	}else{
			  		this.disabled=false;
			  	}
		  	}else{
				const part1=/^[1][3,4,5,7,8,9]\d{9}$/
				const result1=part1.test(this.mobileNo);
				const part2=/[0-9]{6}/;
				const result2=part2.test(this.code);
			  	if(!result1||!result2){
			  		this.disabled=true;
			  	}else{
			  		this.disabled=false;
			  	}
		  	}
		  },
		  watch: {
		     mobileNo:function(str){
		     	if(this.codeText=="获取验证码"){
		     		const part1=/^[1][3,4,5,7,8,9]\d{9}$/
				  	const result1=part1.test(str);
				  	if(result1){
				  		this.disabled1=false;
				  	}else{
				  		this.disabled1=true;
				  	}
		     	}
		     	if(str){
				  		this.mobileNoClear=true;
				  	}else{
				  		this.mobileNoClear=false;
				}
		     	
		     },
		     password:function(str){
				  	if(str){
				  		this.passwordClear=true;
				  	}else{
				  		this.passwordClear=false;
				  	}
		    },
		     code:function(str){
				  	if(str){
				  		this.codeClear=true;
				  	}else{
				  		this.codeClear=false;
				  	}
		    }
		  },
		  methods: {
		  	changeTab(index){
		  		if(index==1){
		  			this.passwordLogin=true
		  		}else{
		  			this.passwordLogin=false
		  		}
		  	},
		  	showPassword(){
		  		if(this.passwordShow){
		  			this.passwordShow=false
		  		}else{
		  			this.passwordShow=true
		  		}
		  	},
		  	onBlurPassword(){
		  		var _this=this
		  		 setTimeout(function(){
			  		_this.passwordClear=false
			  		_this.$forceUpdate() 
		         }, 200);
		  	},
		  	onBlurMobile(){
		  		var _this=this
		  		 setTimeout(function(){
			  		_this.mobileNoClear=false
			  		_this.$forceUpdate() 
		         }, 200);
		  	},
		  	onBlurCode(){
		  		 var _this=this
		  		 setTimeout(function(){
			  		_this.codeClear=false
			  		_this.$forceUpdate() 
		         }, 200);
		  	},
		  	clearPassword(){
		  		this.password=""
		  	},
		  	clearMobile(){
		  		this.mobileNo=""
		  	},
		  	clearCode(){
		  		this.code=""
		  	},
		  	forgetPassword(){
		  		this.$router.push({path:'/reset'})
		  	},
		  	goRegister(){
		  		 this.$router.push({path:'/register'})
		  	},
		  	login(){
		  		this.loading=true
		  		if(this.passwordLogin){
			  		 const part=/^(?!(?:\d*$))(?!(?:[a-zA-Z]*$))[A-Za-z0-9]{6,20}$/   //密码6-20位且为数字与字母组合
			  		 const result=part.test(this.password)
			  		 if(result){
			  		 	console.log(111)
			  		 	 Cookies.set('Admin-Token', "admin")
					     this.$router.push({ path: '/' })
				  		 const url=this.$backStage('/api/user/login')
					     this.$http.post(url,{"mobileNo":this.mobileNo,"password":md5(this.password),'checkFlag':"pwd"})
					      .then((response) => { 
					      	  this.loading=false
					          console.log(response)
					          Cookies.set('Admin-Token', 123456)
					          this.$router.push({ path: '/' })
					      }).catch(function(response){
				              this.loading=false
				          })
//							       this.$store.dispatch('Login', this.loginForm).then(() => {
//							       	    this.loading = false
//							            this.$router.push({ path: '/' })
//							          }).catch(() => {
//							            this.loading = false
//							          })
				      }else{
				      	this.$alert('密码格式不正确', '系统提示', {
					          confirmButtonText: '确定',
					    });
			  		  }
			     }else{
			     	const url=this.$backStage('/api/user/login')
							    this.$http.post(url,{"mobileNo":this.mobileNo,"inCode":this.code,'checkFlag':"quick"})
							      .then((response) => { 
							      	 this.loading=false
							          console.log(response)
							          if(response.data.status==200){
							          
							          }else{
							             
							          }
							      }).catch(function(response){
			                          this.loading=false
			                      })
			     }
		  	},
		  	getCode(){
		  		if(this.codeText=="获取验证码"&&!this.disabled1){
				      	this.$alert('验证码发送成功,请不要重复点击', '系统提示', {
					          confirmButtonText: '确定',
					    });
					    this.disabled1=true
							    const url=this.$backStage('/api/verifyCode/sendVerifyCode')
							    this.$http.post(url,{'mobile':this.mobileNo,'checkFlag':"quick"})
							    .then((response) => { 
							    	   console.log(response)
							    	   if(response.data.status==200){
							    		      let self = this
							    		      self.codeText=60
						                 const show=setInterval(function () {
						                 	  if(self.codeText=="获取验证码"){
						                 	  	        clearInterval(show)
						                 	  	        self.disabled1=false
						                 	  }else{
									               self.codeText -= 1
									               if(self.codeText==0){
										             	  clearInterval(show)
										             	  self.codeText="获取验证码"
										             	  self.disabled1=false
						                     }
									              }
						                 }, 1000)
							    	   }else if(response.data.status==400){
							    	   	
							          }else{
											     self.disabled1=false
							    	   }
			             }).catch(function(response){
			            
			             })
			       }
		  	},
		}
	}
</script>

<style scoped>
	.content{
		@include relative;
	    height: 100vh;
	    padding-top: 10%;
	    background:url(../../../static/images/login/bg.png);
	}
	.head{
		width: 100%;
		height: 50px;
		line-height: 50px;
		position: fixed;
		top: 0;
		left: 0;
		background: #fff;
	}
	.head .head-left{
		margin-left: 10%;
		font-size: 20px;
	}
	.box2{
		position: absolute;
		padding-top: 50px;
		top: 20%;
		left: 10%;
	}
	.box2-p1{
		font-size: 45px;
		color: #fff;
		margin-bottom: 50px;
	}
	.box2-p2{
		font-size: 33px;
		color: #fff;
	}
	.box{
		width: 400px;
		height: 500px;
		border: 1px #E3E7F1 solid;
		position: absolute;
		top: 20%;
		right: 10%;
		background: #fff;
	}
	.nav{
		padding-left: 30px;
		background: #fff;
	}
	.nav p{
		padding: 14px 0;
		height: 42px;
		position: relative;
		margin-bottom: 20px;
	}
	.loginTab{
		height: 58px;
		display: flex;
		background: #fff;
		padding-bottom: 1px;
		position: relative;
	}
	.loginTab:before{
		content: '';
		position: absolute;
		width: 200%;
		height: 1px;
		bottom: 0;
		border-bottom: 1px solid #DEEBE3;
		transform-origin: 0 0;
		transform: scale(.5,.5);
		box-sizing: border-box;
	}
	.loginTab .line{
		height: 20px;
		margin-top: 20px;
		position: relative;
	}
	.loginTab .line:before{
		content: '';
		position: absolute;
		width: 1px;
		height: 200%;
		right:0 ;
		border-right: 1px solid #DEEBE3;
		transform-origin: 0 0;
		transform: scale(.5,.5);
		box-sizing: border-box;
	}
	.loginTab div{
		color: #999;
		flex: 1;
		text-align: center;
		padding: 20px 0;
	}
	.loginTab .p-active{
		/*border-bottom: 2px #0BB1FF solid;*/
		color: #0BB1FF;
	}
	.loginTab .t-active{
		/*border-bottom: 2px #0BB1FF solid;*/
		color: #0BB1FF;
	}
	.nav p input{
		width: 90%;
		font-size: 14px;   
		outline: none;
		border: 1px #ccc solid;
		padding: 10px 8px;
	}
	.p-tel img{
		position: absolute;
		right: 50px;
		top: 25px;
		width: 16px;
		height: 16px;
	}
	.nav .p-password span{
		float: right;
		height: 20px;
		width: 20px;
		margin-right: 20px;
	}
	.nav .p-code span{
		position: absolute;
		right: 10%;
		top: 14px;
		text-align: center;
		color: #333;
		line-height: 39px;
		background: #D3D3D3;
		opacity: 1;
		padding-left: 10px;
		width: 120px;
		height: 38px;
		font-size: 14px;
	}
	.nav .p-code .time-active{
		opacity: 1;
	}
	.nav .p-code img{
		position: absolute;
		right: 140px;
		top: 25px;
		width: 16px;
		height: 16px;
	}
	.nav .p-code:before{
		border: none;
	}
	.nav .p-password span img{
		position: absolute;
		right: 50px;
		top: 29px;
		width: 18px;
		height: 10px;
	}
	.nav .p-password:before{
	   border:none;	
	}
	.p-password img{
		position: absolute;
		right: 80px;
		top: 25px;
		width: 16px;
		height: 16px;
	}
	button{
		width: 82%;
		height: 40px;
		text-align: center;
		background: #0BB1FF;
		display: block;
		margin: 0 auto;
		border: none;
		border-radius: 5px;
		color: #fff;
		margin-top: 45px;
		margin-bottom: 15px;
		outline:none;
		opacity: 1;
		font-size: 16px;
	}
	.btn-password{
		margin-top: 33px;
	}
	.btn-active{
		opacity: 1;
	}
	.p-login{
		color: #0BB1FF;
		text-align: center;
	}
	.p-forget{
		/*margin-top: 20px;*/
		font-size: 14px;
		padding:0 40px;
		color: #0BB1FF;
		padding-bottom: 20px;
		
	}
	.p-forget .span-left{
		color: #0BB1FF;
		float: left;
	}
	.p-forget .span-right{
		color: #999;
		float: right;
	}
</style>