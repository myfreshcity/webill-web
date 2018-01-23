<!--实名认证-->

<template>
	<div class="content">
		<div class="nav1">
			<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" label-position="left" >
			  <el-form-item label="姓名" prop="name">
			    <el-input v-model="ruleForm.name" class="nav-input" v-if="!realShow"></el-input><span v-if="realShow">{{}}</span>
			  </el-form-item>
			  <el-form-item label="身份证号码" prop="idNo">
			    <el-input v-model="ruleForm.idNo" class="nav-input"  v-if="!realShow"></el-input><span v-if="realShow">{{}}</span>
			  </el-form-item>
			  <el-form-item label="银行卡号码" prop="bankNo">
			    <el-input v-model="ruleForm.bankNo" class="nav-input"  v-if="!realShow"></el-input><span v-if="realShow">{{}}</span>
			  </el-form-item>
			  <el-form-item label="预留手机号" prop="mobileNo" class="nav-mobile">
			    <el-input v-model="ruleForm.mobileNo" class="nav-input"  v-if="!realShow"></el-input><span v-if="realShow">{{}}</span>
			    <span class="getCode">获取验证码</span>
			  </el-form-item>
			   <el-form-item label="短信验证码" prop="code" v-if="!realShow">
			    <el-input v-model="ruleForm.code" class="nav-input"></el-input>
			  </el-form-item>
			   <el-form-item>
			    <el-button type="primary" @click="submitForm('ruleForm')"  v-if="!realShow">去认证</el-button>
			  </el-form-item>
			</el-form>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				realShow:false,
				ruleForm: {
		          name: '',
		          idCard:'',
		          bankNo:'',
		          mobileNo:'',
		          code:''
		        },
		        rules: {
		          name: [
		            { required: true, message: '请填写真实姓名', trigger: 'blur' },
		            { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
		          ],
		          idNo: [
		            { required: true, message: '请填写身份证号', trigger: 'blur' },
		            { min: 18, max: 18, message: '长度位18位字符', trigger: 'blur' }
		          ],
		          mobileNo: [
		            { required: true, message: '请填写手机号', trigger: 'blur' },
		            { min: 11, max: 11, message: '长度为11位数字',trigger: 'blur' }
		          ],
		           bankNo: [
		            { required: true, message: '请填写银行卡号码', trigger: 'blur'},
		          ],
		           code: [
		            { required: true, message: '请填写短信验证码', trigger: 'blur' },
		          ],
		        },
			}
		},
		methods:{
			submitForm(formName){
				 this.$refs[formName].validate((valid) => {
		          if (valid) {
		            alert('submit!');
		          } else {
		          	this.active=2
		          	console.log(this.active)
		            console.log('error submit!!');
		            return false;
		          }
		        });
			}
		}
	}
</script>

<style scoped>
	.content{
	   padding-top: 50px;
	}
	.el-steps{
		padding: 0 200px;
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
		/*background: #3CC477;*/
		outline: none;
		border: none;
	}
	.el-form{
		padding-top: 50px;
		padding-left: 35%;
	}
	.nav-input{
		width: 300px ;
	}
	.nav-mobile{
		position: relative;
	}
	.nav-mobile .getCode{
		position: absolute;
		left: 210px;
		top: 8px;
		z-index: 10000;
		border-left: 1px #ccc solid;
		height: 24px;
		line-height: 24px;
		padding-left: 10px;
		color: #409EFF;
	}
</style>