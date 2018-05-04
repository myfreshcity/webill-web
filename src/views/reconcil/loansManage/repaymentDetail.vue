<!--合同列表-->

<template>
	<div class="content">
	  <div class="filter-container client-serach">
	  	<el-form :inline="true" :model="formSearch" class="demo-form-inline">
        <el-form-item label="">
          <el-input v-model="formSearch.realName" placeholder="客户姓名"></el-input>
        </el-form-item>
        <el-form-item label="">
		    <el-input v-model="formSearch.contractNo" placeholder="合同编号"></el-input>
		  </el-form-item>
		  <el-form-item label="">
		    <el-input v-model="formSearch.idNo" placeholder="证件号码"></el-input>
		  </el-form-item>
		   <el-form-item label="">
		    <el-select v-model="formSearch.checkStatus" placeholder="合同状态">
		      <el-option label="还款中" value="0"></el-option>
		      <el-option label="逾期" value="100"></el-option>
		      <el-option label="移交外催" value="200"></el-option>
		      <el-option label="结清" value="300"></el-option>
		    </el-select>
		  </el-form-item>
		   <el-form-item label="">
		    <el-input v-model="formSearch.file_id" placeholder="合同批次号"></el-input>
		  </el-form-item>
		  <el-form-item>
		    <el-button type="primary" @click="onSearch" :loading="loading1">查询</el-button>
		    <el-button  @click="clear" >清空</el-button>
		  </el-form-item>
		</el-form>
	  </div>
	  <p class="ul-head"><span class="client-spanLeft">数据列表</span><el-button type="primary" @click="guide()" :loading="downloadLoading">导入合同</el-button></p>
	  <ul class="client-ul">
	  	
	  	<li class="client-li"><span>合同编号</span><span>客户姓名</span><span class="client-span-card">身份证</span><span>借款金额</span><span >放款日期</span><span>期数</span><span>合同状态</span><span>合同批次号</span><span>操作</span></li>
	  	<li v-for="(ele,k) in contractList">
	  		<span >{{ele.contract_no}}</span>
	  		<span >{{ele.customer}}</span>
	  		<span class="client-span-card">{{ele.id_number}}</span>
	  		<span >{{ele.contract_amount}}</span>
	  		<span >{{ele.loan_date}}</span>
	  		<span >{{ele.tensor}}</span>
	  		<span :class="{'redSpan':ele.check_status==0}">{{ele.is_settled|checkFilter}}</span>
	  		<span>{{ele.file_id}}</span>
	  		<span @click="checkDetail(ele.contract_id)" class="span-check"><el-button type="text">查看详情</el-button></span>
	  	</li>
	  </ul>
	  <div class="block" id="foot-page">
	    <el-pagination
	      @current-change="handleCurrentChange"
	      :current-page="currentPage"
	      :page-size="10"
	      layout="total, prev, pager, next, jumper"
	      :total="totalCount">
	    </el-pagination>
	  </div>
	  <div class="contract" v-show="isGuide">
	  	  选择模板  <el-select v-model="value" placeholder="请选择">
		    <el-option
		      v-for="item in options"
		      :key="item.value"
		      :label="item.label"
		      :value="item.value">
		    </el-option>
		  </el-select>
	  	 <p class="p1 component-item"><span>模板下载</span><el-button v-waves type="primary" @click="downLoad"><svg-icon icon-class="downLoad" /> 模 板</el-button></p>
         <p class="p2">(请先下载Excel模板，按照模板格式填写数据，以确保数据格式正确)</p>
         <p class="p1"><span>上传合同文件</span><input type="file" id="file" name="myfile" multiple="multiple" accept=".xls"/></p>
         <p class="p2">(只支持.xls文件，切勿更改文件后缀名。） </p>
         <p class="p4"><el-button v-waves type="primary" @click="cancel()">取消</el-button><el-button v-waves type="primary" @click="UpladFile()" :loading="loading">上传</el-button></p>
	  </div>
	  <div class="bg" v-show="bgShow" @click="showBg()">
	  	
	  </div>
	</div>
</template>

<script>
  import $ from 'jquery'
  import { mapGetters } from 'vuex'
  import { getLoginUser } from '@/utils/utils'
  import { getToken } from '@/utils/auth' // 验权
  import Cookies from 'js-cookie'
  import waves from '@/directive/waves/index.js' // 水波纹指令
  export default {
  	directives: {
		waves
    },
    data(){
        return {
	      	downloadLoading:false,
	      	loading:false,
	      	loading1:false,
	      	totalCount:0,
	      	contractList:[],
	      	isGuide:false,
	      	bgShow:false,
	      	formSearch:{
	      		realName:"",
	      		idNo:"",
	      		contractNo:"",
	      		checkStatus:"",
	      		file_id:""
	      	},
	      	 options: [{
	          value: '选项1',
	          label: '模板一'
	        }, {
	          value: '选项2',
	          label: '模板二'
	        }],
	        value: '',
	      	currentPage:1,
      }
    },
    filters:{
    	checkFilter(index){
    		if(index==0){
    			return "还款中"
    		}else if(index==100){
    			return "逾期"
    		}else if(index==200){
    			return "移交外催"
    		}else if(index==300){
    			return "结清"
    		}
    	}
    },
    watch:{
    	value:function(data){
    		if(this.value=='模板一'){
    			console.log(1)
    		}else{
    			console.log(2)
    		}
    	}
    },
    mounted:function(){
		 $(window).unbind ('scroll');
	           var data = new FormData();
	           data.append('userId', this.userInfo.id);
	           data.append('page', 1);
	           data.append('contract_no', this.formSearch.contractNo);
	           data.append('customer', this.formSearch.realName);
	           data.append('all',1);
	           data.append('is_settled',this.formSearch.checkStatus);
	           data.append('id_number', this.formSearch.idNo);
	           data.append('file_id', this.formSearch.file_id);
	           const url=this.$checkStage('/charge/contract/select')
	           this.$http.post(url, data).then((response) => {
	           	            console.log(response)
	                        this.contractList=response.data.contract_list
	                        this.totalCount=response.data.num
	                    }, (response) => {

	                    });
    },
     methods: {
     	checkDetail(data){
     		sessionStorage.setItem('extraData',data)
     		this.$router.push({path:'/reconcil/repaymentPlan'})
     	},
     	UpladFile(){
     		    if(document.getElementById("file").files.length==0){
		 			this.$alert("未选择文件", '系统提示', {
			                  confirmButtonText: '确定',
					});
		 		}else{
     			this.loading=true
	     		var fileObj = document.getElementById("file").files; // 获取文件对象
	            var FileController = this.$checkStage('/charge/plan/upload');                    // 接收上传文件的后台地址 
	            // FormData 对象
	            var form = new FormData();
//	            for(var i=0;i<fileObj.length;i++){      
//               form.append("file["+i+"]", fileObj[i]); //++++++++++    
//               }   
               form.append("file", fileObj[0])
	//          form.append("author", "hooyes");                        // 可以增加表单数据
//	            form.append("file", fileObj);                           // 文件对象
	            var _this=this
	            _this.$http.post(FileController, form).then(response=>{  
	            	console.log(response)
	            	if(response.data.isSucceed==200){
	            		_this.$alert("上传成功", '系统提示', {
			                  confirmButtonText: '确定',
					    });
					    _this.loading=false
		                _this.$router.push({path:'/backPage'})
	            	}else{
	            		_this.$alert(response.data.message, '系统提示', {
					        confirmButtonText: '确定',
					    });
					    _this.loading=false
	            	}
		         })  
	          }
	    },
	    downLoad(){
	    	window.open(this.$checkStage('/charge/plan/download'))
	    },
     	guide(){
     		this.$router.push({path:'/reconcil/contractSelf'})
//   		this.isGuide=true
//   		this.bgShow=true
     	},
     	cancel(){
     		this.loading=false
     		this.isGuide=false
     		this.bgShow=false
     	},
     	showBg(){
     		this.loading=false
     		this.isGuide=false
     		this.bgShow=false
     	},
      clear(){
      	this.formSearch.realName=""
      	this.formSearch.date=""
      	this.formSearch.contractNo=""
      	this.formSearch.checkStatus=""
      	this.formSearch.file_id=""
      },
      
      handleCurrentChange(val) {
      	  if(val!=1){
       	   	   $(".el-pager").children("li").eq(0).removeClass("active");
       	   }
      	    var data = new FormData();
	           data.append('userId', this.userInfo.id);
	           data.append('page', val);
	           data.append('contract_no', this.formSearch.contractNo);
	           data.append('customer', this.formSearch.realName);
	           data.append('all',1);
	           data.append('is_settled',this.formSearch.checkStatus);
	           data.append('id_number', this.formSearch.idNo);
	           data.append('file_id', this.formSearch.file_id);
	           const url=this.$checkStage('/charge/contract/select')
	           this.$http.post(url, data).then((response) => {
	           	            console.log(response)
	                        this.contractList=response.data.contract_list
	                        this.totalCount=response.data.num
	                    }, (response) => {

	                    });
      },
      onSearch(){
      	this.loading1=true
      	 var data = new FormData();
	           data.append('userId', this.userInfo.id);
	           data.append('page', 1);
	           data.append('contract_no', this.formSearch.contractNo);
	           data.append('customer', this.formSearch.realName);
	           data.append('all',1);
	           data.append('is_settled',this.formSearch.checkStatus);
	           data.append('id_number', this.formSearch.idNo);
	           data.append('file_id', this.formSearch.file_id);
	           const url=this.$checkStage('/charge/contract/select')
	           this.$http.post(url, data).then((response) => {
	           	            this.loading1=false
	           	            console.log(response)
	                        this.contractList=response.data.contract_list
	                        this.totalCount=response.data.num
	                    }, (response) => {
                            this.loading1=false
	                    });

      }
    },
    computed: {
	    ...mapGetters([
	      'msgType',
	      'userInfo'
	    ])
	}
  }
</script>

<style scoped>
	.content {
		padding-top: 10px;
	}
	.client-serach .el-input{
		width: 1.9rem;
	}
	.client-serach .dataInp{
		width: 2.1rem;
	}

	.client-serach .el-select{
		width: 1.9rem;
	}
	/*dataInp*/
	.el-button--primary{
		margin-left: .2rem;
	}
	.content .client-ul{
		margin: 0 20px;
		border: 1px #E3E7F1 solid;
		border-right:none ;
		border-bottom: none;
		font-size: 12px;
		border-radius: 5px;
	}
	.ul-head{
		padding: .1rem .2rem;
		overflow: hidden;
		margin-bottom: .1rem;
	}
	.ul-head .client-spanLeft{
		float: left;
		padding: .1rem 0;
		font-weight: bold;	
		font-size: 16px;	
	}
	.ul-head button{
		float: right;
		/*margin-right: .3rem;*/
	}
	.content .client-ul li{
		display: flex;
		border-bottom: 1px #E3E7F1 solid;
	}
	.content .client-ul li:hover{
		background: #ecf5ff;
	}
	.content .client-ul .client-li{
		background: #F1F2F8;
		font-size: 14px;
		font-weight: bold;
	}
	.content .client-ul .client-li span{
		font-weight: bold;
	}
	.content .client-ul li span{
		flex: 1;
		text-align: center;
		padding: .1rem 0;
		border-right: 1px #E3E7F1 solid;
		line-height: 50px;
		font-size: 14px;
	}
	.content .client-ul li .client-span-card{
		flex: 1.5;
	}
	/*导入合同窗口*/
	.contract{
		width: 40%;
		height: 4.4rem;
		position: fixed;
		left: 50%;
		top:50% ;
		margin-left: -20%;
		margin-top: -2.2rem;
		border: 1px #E3E7F1 solid;
		background: #fff;
		padding: .3rem;
		z-index: 1000;
	}
	.contract .el-select{
		margin-left: .2rem;
		width: 1.6rem;
	}
	.p1{
		font-size: .16rem;
		margin-bottom: .3rem;
		margin-top: .2rem;
	}
	.p1 button{
		padding: .1rem .2rem;
		margin-left: .3rem;
		text-align: center;
		font-size: .16rem;
	}
	.p1 input{
		margin-left: .3rem;
		outline: none;
		font-size: .16rem;
		display: inline-block;
		border-radius: .2rem;
	}
	.p2{
		color: #666;
		margin-bottom: .3rem;
	}
	.p3{
		color: red;
		margin-bottom: .2rem;
	}
	.p4 {
		text-align: center;
	}
	.bg{
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: #000;
		opacity: .3;
	}
	.span-check{
		color: #0BB1FF;
	}
	.span-check:hover{
		color: #333;
	}
	.redSpan{
		color: red;
	}
</style>
