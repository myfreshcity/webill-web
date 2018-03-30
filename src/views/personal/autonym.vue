<!--实名认证-->

<template>
	<div class="content">
		<p class="p-head">认证类型</p>
		<p class="selectype">
			    <el-radio v-model="selectType" label="1">&nbsp;个人认证</el-radio>
			    <el-radio v-model="selectType" label="2">&nbsp;企业认证</el-radio>
		</p>
		<div class="nav1 autoNav2"  v-if="personalShow">
			<el-form :model="ruleForm"  ref="ruleForm" label-width="100px" class="demo-ruleForm" label-position="left" >
			  <el-form-item label="姓名" prop="name">
			    <el-input v-model="ruleForm.name" class="nav-input" v-if="!realShow"></el-input><span v-if="realShow">{{user.realName}}</span>
			  </el-form-item>
			  <el-form-item label="身份证号码" prop="idNo">
			    <el-input v-model="ruleForm.idNo" class="nav-input"  v-if="!realShow"></el-input><span v-if="realShow">{{user.idNo|encryptIdNo}}</span>
			  </el-form-item>
			  <el-form-item label="银行卡号码" prop="bankNo">
			    <el-input v-model="ruleForm.bankNo" class="nav-input"  v-if="!realShow"></el-input><span v-if="realShow">{{user.bankCardNo|encryptIdNo}}</span>
			  </el-form-item>
			  <el-form-item label="预留手机号" prop="mobileNo" class="nav-mobile">
			    <el-input v-model="ruleForm.mobileNo" class="nav-input"  v-if="!realShow"></el-input><span v-if="realShow">{{user.bankMobileNo|encryptMobile}}</span>
			    <!--<span class="getCode">获取验证码</span>-->
			  </el-form-item>
			   <!--<el-form-item label="短信验证码" prop="code" v-if="!realShow">
			    <el-input v-model="ruleForm.code" class="nav-input"></el-input>
			  </el-form-item>-->
			   <el-form-item>
			    <el-button type="primary" @click="submitForm('ruleForm')" :loading="loading1" v-if="!realShow">立即认证</el-button>
			  </el-form-item>
			</el-form>
		</div>
		<div class="nav1 autoNav2 nav2"  v-if="!personalShow">
			<el-form :model="ruleForm"  ref="ruleForm" label-width="100px" class="demo-ruleForm" label-position="left" >
			  <el-form-item label="公司名称 " prop="companyName">
			    <el-input v-model="ruleForm.companyName" class="nav-input" v-if="!realCompanyShow"></el-input><span v-if="realCompanyShow">{{user.realName}}</span>
			  </el-form-item>
			  <p class="addP"><span class="addSpan">公司地址</span><el-cascader
				    placeholder="请选择省市区"
				    :options="options"
				    filterable
				    v-model="ruleForm.workSpace"
				>
				</el-cascader><br  />
			  </p>
			  <el-input v-model="ruleForm.workAddress" class="work-input" placeholder="公司详细地址"></el-input><br />
			  <el-form-item label="法人名称" prop="legalPerson">
			    <el-input v-model="ruleForm.legalPerson" class="nav-input"  v-if="!realCompanyShow"></el-input><span v-if="realCompanyShow">{{user.idNo|encryptIdNo}}</span>
			  </el-form-item>
			  <el-form-item label="联系人姓名" prop="linkman">
			    <el-input v-model="ruleForm.linkman" class="nav-input"  v-if="!realCompanyShow"></el-input><span v-if="realCompanyShow">{{user.bankCardNo|encryptIdNo}}</span>
			  </el-form-item>
			  <el-form-item label="联系人电话" prop="linkMobile" class="nav-mobile">
			    <el-input v-model="ruleForm.linkMobile" class="nav-input"  v-if="!realCompanyShow"></el-input><span v-if="realCompanyShow">{{user.bankMobileNo|encryptMobile}}</span>
			  </el-form-item>
			   <el-form-item label="统一社会信用代码" prop="creditCode" class="nav-mobile">
			    <el-input v-model="ruleForm.creditCode" class="nav-input"  v-if="!realCompanyShow"></el-input><span v-if="realCompanyShow">{{user.bankMobileNo|encryptMobile}}</span>
			  </el-form-item>
			  <!--<p class="addP addUpload">
			  	<span class="addSpan addSpan2">营业执照</span>
			  	<el-upload
				  class="avatar-uploader"
				  action="https://yadong.test.manmanh.com"
				  :show-file-list="false"
				  :on-success="handleAvatarSuccess"
				  :before-upload="beforeAvatarUpload">
				  <img v-if="imageUrl" :src="imageUrl" class="avatar">
				  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
				</el-upload>
			  </p>-->
			  <!--<p><span class="addSpan addSpan2">营业执照</span><input type="file" id="file" name="myfile" @change="preImg('file','imgPre')" /></p>-->
			  <!--<img id="imgPre" src="" width="150px" height="150px" style="display: block;" />--> 
			  <p><span class="addSpan addSpan2">营业执照</span><label style="border: 1px solid #ccc; overflow: hidden; position: relative; display: inline-block; width: 150px; height: 150px;" >
			  	     <img id="imgPre" src="" width="150px" height="150px" style="display: block; float: left;" /> 
			         <input type="file"  id="file"  accept="image/*" style="display: none;" @change="preImg('file','imgPre')"/>
			      </label>
			  </p>
			   <p  class="upLoad-p">只能上传jpg/jpeg/png文件，且不超过2M</p>
			   <el-form-item>
			    <el-button type="primary" @click="companySumbit('ruleForm')" :loading="loading2" v-if="!realCompanyShow">立即认证</el-button>
			  </el-form-item>
			</el-form>
		</div>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'
	import { encryptIdNo,encryptMobile,getFileUrl} from '@/utils/utils'
	export default{
		data(){
			return{
				imageUrl: '',
				options:[],
				personalShow:true,
				selectType:'1',
				loading1:false,
				loading2:false,
				realShow:false,
				realCompanyShow:false,
				ruleForm: {
		          name: '',
		          idCard:'',
		          bankNo:'',
		          mobileNo:'',
		          companyName:'',
		          legalPerson:'',
		          linkman:'',
		          linkMobile:'',
		          creditCode:'',
		          workSpace:[],
		          workAddress:"",
		        },
//		        rules: {
//		          name: [
//		            { required: true, message: '请填写真实姓名', trigger: 'blur' },
//		            { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
//		          ],
//		          idNo: [
//		            { required: true, message: '请填写身份证号', trigger: 'blur' },
//		            { min: 18, max: 18, message: '长度位18位字符', trigger: 'blur' }
//		          ],
//		          mobileNo: [
//		            { required: true, message: '请填写手机号', trigger: 'blur' },
//		            { min: 11, max: 11, message: '长度为11位数字',trigger: 'blur' }
//		          ],
//		           bankNo: [
//		            { required: true, message: '请填写银行卡号码', trigger: 'blur'},
//		          ],
//		           companyName: [
//		            { required: true, message: '请填写公司名称', trigger: 'blur'},
//		          ],
//		           legalPerson: [
//		            { required: true, message: '请填写法人姓名', trigger: 'blur'},
//		          ],
//		           linkman: [
//		            { required: true, message: '请填写联系人姓名', trigger: 'blur'},
//		          ],
//		           linkMobile: [
//		            { required: true, message: '请填写联系人电话', trigger: 'blur'},
//		          ],
//		           creditCode: [
//		            { required: true, message: '请填写统一社会信用代码', trigger: 'blur'},
//		          ],
//		        },
			}
		},
		filters:{
			encryptIdNo,
			encryptMobile
		},
		watch:{
			selectType:function(data){
				if(this.selectType=="1"){
					this.personalShow=true
				}else{
					this.personalShow=false
				}
			}
		},
		mounted:function(){
			if(this.userInfo.mobileNo){
				if(this.userInfo.isVerified){
					this.realShow=true
					this.user=this.userInfo
				}
			}else{
				this.$router.push({path:'/personal/account'})
			}
		},
		methods:{
			 handleAvatarSuccess(res, file) {
		        this.imageUrl = URL.createObjectURL(file.raw);
		        this.$message.success('上传图片成功');
		      },
		      beforeAvatarUpload(file) {
//		        const isJPG = file.type === 'image/png/'
		        const isLt2M = file.size / 1024 / 1024 < 2;
		        if (!isLt2M) {
		          this.$message.error('上传图片大小不能超过 2MB!');
		        }
		        return isLt2M;
		      },
			submitForm(formName){
				  this.$refs[formName].validate((valid) => {
		          if (valid) {
		          	     this.loading1=true
		                 const url=this.$backStage('/api/user/fourElementAuth')
					     this.$http.post(url,{"id":this.userInfo.id,"realName":this.ruleForm.name,"bankMobileNo":this.ruleForm.mobileNo,"idNo":this.ruleForm.idNo,"bankCardNo":this.ruleForm.bankNo})
					      .then((response) => {
					      	  this.loading1=false
					      	  if(response.data.status==200){
					      	  	this.$alert('实名认证成功', '系统提示', {
							          confirmButtonText: '确定',
							    });
							    this.$store.dispatch('UserInfo', response.data.obj)
							    this.$router.push({path:'/personal/account'})
					      	  }else{
					      	  	this.$alert(response.data.msg, '系统提示', {
							          confirmButtonText: '确定',
							    });
					      	  }
					      }).catch(function(response){
			                          this.loading1=false
			                })
					      	
		          } else {
		            return false;
		          }
		        });
			},
			companySumbit(formName){
				console.log(window.URL.createObjectURL(document.getElementById("file").files.item(0)))
				this.$refs[formName].validate((valid) => {
		          if (valid) {
		              this.loading2=true
//		               const url=this.$backStage('/api/company/submitComInfo')
//					     this.$http.post(url,{"userId":this.userInfo.id,"comName":this.ruleForm.companyName,"comAddrCode":this.ruleForm.workSpace,"comAddrDetail":this.ruleForm.workAddress,"legalName":this.ruleForm.legalPerson,"contactName":this.ruleForm.linkman,"contactMobile":this.ruleForm.linkMobile,"creditCode":this.ruleForm.creditCode,"busiLicenseUrl":""})
//					      .then((response) => {
//					      	  this.loading2=false
//					      	  if(response.data.status==200){
//					      	  	this.$alert('实名认证成功', '系统提示', {
//							          confirmButtonText: '确定',
//							    });
//							    this.$store.dispatch('UserInfo', response.data.obj)
//							    this.$router.push({path:'/personal/account'})
//					      	  }else{
//					      	  	this.$alert(response.data.msg, '系统提示', {
//							          confirmButtonText: '确定',
//							    });
//					      	  }
//					      }).catch(function(response){
////			                          this.loading2=false
//			                })
			     		var fileObj = document.getElementById("file").files; // 获取文件对象
			            var FileController = this.$backStage('/api/company/submitComInfo');                    // 接收上传文件的后台地址 
			            // FormData 对象
			            var form = new FormData();
			            form.append("file", fileObj[0])
			            form.append("userId", this.userInfo.id)
			            form.append("comName", this.ruleForm.companyName)
			            form.append("comAddrCode",this.ruleForm.workSpace)
			            form.append("comAddrDetail", this.ruleForm.workAddress)
			            form.append("legalName", this.ruleForm.legalPerson)
			            form.append("contactName", this.ruleForm.linkman)
			            form.append("contactMobile", this.ruleForm.linkMobile)
			            form.append("creditCode",this.ruleForm.creditCode )
		                var _this=this
			            _this.$http.post(FileController, form).then(response=>{  
			            	console.log(response)
			            	this.loading2=false
			            	if(response.data.status==200){
			            		_this.$alert("认证成功", '系统提示', {
					                  confirmButtonText: '确定',
							    });
				                _this.$router.push({path:'/reconcil/checkList'})
			            	}else{
			            		_this.$alert(response.data.message, '系统提示', {
							        confirmButtonText: '确定',
							    });
			            	}
				         })  
		          }
		        })
			},
			preImg(sourceId, targetId){ 
				
				var fileObj = document.getElementById("file").files; // 获取文件对象
			            var FileController = this.$backStage('/api/company/upload/busiLiceImg');                    // 接收上传文件的后台地址 
			            // FormData 对象
			            var form = new FormData();
			            form.append("file", fileObj[0])
			            var _this=this
			            _this.$http.post(FileController, form).then(response=>{  
			            	console.log(response)
			            	this.loading2=false
			            	if(response.status==200){
			            		var url = getFileUrl(sourceId); 
								var imgPre = document.getElementById(targetId); 
								imgPre.src = url; 
			            		_this.$alert("上传成功", '系统提示', {
					                  confirmButtonText: '确定',
							    });
			            	}else{
			            		_this.$alert(response.data.message, '系统提示', {
							        confirmButtonText: '确定',
							    });
			            	}
				         })  
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
	   padding-top: 50px;
	}
	.content .p-head{
		padding-left: 20%;
		font-size: .24rem;
	}
	.content .selectype{
		margin-top: .2rem;
		padding-left: 35%;
		font-size: .2rem;
	}
	.el-steps{
		padding: 0 200px;
	}
	.el-form-item{
		margin-bottom: .36rem;
	}
	.nav2 .el-form-item{
		margin-bottom: .2rem;
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
		width: 3rem ;
	}
	.work-input{
		width: 3rem;
		margin-left: 150px;
		margin-bottom: .2rem;
	}
	.nav-mobile{
		position: relative;
	}
	.addP{
		margin-bottom: .2rem;
	}
	.addP .el-cascader{
		width: 3rem;
	}
	.addUpload{
		margin-top: .3rem;
	}
	.addSpan{
		font-size: 14px;
		color: #606266;
		width: 150px;
		display: inline-block;
	}
	.addSpan2{
		float: left;
	}
	#imgPre{
		
	}
 .avatar-uploader{
 	padding-left: 150px;
 	padding-top: .1rem;
 }
  .avatar-uploader-icon {
  	border: 1px #ccc dashed;
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .upLoad-p{
  	padding-left: 150px;
  	margin-bottom: .2rem;
  }
</style>