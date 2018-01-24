<!--新建客户-->

<template>
	<div class="content">
		<el-steps :active="active"  align-center class="step">
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
			    <el-button type="primary" @click="submitForm('ruleForm')">下一步</el-button>
			  </el-form-item>
			</el-form>
		</div>
		<div class="nav2"  v-show="step2">
			<p class="add-p"><span>添加联系人信息</span><span class="add-span" @click="addRel">继续添加 <svg-icon icon-class="add" /></span></p>
			<ul v-show="!addRelShow" class="relList-ul">
				<li v-for="(ele,k) in relationList"><span>{{ele.relation|relationFilter}}</span><span>{{ele.name}}</span><span>{{ele.mobile}}</span><span class="svg-span" @click="redactRel(ele,k)"><svg-icon icon-class="redact" /></span><span class="svg-span" @click="removeRel(k)"><svg-icon icon-class="remove" /></span></li>
			</ul>
			<el-form :model="relForm" :rules="rules" ref="relForm" label-width="100px" class="demo-ruleForm" label-position="left" v-show="addRelShow">
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
		<div class="nav2 nav3"  v-show="step2">
			<p class="add-p"><span>添加地址信息</span></p>
			<div class="nav3-form">
				<span class="nav3-span">工作地址</span><el-cascader
				    placeholder="请选择省市区"
				    :options="options"
				    filterable
				     @change="handleChange"
				>
				</el-cascader>
			    <el-input v-model="workAddress" class="work-input" placeholder="详细到门牌号"></el-input><br />
			    <span class="nav3-span">家庭地址</span><el-cascader
				    placeholder="请选择省市区"
				    :options="options"
				    filterable
				>
				</el-cascader>
			    <el-input v-model="homeAddress" class="work-input" placeholder="详细到门牌号"></el-input>
			</div>
		</div>
		<div class="nav2 nav4"  v-show="step2&&isNew">
			<p class="add-p"><span>信息更新设置</span></p>
			<p class="nav4-p"><span>上次更新时间：</span>{{lastTime}}</p>
			<p class="nav4-p"><span>更新信息类型：</span>{{lastType}}</p>
			<p class="nav4-p"><span>是否更新</span><el-radio v-model="isUpdate" label="1">是</el-radio><el-radio v-model="isUpdate" label="0">否</el-radio></p>
		</div>
		
	    <div class="nav2 nav5" v-show="step2">
	    	<div class="tip-div" v-show="step2&&!update">
				<p>非最新数据，可能存在风险</p>
				<el-button  type="primary" @click="lastStep(1)" class="subPwd" >上一步</el-button>
				<el-button type="primary" >提交</el-button>
			</div>
	    	<div  v-show="step2&&update">
				<p class="add-p"><span>选择获取信息内容</span></p>
				<ul class="norm-ul">
					<li class="norm-li1">&nbsp;&nbsp;<el-radio v-model="selectType" label="1">&nbsp;</el-radio></li>
					<li class="norm-li2">客户信息标准版<span @click="goInformation()"><svg-icon icon-class="doubt"/></span></li>
					<li class="norm-li2">可用次数：{{normCount}}次<span @click="goCar()"><svg-icon icon-class="shopCar" /></span></li>
				</ul>
				<ul class="norm-ul expert-ul">
					<li class="norm-li1">&nbsp;&nbsp;<el-radio v-model="selectType" label="2">&nbsp;</el-radio></li>
					<li class="norm-li2" >客户信息高级版<span @click="goInformation()"><svg-icon icon-class="doubt" /></span></li>
					<li class="norm-li2">可用次数：{{expertCount}}次<span @click="goCar()"><svg-icon icon-class="shopCar" /></span></li>
				</ul>
				<el-button  type="primary" @click="lastStep(1)" class="subPwd" >上一步</el-button>
				<el-button  type="primary" @click="nextStep()" >下一步</el-button>
            </div>
	    </div>
	    <div class="nav2 nav4 nav6" v-show="step3">
			<p class="fillPwd"><span><svg-icon icon-class="tip" />获取身份、账单、通话信息需提交运营商服务密码进行认证</span></p>
			<p class="nav4-p"><span>姓名</span>{{ruleForm.name}}</p>
			<p class="nav4-p"><span>身份证号</span>{{ruleForm.idCard}}</p>
			<p class="nav4-p"><span>手机号</span>{{ruleForm.mobile}}</p>
			<p class="nav4-p" v-show="pwdShow"><span>服务密码</span><el-input class="nav-input" placeholder="请输入服务密码"></el-input> <span class="forgetPwd" @click="forgetPwd()">忘记密码</span></p>
			<el-button type="primary" @click="lastStep(2)" class="subPwd" v-show="pwdShow">上一步</el-button>
			<el-button type="primary" @click="submitPwd()" v-show="pwdShow">提交</el-button>
	        <div v-show="!pwdShow">
	        	<p class="nav4-p"><span>验证码</span><el-input class="nav-input" placeholder="请输入服务密码"></el-input></p>
	        	<p class="nav4-p"><span>重置服务密码</span><el-input class="nav-input" placeholder="请输入服务密码"></el-input></p>
	        	<p class="nav4-p"><span>密码确认</span><el-input class="nav-input" placeholder="请输入服务密码"></el-input></p>
	        	<el-button @click="pwdCancel()" class="subPwd">取消</el-button>
			    <el-button type="primary" @click="resetPwd()">确认修改</el-button>
	        </div>
	    </div>
	</div>

