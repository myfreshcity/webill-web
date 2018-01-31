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
			    <el-button type="primary" @click="submitForm('ruleForm')" class="subPwd">下一步</el-button>
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
				    @change="handleChange"
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
				<li v-for="(ele,k) in relationList"><span>{{ele.contactType|relationFilter}}</span><span>{{ele.name}}</span><span>{{ele.mobileNo}}</span><span class="svg-span" @click="redactRel(ele,k)"><svg-icon icon-class="redact" /></span><span class="svg-span" @click="removeRel(k)"><svg-icon icon-class="remove" /></span></li>
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
				<el-button  type="primary" @click="nextStep()" >下一步</el-button></p>
            </div>
	    </div>
	    <div class="nav2 nav4 nav6" v-show="step3">
			<p class="fillPwd"><span><svg-icon icon-class="tip" />获取身份、账单、通话信息需提交运营商服务密码进行认证</span></p>
			<p class="nav4-p"><span>姓名</span>{{ruleForm.name}}</p>
			<p class="nav4-p"><span>身份证号</span>{{ruleForm.idCard}}</p>
			<p class="nav4-p"><span>手机号</span>{{ruleForm.mobile}}</p>
			<p class="nav4-p" v-show="pwdShow"><span>服务密码</span><el-input class="nav-input" v-model="servePwd" placeholder="请输入服务密码" max="6"></el-input> <span class="forgetPwd" @click="forgetPwd()">忘记密码</span></p>
			<p class="nav4-p"><el-button  @click="lastStep(2)" class="subPwd" v-show="pwdShow">上一步</el-button>
			<el-button type="primary" @click="submitPwd()" v-show="pwdShow">提交</el-button></p>
	        <div v-show="!pwdShow">
	        	<p class="nav4-p"><span>验证码</span><el-input  class="nav-input" placeholder="请输入服务密码" v-model="code" :max="6"></el-input><span class="getCode" @click="getCode()">{{codeText|msgTime}}</span></p>
	        	<p class="nav4-p"><span>重置服务密码</span><el-input class="nav-input" placeholder="请输入服务密码,6位数字" v-model="resPwd"></el-input></p>
	        	<p class="nav4-p"><span>密码确认</span><el-input class="nav-input" placeholder="请输入服务密码,6位数字" v-model="againPwd"></el-input></p>
	        	<p class="nav4-p"><el-button @click="pwdCancel()" class="subPwd">取消</el-button>
			    <el-button type="primary" @click="resetPwd()">确认修改</el-button></p>
	        </div>
	    </div>
	</div>

</template>

