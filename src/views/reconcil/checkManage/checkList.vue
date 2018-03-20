<!--对账列表-->

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
		    <el-date-picker class="dataInp"
                          v-model="formSearch.date"
                          type="date"
                          placeholder="对账日期"
                          value-format="yyyy-MM-dd">
            </el-date-picker>
		  </el-form-item>
		  <el-form-item>
		    <el-button type="primary" @click="onSearch" :loading="loading1">查询</el-button>
		    <el-button type="primary" @click="clear" >清空</el-button>
		  </el-form-item>
		</el-form>
	  </div>
	  <ul class="client-ul">
	  	<p><span class="client-spanLeft">数据列表</span><el-button type="primary" @click="handleDownload()" :loading="downloadLoading">导出数据</el-button></p>
	  	<li class="client-li"><span>合同编号</span><span>客户姓名</span><span class="client-span-card">身份证</span><span >还款期数</span><span>逾期期数</span><span>对账日期</span><span>对账状态</span><span>处理状态</span><span>操作</span></li>
	  	<li v-for="(ele,k) in contractList">
	  		<span >{{ele.contract_no}}</span>
	  		<span >{{ele.customer}}</span>
	  		<span class="client-span-card">{{ele.id_number}}</span>
	  		<span >{{ele.tensor}}</span>
	  		<span >{{ele.overtime_tensor}}</span>
	  		<!--<span >{{ele.overtime_days}}</span>-->
	  		<span >{{ele.upload_time}}</span>
	  		<span >{{ele.check_status|checkStatus}}</span>
	  		<span >{{ele.deal_status|dealStatus}}</span>
	  		<span @click="checkDetail(ele.contract_no)" class="span-check">查看详情</span>
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
	</div>
</template>

<script>
  import $ from 'jquery'
  import { mapGetters } from 'vuex'
  import { getLoginUser } from '@/utils/utils'
  import { getToken } from '@/utils/auth' // 验权
  import Cookies from 'js-cookie'
  export default {
    data() {
      return {
      	downloadLoading:false,
      	loading1:false,
      	loading2:false,
      	totalCount:0,
      	contractList:[],
      	latestReportType:'',
      	filename:"",
      	formSearch:{
      		realName:"",
      		date:"",
      		contractNo:"",
      	},
      	currentPage:1,
      }
    },
    filters:{
    	dealStatus(index){
    		if(index==0){
    			return "未处理"
    		}else{
    			return "已处理"
    		}
    	},
    	checkStatus(index){
    		if(index==0){
    			return "对账失败"
    		}else{
    			return "对账成功"
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
     		this.$router.push({path:'/reconcil/checkDetail'})
     	},
	    handleDownload() {
	      this.downloadLoading = true
	      import('@/vendor/Export2Excel').then(excel => {
	      	debugger
	        const tHeader = ['Id', 'Title', 'Author', 'Readings', 'Date']
	        const filterVal = ['id', 'id', 'id', 'id', 'id']
	        const list = this.clientList
	        const data = this.formatJson(filterVal, list)
	        excel.export_json_to_excel(tHeader, data, this.filename)
	        this.downloadLoading = false
	      })
	    },
	    formatJson(filterVal, jsonData) {
	      return jsonData.map(v => filterVal.map(j => {
//	        if (j === 'timestamp') {
//	          return parseTime(v[j])
//	        } else {
	          return v[j]
//	        }
	      }))
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
	.span-check{
		color: #0BB1FF;
	}
	.span-check:hover{
		color: #2299DD;
	}
</style>
