<!--新建客户-->

<template>
	<div class="content">
		<el-steps :active="active"  align-center  class="client-steps">
		  <el-step title="创建客户"></el-step>
		  <el-step title="完善基本信息"></el-step>
		  <el-step title="填写运营商服务密码"></el-step>
		</el-steps>
		<div class="nav1"  v-show="step1">
			<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" label-position="left">
			  <el-form-item label="姓名" prop="name">
			    <el-input v-model="ruleForm.name" class="nav-input"></el-input>
			  </el-form-item>
			  <el-form-item label="身份证" prop="idCard">
			    <el-input v-model="ruleForm.idCard" class="nav-input"></el-input>
			  </el-form-item>
			  <el-form-item label="手机号" prop="mobile">
			    <el-input v-model="ruleForm.mobile" class="nav-input"></el-input>
			  </el-form-item>
			   <el-form-item>
			    <el-button type="primary" @click="submitForm('ruleForm')" class="subPwd" :loading="loading1">下一步</el-button>
			  </el-form-item>
			</el-form>
		</div>
		
		<div class="nav2 nav3"  v-show="step2">
			<p class="add-p"><span>添加地址信息</span></p>
			<div class="nav3-form">
				<span class="nav3-span">工作地址</span><el-cascader
				    placeholder="请选择省市区"
				    :options="options"
				    filterable
				    v-model="workSpace"
				>
				</el-cascader><br  />
			    <el-input v-model="workAddress" class="work-input" placeholder="详细到门牌号"></el-input><br />
			    <span class="nav3-span">家庭地址</span><el-cascader
				    placeholder="请选择省市区"
				    :options="options"
				    filterable
				    v-model="homeSpace"
				>
				</el-cascader><br  />
			    <el-input v-model="homeAddress" class="work-input" placeholder="详细到门牌号"></el-input>
			</div>
		</div>
		<div class="nav2"  v-show="step2">
			<p class="add-p"><span>添加联系人信息</span><span class="add-span" @click="addRel">继续添加 <svg-icon icon-class="add" /></span></p>
			<ul v-show="!addRelShow" class="relList-ul">
				<li v-for="(ele,k) in relationList"><span>{{ele.contactType|relationFilter}}</span><span>{{ele.name}}</span><span class="relList-ul-span1">{{ele.mobileNo}}</span><span class="svg-span" @click="redactRel(ele,k)"><svg-icon icon-class="redact" /></span><span class="svg-span svg-span2" @click="removeRel(k)"><svg-icon icon-class="remove" /></span></li>
			</ul>
			<el-form :model="relForm" :rules="rules" ref="relForm" label-width="90px" class="demo-ruleForm" label-position="left" v-show="addRelShow">
			   <el-form-item label="关系" prop="relation">
			    <el-select v-model="relForm.relation" placeholder="请选择与本人关系">
			      <el-option label="配偶" value="0"></el-option>
			      <el-option label="父母" value="1"></el-option>
			      <el-option label="兄弟姐妹" value="2"></el-option>
			      <el-option label="子女" value="3"></el-option>
			      <el-option label="同事" value="4"></el-option>
			      <el-option label="同学" value="5"></el-option>
			      <el-option label="朋友" value="6"></el-option>
			    </el-select>
			  </el-form-item>
			  <!--<el-form-item label="关系" prop="relation">
			    <el-input v-model="relForm.relation" class="nav-input"></el-input>
			  </el-form-item>-->
			  <el-form-item label="联系人" prop="relName">
			    <el-input v-model="relForm.relName" class="nav-input"></el-input>
			  </el-form-item>
			  <el-form-item label="手机号码" prop="relMobile">
			    <el-input v-model="relForm.relMobile" class="nav-input"></el-input>
			  </el-form-item>
			   <el-form-item>
			   	<el-button @click="relCancel" >取消</el-button>
			    <el-button type="primary" @click="subRelForm('relForm')">完成</el-button>
			  </el-form-item>
			</el-form>
			<!--<el-button :plain="true" class="">消息</el-button>-->
		</div>
		<div class="nav2 nav4"  v-show="step2&&isNew">
			<p class="add-p"><span>信息更新设置</span></p>
			<p class="nav4-p"><span>上次更新时间：</span>{{lastTime}}</p>
			<p class="nav4-p"><span>更新信息类型：</span>{{lastType|typeFilter}}</p>
			<p class="nav4-p"><span>是否更新</span><el-radio v-model="isUpdate" label="1">是</el-radio><el-radio v-model="isUpdate" label="0">否</el-radio></p>
		</div>
		
	    <div class="nav2 nav5" v-show="step2">
	    	<div class="tip-div" v-show="step2&&!update">
				<p>非最新数据，可能存在风险</p>
				<p><el-button   @click="lastStep(1)" class="subPwd" >上一步</el-button>
				<el-button type="primary" >下一步</el-button></p>
			</div>
	    	<div  v-show="step2&&update">
				<p class="add-p"><span>选择获取信息内容</span></p>
				<ul class="norm-ul">
					<li class="norm-li1">&nbsp;&nbsp;<el-radio v-model="selectType" label="0">&nbsp;</el-radio></li>
					<li class="norm-li2">客户信息基础版<span @click="goInformation()"><svg-icon icon-class="doubt"/></span></li>
					<li class="norm-li2">可用次数：{{baseCount}}次<span @click="goCar(1)"><svg-icon icon-class="shopCar" /></span></li>
				</ul>
				<ul class="norm-ul expert-ul">
					<li class="norm-li1">&nbsp;&nbsp;<el-radio v-model="selectType" label="1">&nbsp;</el-radio></li>
					<li class="norm-li2" >客户信息标准版<span @click="goInformation()"><svg-icon icon-class="doubt" /></span></li>
					<li class="norm-li2">可用次数：{{normCount}}次<span @click="goCar(2)"><svg-icon icon-class="shopCar" /></span></li>
				</ul>
				<p class="nav5-p"><el-button  @click="lastStep(1)" class="subPwd" >上一步</el-button>
				<el-button  type="primary" @click="nextStep()" :loading="loading2">下一步</el-button></p>
            </div>
	    </div>
	    <div class="nav2 nav4 nav6" v-show="step3">
			<p class="fillPwd"><span><svg-icon icon-class="tip" />获取身份、账单、通话信息需提交运营商服务密码进行认证</span></p>
			<p class="nav4-p"><span>姓名</span>{{ruleForm.name}}</p>
			<p class="nav4-p"><span>身份证号</span>{{ruleForm.idCard}}</p>
			<p class="nav4-p"><span>手机号</span>{{ruleForm.mobile}}</p>
			<p class="nav4-p nav4-pimg" v-if="imgCodeShow&&pwdShow"><span>图形验证码</span><el-input class="nav-input"  v-model="imgCode" placeholder="请输入图形验证码" max="6"></el-input><span class="img-span" @click="refreshImg"></span><img :src=imgCodeUrl /></p>
			<p class="nav4-p" v-if="needCode&&pwdShow"><span>短信验证码</span><el-input class="nav-input"  v-model="smsCode" placeholder="请输入短信验证码" max="6"></el-input></p>
			<p class="nav4-p" v-if="dhbSmsShow&&pwdShow"><span>短信随机码</span><el-input class="nav-input"  v-model="dhbsmsCode" placeholder="请输入4位短信随机码" max="4"></el-input></p>
			<p class="nav4-p" v-show="pwdShow"><span>服务密码</span><el-input class="nav-input" v-model="servePwd" placeholder="请输入服务密码" max="6" type="password"></el-input> <span class="forgetPwd" @click="forgetPwd()">忘记密码</span></p>
			<p class="nav4-p"><el-button  @click="lastStep(2)" class="subPwd" v-show="pwdShow">上一步</el-button>
			<el-button type="primary" @click="submitPwd()" v-show="pwdShow" :loading="loading3">{{subText}}</el-button></p>
	        <div v-show="!pwdShow">
	        	<p class="nav4-p" v-if="smsShow"><span>验证码</span><el-input  class="nav-input" placeholder="请输入短信验证码" v-model="code" :max="6"></el-input></p>
	        	<p class="nav4-p" v-if="smsShow"><el-button @click="pwdCancel()" class="subPwd">取消</el-button>
			    <el-button type="primary" @click="subMsg()">提交</el-button></p>
	        	<p class="nav4-p" v-if="!smsShow"><span>重置服务密码</span><el-input class="nav-input" placeholder="请输入服务密码,6位数字" v-model="resPwd"></el-input></p>
	        	<p class="nav4-p" v-if="!smsShow"><span>密码确认</span><el-input class="nav-input" placeholder="请输入服务密码,6位数字" v-model="againPwd"></el-input></p>
	        	<p class="nav4-p" v-if="!smsShow"><el-button @click="pwdCancel()" class="subPwd">取消</el-button>
			    <el-button type="primary" @click="resetPwd()" :loading="loading5">确认修改</el-button></p>
	        </div>
	    </div>
	    <div class="nav2 nav4 nav6" v-show="step4">
	    	<p class="fillPwd"><span><svg-icon icon-class="tip" />标准版需要您再次输入验证码请耐心等待</span></p>
	    	<p class="nav4-p" ><span>短信验证码</span><el-input class="nav-input"  v-model="jxlCode" placeholder="请输入短信验证码" max="6"></el-input></p>
	    	<p class="nav4-p" v-if="jxlRCodeShow"><span>短信随机码</span><el-input class="nav-input"  v-model="jxlRandomCode" placeholder="请输入短信随机码" max="4"></el-input></p>
	    	<p class="nav4-p"><el-button  @click="lastStep(3)" class="subPwd" v-show="pwdShow">上一步</el-button>
			<el-button type="primary" @click="submitSms()" v-show="pwdShow" :loading="loading4">提交</el-button></p>
	    </div>
	</div>