<script>
  import { formatTime } from '@/utils/index'
  export default {
    data() {
      return {
      	resPwd:"",
      	againPwd:"",
      	code:"",            //短信验证码
      	codeText:"获取",
      	servePwd:'',        //服务密码
      	website:'',         //运营商类型
      	clientToken:'',
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
            { min: 11, max: 11, message: '长度为11位数字', trigger: 'blur' }
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
    	if(this.relationList.length==0){
    		this.cancleShow=false
    		this.addRelShow=true
    	}else{
    		this.cancleShow=true
    		this.addRelShow=false
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
      getCode(){
      	if(this.codeText=="获取"){
	      	this.$alert('验证码发送成功,请不要重复点击', '系统提示', {
		          confirmButtonText: '确定',
		    });
		    const url=this.$backStage('/api/customer/resetPassword')
	      	this.$http.post(url,{"token":this.clientToken,"account":this.ruleForm.mobile,"website":this.website})
	      	.then(response => {
	      		 console.log(response)
	      		 let self = this
				 self.codeText=60
				 const show=setInterval(function () {
	                 	  if(self.codeText=="获取"){
	                 	  	        clearInterval(show)
	                 	  }else{
				               self.codeText -= 1
				               if(self.codeText==0){
					             	  clearInterval(show)
					             	  self.codeText="获取"
	                     }
				              }
	                 }, 1000)
	      	})
	      }
      },
//    next() {
//      if (this.active++ > 2) this.active = 0;
//    },
       submitForm(formName) {
       	

        this.$refs[formName].validate((valid) => {
	        if (valid) {
	                this.$http.post("http://yadong.test.manmanh.com/webill-app/api/customer/addCusBasicInfo",{"userId":1,"realName":this.ruleForm.name,"idNo":this.ruleForm.idCard,"mobileNo":this.ruleForm.mobile})
	                .then(response => {
	                	console.log(response)
						        this.step1=false
						       	this.step2=true
						       	this.active=2
						       	this.options=JSON.parse(response.data.obj.areaJson)
					          	this.baseCount=response.data.obj.standardTimes
					          	this.normCount=response.data.obj.advancedTimes
					          	this.clientId=response.data.obj.id
					          	if(response.data.status==210){
					          		this.isNew=false
					          	}else if(response.data.status==200){
					          		this.isNew=true
					          		if(response.data.obj.contacts){
					          			console.log(111)
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
							    // error callback
							  })
	          } else {
	            return false;
	            
	          }
          
        });
      },
      subRelForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
          	if(this.redactIndex!=-1){
          		 this.relationList[this.redactIndex].relation=this.relForm.relation
          		 this.relationList[this.redactIndex].name=this.relForm.relName
          		 this.relationList[this.redactIndex].mobile=this.relForm.relMobile
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
            console.log(this.relationList)
          } else {
            return false;
          }
        });
      },
//    resetForm(formName) {
//      this.$refs[formName].resetFields();
//    },
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
      	console.log(data)
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
      handleChange(value) {
        console.log(value);
      },
      forgetPwd(){
      	this.pwdShow=false
      },
      pwdCancel(){
      	this.pwdShow=true
      },
      resetPwd(){
      	    const part=/^\d{6}$/
		    const result1=part.test(this.code);
		    const result2=part.test(this.resPwd);
		    const result3=part.test(this.againPwd);
      	    if(!result1){
      	    	this.$alert("验证码格式错误", '系统提示', {
		          confirmButtonText: '确定',
		        });
      	    }else if(!result2||!result3){
      	    	this.$alert("密码格式错误", '系统提示', {
		          confirmButtonText: '确定',
		        });
      	    }else if(this.resPwd!=this.againPwd){
      	    	this.$alert("两次输入密码不一致", '系统提示', {
		          confirmButtonText: '确定',
		        });
      	    }else{
	      		this.$http.post("http://yadong.test.manmanh.com/webill-app/api/customer/resetPassword",{"token":this.clientToken,"account":this.ruleForm.mobile,"website":this.website,"password":this.resPwd,"captcha":this.code,"type":"SUBMIT_RESET_PWD"})
		      	.then(response => {
		      		console.log(response)
		      		this.$alert(response.data.data.content, '系统提示', {
			           confirmButtonText: '确定',
			        });
		      		if(response.data.data.process_code==11000){
		      			this.pwdShow=true
		      			this.resPwd=""
		      			this.code=""
		      			this.codeTest="获取"
		      			this.againPwd=""
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
      		const work=this.workSpace.join('-')
      		const home=this.homeSpace.join('-')
      		this.$http.post("http://yadong.test.manmanh.com/webill-app/api/customer/submitForm",{"contacts":this.relationList,"userId":1,"id":this.clientId,"latestReportType":this.selectType,"workAddrCode":work,"workAddrDetail":this.workAddress,"homeAddrCode":home,"homeAddrDetail":this.homeAddress})
	        .then(response => {
	             console.log(response)
	             this.website=response.data.dataSource.website
	             this.clientToken=response.data.token
	             this.step2=false
		      	 this.step3=true
		      	 this.active=3
	        })
	      	this.step2=false
	      	this.step3=true
	      	this.active=3
      	}

      },
      lastStep(index){
      	if(index==1){
      		this.step1=true
      	    this.step2=false
      	    this.active=1
      	    this.relationList=[]
      	}else if(index==2){
      		this.step2=true
      	    this.step3=false
      	    this.active=2
      	}
      },
      submitPwd(){
      	this.$http.post("http://yadong.test.manmanh.com/webill-app/api/customer/collect",{"token":this.clientToken,"account":this.ruleForm.mobile,"password":this.servePwd,"website":this.website,"cusId":this.clientId,"temReportType":this.selectType})
	        .then(response => {
	             console.log(response)
	             this.$router.push({path:'/client/wait'})
	        })
      }
    }
  }
</script>
<style scoped>
	.content{
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
		width: 600px;
		padding-left: 50px;
		margin-bottom: 20px;
		font-size: 16px;
		
	}
	.relList-ul li span{
		text-align: center;
		display: inline-block;
		width: 120px;
		line-height: 20px;
		margin-right: 30px;
	}
	.relList-ul li .svg-span{
		width: 30px;
		margin-right: 10px;
		display: none;
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
		margin-right: 20px;
	}
	.nav3 .work-input{
		width: 194px;
		margin-left: 86px;
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
</style>