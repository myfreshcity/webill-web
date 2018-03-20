<!--还款详情-->

<template>
	<div class="content">
	  <div class="filter-container client-serach">
	  	<el-form :inline="true" :model="formSearch" class="demo-form-inline">
        <el-form-item label="客户姓名">
          <el-input v-model="formSearch.realName" placeholder="客户姓名"></el-input>
        </el-form-item>
        <el-form-item label="合同编号">
		    <el-input v-model="formSearch.mobileNo" placeholder="合同编号"></el-input>
		  </el-form-item>
		  <el-form-item label="证件号码">
		    <el-input v-model="formSearch.idNo" placeholder="证件号码"></el-input>
		  </el-form-item>
		  <el-form-item>
		    <el-button type="primary" @click="onSearch" :loading="loading1">查询</el-button>
		    <el-button type="primary" @click="clear" >清空</el-button>
		  </el-form-item>
		</el-form>
	  </div>
	  <ul class="client-ul">
	  	<p><span class="client-spanLeft">数据列表</span><el-button type="primary" @click="guide()" :loading="downloadLoading">导入合同</el-button></p>
	  	<li class="client-li"><span>合同编号</span><span>客户姓名</span><span class="client-span-card">身份证</span><span>借款金额</span><span >放款日期</span><span>期数</span><span>合同状态</span><span>逾期天数</span><span>操作</span></li>
	  	<li v-for="(ele,k) in contractList">
	  		<span >{{ele.contract_no}}</span>
	  		<span >{{ele.customer}}</span>
	  		<span class="client-span-card">{{ele.id_number}}</span>
	  		<span >{{ele.loan_amount}}</span>
	  		<span >{{ele.loan_date}}</span>
	  		<span >{{ele.tensor}}</span>
	  		<span >{{ele.check_status}}</span>
	  		<span >{{ele.overtime_tensor}}</span>
	  		<span @click="checkDetail(ele.contract_no)" class="span-check">还款计划</span>
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
	  	 <p class="p1 component-item"><span>合同 &nbsp;&nbsp;模板下载</span><el-button v-waves type="primary"><svg-icon icon-class="downLoad" /> 模 板</el-button></p>
         <p class="p2">(请先下载Excel模板，按照模板格式填写数据，以确保数据格式正确)</p>
         <p class="p1"><span>上传流水文件</span><input type="file" id="file" name="myfile" /></p>
         <p class="p2">(只支持.xls文件，切勿更改文件后缀名。） </p>
         <p class="p3">注：仅支持当天之前的流水对账，且不允许重复对账</p>
         <p class="p4"><el-button v-waves type="primary" @click="cancel()">取消</el-button><el-button v-waves type="primary" @click="UpladFile()">上传</el-button></p>
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
      	loading1:false,
      	loading2:false,
      	totalCount:0,
      	contractList:[],
      	latestReportType:'',
      	filename:"",
      	isGuide:false,
      	bgShow:false,
      	formSearch:{
      		realName:"",
      		date:"",
      		contractNo:"",
      	},
      	currentPage:1,
      }
    },
    filters:{
    	msgType(index){
    		if(index==0){
    			return "基础版"
    		}else{
    			return "标准版"
    		}
    	},
    	msgStatus(index){
    		if(index==-1){
    			return "准备获取"
    		}else if(index==0){
    			return "获取中"
    		}else if(index==1){
    			return "获取成功"
    		}else{
    			return "获取失败"
    		}
    	}
    },
    mounted:function(){
		 $(window).unbind ('scroll');
//  	   if(this.userInfo.mobileNo){
	           var data = new FormData();
	           data.append('userId', 'this.userInfo.id');
	           data.append('page', 1);
	           data.append('contract_no', this.formSearch.contractNo);
	           data.append('customer', this.formSearch.realName);
	           data.append('all',0);
	           data.append('check_date', this.formSearch.date);
	           const url=this.$checkStage('/charge/contract/get')
	           this.$http.post(url, data).then((response) => {
	           	            console.log(response)
	                        this.contractList=response.data.contract_list
	                        this.totalCount=response.data.num
	                    }, (response) => {

	                    });
    },
     methods: {
     	checkDetail(data){
     		this.$store.dispatch('ContractNo', data)
     		this.$router.push({path:'/reconcil/repaymentPlan'})
     	},
     	UpladFile(){
	     		var fileObj = document.getElementById("file").files[0]; // 获取文件对象
	
	            var FileController = 'http://yadong.test.manmanh.com/charge/upload';                    // 接收上传文件的后台地址 
	
	            console.log(fileObj)
	            // FormData 对象
	            var form = new FormData();
	//          form.append("author", "hooyes");                        // 可以增加表单数据
	            form.append("file", fileObj);                           // 文件对象
	            // XMLHttpRequest 对象
	            var xhr = new XMLHttpRequest();
	            xhr.open("post", FileController, true);
	            xhr.send(form);
	            xhr.onload = function () {
	                this.$alert("上传成功", '系统提示', {
		                  confirmButtonText: '确定',
				    });
	            };
	          
	    },
     	guide(){
     		this.isGuide=true
     		this.bgShow=true
     	},
     	cancel(){
     		this.isGuide=false
     		this.bgShow=false
     	},
     	showBg(){
     		this.isGuide=false
     		this.bgShow=false
     	},
      clear(){
      	this.formSearch.realName=""
      	this.formSearch.mobileNo=""
      	this.formSearch.idNo=""
      	this.formSearch.latestReportStatus=""
      	this.formSearch.latestReportType=""
      	this.formSearch.latestReportTimeDatetime=""
      },
      
      handleCurrentChange(val) {
      	  if(val!=1){
       	   	   $(".el-pager").children("li").eq(0).removeClass("active");
       	   }
      	    var data = new FormData();
	           data.append('userId', 'this.userInfo.id');
	           data.append('page', val);
	           data.append('contract_no', this.formSearch.contractNo);
	           data.append('customer', this.formSearch.realName);
	           data.append('all',0);
	           data.append('check_date', this.formSearch.date);
	           const url=this.$checkStage('/charge/contract/get')
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
	           data.append('userId', 'this.userInfo.id');
	           data.append('page', 1);
	           data.append('contract_no', this.formSearch.contractNo);
	           data.append('customer', this.formSearch.realName);
	           data.append('all',0);
	           data.append('check_date', this.formSearch.date);
	           const url=this.$checkStage('/charge/contract/get')
	           this.$http.post(url, data).then((response) => {
	           	            this.loading1=false
	           	            console.log(response)
	                        this.contractList=response.data.contract_list
	                        this.totalCount=response.data.num
	                    }, (response) => {

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
		font-size: .14rem;
		border-radius: 5px;
	}
	.content .client-ul p{
		overflow: hidden;
		border-bottom: 1px #E3E7F1 solid;
		padding: .1rem .2rem;
		background: #F1F2F8;
	}
	.content .client-ul p .client-spanLeft{
		float: left;
		padding: .1rem 0;
	}
	.content .client-ul p button{
		float: right;
		margin-right: .3rem;
	}
	.content .client-ul li{
		display: flex;
		border-bottom: 1px #E3E7F1 solid;
	}
	.content .client-ul .client-li{
		background: #F1F2F8;
		font-size: .16rem;
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
		line-height: .4rem;
	}
	.content .client-ul li .client-span-card{
		flex: 1.5;
	}
	/*导入合同窗口*/
	.contract{
		width: 40%;
		height: 4rem;
		position: fixed;
		left: 50%;
		top:50% ;
		margin-left: -20%;
		margin-top: -2rem;
		border: 1px #E3E7F1 solid;
		background: #fff;
		padding: .3rem;
		z-index: 1000;
	}
	.p1{
		font-size: .2rem;
		margin-bottom: .3rem;
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
		color: #2299DD;
	}
</style>