</template>

<script>
  import $ from 'jquery'
  import { mapGetters } from 'vuex'
  import { formatTime } from '@/utils/index'
  export default {
    data() {
      return {
      	jxlRandomCode:"",         //聚信立随机码
      	jxlRCodeShow:false,       //聚信立随机码显示
      	imgCode:"",
      	imgCodeShow:false,
      	imgCodeUrl:"",       //图形验证码地址
      	dhbsmsCode:"",       //电话邦4位短信随机码
      	dhbSmsShow:false, 
      	smsObj:{},       //重置密码信息
      	smsShow:true,
      	jxlCode:"",          //
      	reportKey:"",
      	subText:"提交",
      	loading1:false,
      	loading2:false,
      	loading3:false,
      	loading4:false,
      	loading5:false,
      	smsCode:"",
      	needCode:false,
      	resPwd:"",
      	againPwd:"",
      	code:"",            //短信验证码
      	codeText:"获取",
      	servePwd:'',        //服务密码
      	jxlObj:{},          //聚信立
      	dhbObj:{},          //电话帮
      	clientId:'',       //客户id
      	update:true,
      	isNew:true,
      	pwdShow:true,
      	baseCount:0,                 //可用基础版次数
      	normCount:0,               //可用标准版次数
      	selectType:'0',               // 0=>基础版 1=>标准版
      	isUpdate:"1",                 //是否更新
      	lastTime:"",            
      	lastType:"",
      	step1:true,
      	step2:false,
      	step3:false,
      	step4:false,
      	addRelShow:true,
      	cancleShow:true,
      	relationList:[],
      	redactIndex:-1,
        active: 1,
        workSpace:[],
        homeSpace:[],
        workAddress:"",
        homeAddress:"",
        ruleForm: {
          name: '张亚东',
          idCard:'341225199307088210',
          mobile:'15121193141'
        },
        relForm:{
        	relation:'',
        	relName:'',
        	relMobile:'',
        },
        rules: {
          name: [
            { required: true, message: '请填写真实姓名', trigger: 'blur' },
            { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
          ],
          idCard: [
            { required: true, message: '请填写身份证号', trigger: 'blur' },
            { min: 18, max: 18, message: '长度位18位字符', trigger: 'blur' }
          ],
          mobile: [
            { required: true, message: '请填写手机号', trigger: 'blur' },
            { min: 11, max: 11, message: '长度为11位数字',trigger: 'blur' }
          ],
           relation: [
            { required: true, message: '请选择联系人关系', trigger: 'change'},
          ],
           relName: [
            { required: true, message: '请填写联系人姓名', trigger: 'blur' },
          ],
           relMobile: [
            { required: true, message: '请填写联系人手机号', trigger: 'blur' },
          ],
        },
        options: [],       //三级城市json
      }   
    },
	watch: {
	    isUpdate:function(index){
	     	if(this.isUpdate==0){
	    		this.update=false
	    	}else{
	    		this.update=true
	    	}
	     }
	},
    mounted:function(){
    	$(window).unbind ('scroll');
    	if(this.userInfo.mobileNo){
    		if(this.clientMsg){
	    		this.ruleForm.name=this.clientMsg.realName
	    		this.ruleForm.idCard=this.clientMsg.idNo
	    		this.ruleForm.mobile=this.clientMsg.mobileNo
	    	}
    	}else{
    		this.$router.push({path:'/client/clientList'})
    	}
    },
    filters: {
    	relationFilter(index){
    		if(index==0){
    			return "配偶"
    		}else if(index==1){
    			return "父母"
    		}else if(index==2){
    			return "兄弟姐妹"
    		}else if(index==3){
    			return "子女"
    		}else if(index==4){
    			return "同事"
    		}else if(index==5){
    			return "同学"
    		}else if(index==6){
    			return "朋友"
    		}
    	},
    	typeFilter(index){
    		if(index==0){
    			return "客户信息基础版"
    		}else{
    			return "客户信息标准版"
    		}
    	},
    	 msgTime(data){
				  	if(typeof(data)=="number"){
				  		return data + "s"
				  	}else{
				  		return data
				  	}
				  }
    },
    methods: {
      //验证码刷新
      refreshImg(){
      	    const url=this.$backStage('/api/customer/refreshGraphic/'+this.dhbObj.sid)
            this.$http.get(url)
            .then(response => {
            	this.imgCodeUrl=response.data.data.captcha_image
            })
      },
      goInformation(){
      	this.$router.push({path:'/template/information'})
      },
      goCar(index){
      	if(index==1){
      		this.$store.dispatch('MsgType', '0')
      	}else{
      		this.$store.dispatch('MsgType', '1')
      	}
      	this.$router.push({path:'/personal/buyData'})
      },
       submitForm(formName) {
       	 if(this.userInfo.isVerified==0){
       		  this.$confirm('您还未进行实名认证，请先完成实名认证才可使用', '系统提示', {
	          confirmButtonText: '去认证',
	          cancelButtonText: '取消',
	          type: 'warning'
	        }).then(() => {
	           this.$router.push({path:'/personal/autonym'})
	        }).catch(() => {
	                
	        });
       	}else{
          this.$refs[formName].validate((valid) => {
	        if (valid) {
	        	    this.loading1=true
	        	    const url=this.$backStage('/api/customer/addCusBasicInfo')
	                this.$http.post(url,{"userId":this.userInfo.id,"realName":this.ruleForm.name,"idNo":this.ruleForm.idCard,"mobileNo":this.ruleForm.mobile})
	                .then(response => {
	                	this.loading1=false
						        this.step1=false
						       	this.step2=true
						       	this.active=2
						       	this.options=JSON.parse(response.data.obj.areaJson)
						       	console.log(this.options)
					          	this.baseCount=response.data.obj.standardTimes
					          	this.normCount=response.data.obj.advancedTimes
					          	this.clientId=response.data.obj.id
					          	if(response.data.status==210){
					          		this.isNew=false
					          		this.addRelShow=true
					          	}else if(response.data.status==200){
					          		this.isNew=true
					          		if(response.data.obj.contacts){
					          			this.addRelShow=false
						          		for(var i=0;i<response.data.obj.contacts.length;i++){
						          			this.relationList.push({"contactType":response.data.obj.contacts[i].contactType,"name":response.data.obj.contacts[i].name,"mobileNo":response.data.obj.contacts[i].mobileNo})
						          		}
					          		}else{
					          			this.addRelShow=true
					          		}
					          		this.workSpace=response.data.obj.workAddrCode.split('-')
					          		this.workAddress=response.data.obj.workAddrDetail
					          		this.homeSpace=response.data.obj.homeAddrCode.split('-')
					          		this.homeAddress=response.data.obj.homeAddrDetail
					          		this.lastType=response.data.obj.latestReportType
					          		this.lastTime=formatTime(response.data.obj.latestReportTime)
					          	}
							    // success callback
							  }, response => {
							  	this.loading1=false
							    // error callback
							  })
	          } else {
	            return false;
	            
	          }
          
            });
        }
      },
      subRelForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
          	if(this.redactIndex!=-1){
          		 this.relationList[this.redactIndex].relation=this.relForm.relation
          		 this.relationList[this.redactIndex].name=this.relForm.relName
          		 this.relationList[this.redactIndex].mobileNo=this.relForm.relMobile
          		 this.addRelShow=false
          		 this.redactIndex=-1
          	}else{
          		 if(this.relationList.length==6){
          		 	this.$message('联系人信息最多添加6条');
          		 }else{
          		 	this.relationList.push({"contactType":this.relForm.relation,"name":this.relForm.relName,"mobileNo":this.relForm.relMobile})
                    this.addRelShow=false
          		 }
          	}
          } else {
            return false;
          }
        });
      },
      addRel(){
      	this.addRelShow=true
      	this.relForm.relation=""
      	this.relForm.relName=""
      	this.relForm.relMobile=""
      },
      relCancel(){
      	if(this.relationList.length==0){
      		 this.$message({
	          showClose: true,
	          message: '至少填写一个联系人',
	          type: 'warning'
	        });
      	}else{
      		this.addRelShow=false
      	}
      	
      },
      redactRel(data,index){
      	this.addRelShow=true
      	this.relForm.relation=String(data.contactType)
      	this.relForm.relName=data.name
      	this.relForm.relMobile=data.mobileNo
      	this.redactIndex=index
      },
      removeRel(index){
      	this.relationList.splice(index,1);
      	if(this.relationList.length==0){
      		this.addRelShow=true
      	}
      },
      forgetPwd(){
      	this.pwdShow=false
      	const url=this.$backStage('/api/customer/dhbforgetPwd')
      	this.$http.post(url,{
			  "tel":this.ruleForm.mobile,
			  "userName":this.ruleForm.name,
			  "idCard":this.ruleForm.idCard
		})
      	.then(response => {
//    		console.log(response)
      		this.smsObj=response.data.data
      		if(this.smsObj.need_new_pwd==1){
      			this.smsShow=false
      		}else{
      			this.smsShow=true
      		}
      	})
      },
      pwdCancel(){
      	this.loading1=false
      	this.loading2=false
      	this.loading3=false
      	this.loading4=false
      	this.loading5=false
      	this.pwdShow=true
      },
      subMsg(){
      	if(this.smsObj.action=="done"){
      		this.$alert("重置密码成功", '系统提示', {
	          confirmButtonText: '确定',
	        });
      		this.pwdShow=true
      	}else{
	      	if(this.smsObj.login_sms_duration){
		      	const url=this.$backStage('/api/customer/dhbForgotPwdLogin')
		      	this.$http.post(url,{"tid":this.smsObj.tid,"loginCode":this.code})
		      	.then(response => {
//		      		console.log(response)
		      		if(response.data.action=="done"){
		      			this.$alert("重置密码成功", '系统提示', {
				          confirmButtonText: '确定',
				        });
			      		this.pwdShow=true
		      		}else{
			      		if(response.data.data.need_new_pwd==1){
			      			this.smsShow=false
			      		}else{
			      			this.$alert(response.data.msg, '系统提示', {
					          confirmButtonText: '确定',
					        });
			      		}
		      		}
		      	})
	       }else if(this.smsObj.sms_duration){
	      	 	const url=this.$backStage('/api/customer/dhbForgotPwdSms')
		      	this.$http.post(url,{"tid":this.smsObj.tid,"smsCode":this.code})
		      	.then(response => {
//		      		console.log(response)
		      		if(response.data.action=="done"){
		      			this.$alert("重置密码成功", '系统提示', {
				          confirmButtonText: '确定',
				        });
			      		this.pwdShow=true
		      		}else{
			      		if(response.data.data.need_new_pwd==1){
			      			this.smsShow=false
			      		}else{
			      			this.$alert(response.data.msg, '系统提示', {
					          confirmButtonText: '确定',
					        });
			      		}
		      		}
	      	    })
	       }else{
	       	  
	       }
       }
      },
      resetPwd(){
      	    const part=/^\d{6}$/
//		    const result1=part.test(this.code);
		    const result2=part.test(this.resPwd);
		    const result3=part.test(this.againPwd);
      	   if(!result2||!result3){
      	    	this.$alert("密码格式错误", '系统提示', {
		          confirmButtonText: '确定',
		        });
      	    }else if(this.resPwd!=this.againPwd){
      	    	this.$alert("两次输入密码不一致", '系统提示', {
		          confirmButtonText: '确定',
		        });
      	    }else{
      	    	this.loading5=true
      	    	const url=this.$backStage('/api/customer/dhbSetServicePwd')
	      		this.$http.post(url,{"tid":this.smsObj.tid,"newPwd":this.resPwd})
		      	.then(response => {
//		      		console.log(response)
		      		this.loading5=false
		      		if(response.data.action=="done"){
		      			this.$alert("密码重置成功", '系统提示', {
				          confirmButtonText: '确定',
				        });
		      			this.smsShow=true
		      			this.smsObj=response.data.data
		      			this.pwdShow=true
		      			this.resPwd=""
		      			this.code=""
		      			this.againPwd=""
		      		}else{
		      			this.smsShow=true
		      			this.smsObj=response.data.data
		      			this.$alert(response.data.msg, '系统提示', {
				           confirmButtonText: '确定',
				        });
		      		}
		      	})
	      	}
      },
      nextStep(){
      	if(!this.workSpace.length!=0||!this.workAddress){
      		this.$alert('工作地址不能为空', '系统提示', {
	          confirmButtonText: '确定',
	        });
      	}else if(!this.homeSpace||!this.homeAddress){
      		this.$alert('家庭地址不能为空', '系统提示', {
	          confirmButtonText: '确定',
	        });
      	}else if(this.relationList.length<1){
      		this.$alert('联系人信息至少有一条', '系统提示', {
	          confirmButtonText: '确定',
	        });
      	}else if(this.selectType==0&&this.baseCount==0){
      		this.$confirm('基础版可查询次数为0, 前往购买?', '系统提示', {
	          confirmButtonText: '确定',
	          cancelButtonText: '取消',
	          type: 'warning'
	        }).then(() => {
	           this.$store.dispatch('MsgType', this.selectType)
	           this.$router.push({path:'/personal/buyData'})
	        }).catch(() => {
	                
	        });
      	}else if(this.selectType==1&&this.normCount==0){
      		this.$confirm('标准版可查询次数为0, 前往购买?', '系统提示', {
	          confirmButtonText: '确定',
	          cancelButtonText: '取消',
	          type: 'warning'
	        }).then(() => {
	           this.$store.dispatch('MsgType', this.selectType)
	           this.$router.push({path:'/personal/buyData'})
	        }).catch(() => {
	                
	        });
      	}else{
      		this.loading2=true
      		const work=this.workSpace.join('-')
      		const home=this.homeSpace.join('-')
      		const url=this.$backStage('/api/customer/dhbSubmitForm')
      		this.$http.post(url,{"contacts":this.relationList,"userId":this.userInfo.id,"id":this.clientId,"temReportType":this.selectType,"workAddrCode":work,"workAddrDetail":this.workAddress,"homeAddrCode":home,"homeAddrDetail":this.homeAddress})
	        .then(response => {
	        	console.log(response)
	        	if(response.status==300){
	        			this.$alert('您的报告正在查询中请稍后', '系统提示', {
				          confirmButtonText: '确定',
				        });
	        	}else if(response.status==200){
	        		 this.loading2=false
	                 this.dhbObj=response.data.dhbGetLogin
		             if(this.dhbObj.smsDuration){
		             	this.needCode=true
		             }else{
		             	this.needCode=false
		             }
		             if(this.dhbObj.captchaImage){
		             	this.imgCodeShow=true
		             	this.imgCodeUrl=this.dhbObj.captchaImage
		             }else{
		             	this.imgCodeShow=false
		             }
		             if(this.selectType==0){
		             	this.subText="提交"
		             }else{
		             	this.subText="下一步"
		             }
		             this.step2=false
			      	 this.step3=true
			      	 this.active=3
	        	}else{
	        		this.$alert(response.data.msg, '系统提示', {
				          confirmButtonText: '确定',
				     });
	        	}
	        })
      	}

      },
      lastStep(index){
        this.loading1=false
      	this.loading2=false
      	this.loading3=false
      	this.loading4=false
      	this.loading5=false
      	if(index==1){
      		this.step1=true
      	    this.step2=false
      	    this.active=1
      	    this.relationList=[]
      	}else if(index==2){
      		this.step2=true
      	    this.step3=false
      	    this.active=2
      	}else if(index==3){
      		 this.jxlRCodeShow=false
      	}
      },
      submitPwd(){
      	this.loading3=true
      	if(this.dhbSmsShow){
      		const url=this.$backStage('/api/customer/dhbCollectSec')
	      	this.$http.post(url,{
								  "dhbLoginReq":{
								    "sid":this.dhbObj.sid,
								    "tel":this.ruleForm.mobile,
								    "pinPwd":this.servePwd,
								    "smsCode":this.dhbsmsCode,
								    "captchaCode":this.imgCode
								  },
								  "customer":{
								    "id":this.clientId,
								    "temReportType":this.selectType
								  }
								},{timeout:0})
	      	.then(response =>{
	      		console.log(response)
	      		if(response.data.dhbCollect.action=="done"){
	      			if(this.selectType==0){
		             		this.loading3=false
		             		this.$router.push({path:'/client/wait'})
		             		this.$store.dispatch('ClientMsg', "")
		             	}else{
			             	this.reportKey=response.data.reportKey
			             	const url=this.$backStage('/api/customer/jxlCollect')
		      	            this.$http.post(url,{"jxlCollectReq":{
											     "token":"",
											     "account":this.ruleForm.mobile,
											     "password":this.servePwd,
											     "captcha":"",
											     "website":""
											  },
											   "customer":{
											     "id":this.clientId,
											     "temReportType":this.selectType
											  },
											  "reportKey":this.reportKey
		      	            })
		      	             .then(response => {
		      	             	console.log(response)
		      	             	if(response.data.jxlCollect.processCode==10008){
		      	             		this.loading3=false
		      	             		this.$router.push({path:'/client/wait'})
		      	             		this.$store.dispatch('ClientMsg', "")
		      	             	}else{
		      	             		this.$alert(response.data.jxlCollect.content, '系统提示', {
							          confirmButtonText: '确定',
							        });
		      	             		this.jxlObj=response.data.jxlSubmitForm
		      	             		this.step3=false
		      	             		this.step4=true
		      	             	}
		      	             }).catch(function(response){
		      	             	this.$router.push({path:'/404'})
		      	             })
	      	             }
	      		}else if(this.response.data.dhbCollect.smsDuration){
	      			this.$alert(response.data.dhbCollect.msg, '系统提示', {
				          confirmButtonText: '确定',
				        });
				        this.dhbSmsShow=true
		             	this.loading3=false
	      		}else{
	      			this.$alert(response.data.dhbCollect.msg, '系统提示', {
				          confirmButtonText: '确定',
				    });
				    this.loading3=false
	      		}
	      	})
      	}else{
	      	const url=this.$backStage('/api/customer/dhbCollect')
	      	this.$http.post(url,{
								  "dhbLoginReq":{
								    "sid":this.dhbObj.sid,
								    "tel":this.ruleForm.mobile,
								    "pinPwd":this.servePwd,
								    "smsCode":this.smsCode,
								    "captchaCode":this.imgCode
								  },
								  "customer":{
								    "id":this.clientId,
								    "temReportType":this.selectType
								  }
								},{timeout:0})
		        .then(response => {
		        	console.log(response)
		             if(response.data.dhbCollect.action=="done"){
		             	if(this.selectType==0){
		             		this.loading3=false
		             		this.$router.push({path:'/client/wait'})
		             		this.$store.dispatch('ClientMsg', "")
		             	}else{
			             	this.reportKey=response.data.reportKey
			             	const url=this.$backStage('/api/customer/jxlCollect')
		      	            this.$http.post(url,{"jxlCollectReq":{
											     "token":"",
											     "account":this.ruleForm.mobile,
											     "password":this.servePwd,
											     "captcha":"",
											     "website":""
											  },
											   "customer":{
											     "id":this.clientId,
											     "temReportType":this.selectType
											  },
											  "reportKey":this.reportKey
		      	            })
		      	             .then(response => {
		      	             	console.log(response)
		      	             	if(response.data.jxlCollect.processCode==10008){
		      	             		this.loading3=false
		      	             		this.$router.push({path:'/client/wait'})
		      	             		this.$store.dispatch('ClientMsg', "")
		      	             	}else{
		      	             		this.$alert(response.data.jxlCollect.content, '系统提示', {
							          confirmButtonText: '确定',
							        });
		      	             		this.jxlObj=response.data.jxlSubmitForm
		      	             		this.step3=false
		      	             		this.step4=true
		      	             	}
		      	             })
	      	             }
		             }else if(response.data.dhbCollect.smsDuration||response.data.dhbCollect.captchaImage){
		             	this.$alert("请输入验证码", '系统提示', {
					          confirmButtonText: '确定',
					        });
		             	if(response.data.dhbCollect.smsDuration){
		             		
					        this.dhbSmsShow=true
			             	this.loading3=false
		             	}
		             	if(response.data.dhbCollect.captchaImage){
		             		this.imgCodeShow=true
		             		this.imgCodeUrl=response.data.dhbCollect.captchaImage
			             	this.loading3=false
		             	}
		             }else{
		             	this.loading3=false
		             	this.$alert(response.data.dhbCollect.msg, '系统提示', {
					          confirmButtonText: '确定',
					        });
		             }
		        })
	        }
      },
      submitSms(){
      	 this.loading4=true
      	  const url=this.$backStage('/api/customer/jxlCollect')
      	            var code=this.jxlCode
      	            if( this.jxlRCodeShow){
      	            	code=this.jxlRandomCode
      	            }
      	            this.$http.post(url,{"jxlCollectReq":{
									     "token":this.jxlObj.token,
									     "account":this.ruleForm.mobile,
									     "password":this.servePwd,
									     "captcha":code,
									     "website":this.jxlObj.website,
									     "type":"SUBMIT_CAPTCHA"
									  },
									   "customer":{
									     "id":this.clientId,
									     "temReportType":this.selectType
									  },
									  "reportKey":this.reportKey
      	            })
      	             .then(response => {
      	             	console.log(response)
      	             	this.loading4=false
      	             	if(response.data.jxlCollect.processCode==10008){
      	             		this.$router.push({path:'/client/wait'})
      	             		this.$store.dispatch('ClientMsg', "")
      	             	}else if(response.data.jxlCollect.processCode==10002){
      	             		this.$alert("请输入四位短信随机码", '系统提示', {
					          confirmButtonText: '确定',
					        });
					        this.jxlRCodeShow=true
      	             	}else{
      	             		this.$alert(response.data.jxlCollect.content, '系统提示', {
					          confirmButtonText: '确定',
					        });
      	             	}
      	             })
      }
    },
     computed: {
	    ...mapGetters([
	      'userInfo',
	      'clientMsg'
	    ])
	  }
  }