</template>

<script>
  export default {
    data() {
      return {
      	update:true,
      	isNew:true,
      	pwdShow:true,
      	normCount:50,                 //可用标准版次数
      	expertCount:20,               //可用高级版次数
      	selectType:"1",               // 1=>标准版 2=>高级版
      	isUpdate:"1",                 //是否更新
      	lastTime:"36天前",            
      	lastType:"客户信息标准版",
      	step1:true,
      	step2:false,
      	step3:false,
      	addRelShow:true,
      	cancleShow:true,
      	relationList:[],
      	redactIndex:-1,
        active: 1,
        workAddress:"",
        homeAddress:"",
        ruleForm: {
          name: '',
          idCard:'',
          mobile:''
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
        options: [{
          value: 'zhinan',
          label: '指南',
          children: [{
            value: 'shejiyuanze',
            label: '设计原则',
            children: [{
              value: 'yizhi',
              label: '一致'
            }]
          }, {
            value: 'daohang',
            label: '导航',
            children: [{
              value: 'cexiangdaohang',
              label: '侧向导航'
            }, {
              value: 'dingbudaohang',
              label: '顶部导航'
            }]
          }]
        }, {
          value: 'zujian',
          label: '组件',
          children: [{
            value: 'others',
            label: 'Others',
            children: [{
              value: 'collapse',
              label: 'Collapse 折叠面板'
            }]
          }]
        }, {
          value: 'ziyuan',
          label: '资源',
          children: [{
            value: 'jiaohu',
            label: '组件交互文档'
          }]
        }]
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
    	}
    },
    methods: {
      goInformation(){
      	this.$router.push({path:'/template/information'})
      },
      goCar(){
      	this.$router.push({path:'/personal/buyData'})
      },
//    next() {
//      if (this.active++ > 2) this.active = 0;
//    },
       submitForm(formName) {
       	this.step1=false
       	this.step2=true
       	this.active=2
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log('submit!');
          } else {
          	this.active=2
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
          		 	this.relationList.push({"relation":this.relForm.relation,"name":this.relForm.relName,"mobile":this.relForm.relMobile})
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
      	this.addRelShow=true
      	this.relForm.relation=data.relation
      	this.relForm.relName=data.name
      	this.relForm.relMobile=data.mobile
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
      nextStep(){
      	this.step2=false
      	this.step3=true
      	this.active=3
      },
      lastStep(index){
      	if(index==1){
      		this.step1=true
      	    this.step2=false
      	    this.active=1
      	}else if(index==2){
      		this.step2=true
      	    this.step3=false
      	    this.active=2
      	}
      },
      submitPwd(){
      	this.$router.push({path:'/client/reportPage'})
      }
    }
  }
</script>
<style scoped>
	.content{
		padding: 0 150px;
	   padding-top: 80px;
	}
	.el-steps{
		padding: 0 200px;
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
		padding-left: 40%;
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
		margin-bottom: 20px;
		font-size: 16px;
		padding-left: 30%;
	}
	.relList-ul li span{
		text-align: center;
		display: inline-block;
		width: 120px;
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
		padding-left: 40%;
		padding-right: 30%;
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
		padding-left: 40%;
		margin-bottom: 20px;
	}
	.nav4-p span{
		display: inline-block;
		width: 150px;
	}
	.nav5 ul{
		padding-left:40% ;
		height: 100px;
		margin: 0;
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
	.nav6{
		border-bottom: none;
	}
	.nav6 .nav4-p{
		margin-bottom: 40px;
	}
	.fillPwd{
		padding: 0 30%;
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
		margin-left: 50%;
	}
	.tip-div p{
		margin-left: 39%;
		color: red;
		margin-bottom: 30px;
	}
	.tip-div .subPwd{
		margin-left: 40%;
	}
</style>