</script>
<style scoped>
	.content{
		font-size: 16px;
		padding: 0 200px;
	    padding-top: 80px;
	}
	.el-steps{
		padding: 0 100px;
		margin-bottom: 80px;
	}
	.el-form-item{
		margin-bottom: 36px;
	}
	.el-form-item__error{
		padding-top: 10px;
	}
	.el-form-item__content{
		padding-left: 200px;
	}
	.nav1 .el-button{
		outline: none;
		border: none;
	}
	.nav2{
		border-bottom: 1px #E3E7F1 solid;
		border-width:thin;
		margin-bottom: 50px;
		padding-bottom: 50px;
	}
	.el-form{
		padding-top: 50px;
		width: 300px;
		margin: 0 auto;
	}
	.nav-input{
		width: 194px ;
	}
	.add-p{
		padding-left: 20%;
		padding-right: 20%;
		margin-bottom: 40px;
		font-weight: bold;
	}
	.add-p span{
		font-weight: bold;
	}
	.add-span{
		float: right;
	}
	.add-span:hover{
		color: #409EFF;
	}
	.relList-ul li{
		list-style: none;
		margin: 0 auto;
		width: 420px;
		margin-bottom: 20px;
		font-size: 16px;
		position: relative;
	}
	.relList-ul li span{
		text-align: center;
		display: inline-block;
		width: 120px;
		line-height: 20px;
		margin-right: 30px;
	}
	.relList-ul li .relList-ul-span1{
		margin-right: 0;
	}
	.relList-ul li .svg-span{
		width: 30px;
		display: none;
		position:absolute;
		right:-60px;
		top:0;
	}
	.relList-ul li .svg-span2{
		display: none;
		position:absolute;
		right:-90px;
		top:0;
	}
	.relList-ul li:hover .svg-span{
		display: inline-block;
	}
	.nav3-form{
		width: 300px;
		margin: 0 auto;
		height: 300px;
	}
	.nav3-form .nav3-span{
		font-size: 16px;
		margin-right: 20px;
	}
	.nav3 .work-input{
		width: 200px;
		margin-left: 85px;
		margin-top: 20px;
		margin-bottom: 30px;
	}
	.el-message{
		position: absolute;
		top: 200px !important;
	}
	.nav4-p{
		width: 300px;
		margin: 0 auto;
		margin-bottom: 20px;
	}
	.nav4-p span{
		display: inline-block;
		width: 150px;
	}
	.nav5 ul{
		width: 500px;
		height: 100px;
		margin: 0 auto;
	}
	.nav5 ul li{
		text-align: center;
		list-style: none;
		float: left;
		border: 1px #ccc solid;
		height: 100px;
		line-height: 100px;
	}
	.nav5 .expert-ul{
		margin-bottom: 20px;
	}
	.nav5 .expert-ul li{
		border-top:none;
	}
	.nav5 ul .norm-li1{
		width: 100px;
	}
	.nav5 ul .norm-li2{
		width: 200px;
		border-left: none;
	}
	.nav5 .nav5-p{
		text-align: center;
		width: 100%;
	}
	.nav6{
		border-bottom: none;
	}
	.nav6 .nav4-p{
		width: 520px;
		padding-left: 100px;
		margin: 0 auto;
		margin-bottom: 40px;
		position: relative;
	}
	.nav6 .nav4-p span{
		margin-right: 10px;
		width: 100px;
	}
	.nav6 .nav4-p .getCode{
		position: absolute;
		right:55px ;
		top: 13px;
		font-size: 14px;
		color: #666;
		padding-left: 10px;
		border-left: 1px #ccc solid;
	}
	.fillPwd{
		width: 500px;
		margin: 0 auto;
		/*padding: 0 20%;*/
		margin-bottom: 50px;
		text-align: center;
	}
	.fillPwd span{
		display: block;
		height: 40px;
		background: #eee;
		line-height: 40px;
		color: #666;
		font-size: 14px;
	}
	.fillPwd span .svg-icon{
		margin-right: 10px;
	}
	.svg-icon{
		color: #666;
		margin-left: 5px;
	}
	.nav4-p .forgetPwd{
		color: #409EFF;
		font-size: 14px;
		padding-left: 20px;
	}
	.subPwd{
		display: inline-block;
		margin: 0 auto;
	}
	.tip-div p{
		margin-left: 39%;
		color: red;
		margin-bottom: 30px;
	}
	.nav4-pimg{
		position: relative;
	}
	.nav2 .nav4-pimg .img-span{
		width: 90px;
		height: 40px;
		position: absolute;
		top: 0;
		right: 0px;
		background: #1fa3ff;
		z-index: 1;
		opacity: .1;
	}
	.nav4-p img{
		width: 90px;
		height: 40px;
		position: absolute;
		top: 0;
		right: 10px;
		border: 1px #eee solid;
	}
</style>