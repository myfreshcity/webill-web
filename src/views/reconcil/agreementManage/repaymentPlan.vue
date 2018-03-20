<!--对账列表-->

<template>
	<div class="content">
	  <ul class="client-ul">
	  	<p><span class="client-spanLeft">数据列表</span></p>
	  	<li class="client-li"><span>合同编号</span><span>还款日期</span><span>还款期数</span><span >应还本息</span><span>实际还款日期</span><span>还款状态</span></li>
	  	<li v-for="(ele,k) in repaymentList">
	  		<span >{{contractNo}}</span>
	  		<span >{{ele.deadline}}</span>
	  		<span >{{ele.tensor}}</span>
	  		<span >{{ele.amount}}</span>
	  		<span >{{ele.settled_date}}</span>
	  		<span >{{ele.refund_status}}</span>
	  	</li>
	  </ul>
	 
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
      	repaymentList:[], 
      	loading1:false,
      	loading2:false,
      	totalCount:0,
      	clientList:[],
      	latestReportType:'',
      	filename:"",
      	formSearch:{
      		latestReportTimeDatetime:"",
      		realName:"",
      		mobileNo:"",
      		idNo:"",
      		latestReportType:"",
      		latestReportStatus:"",
      		start:0,
      		length:10,
      		sortWay:""
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
    	   console.log(this.contractNo)
			 $(window).unbind ('scroll');
			   const checkUrl=this.$checkStage('/charge/contract/detail/get')
	           this.$http.post(checkUrl, {'contract_no':this.contractNo}).then((response) => {
	           	            console.log(response)
	           	            this.repaymentList=response.data.overtime_list
	                    }, (response) => {

	                    });
     },
     methods: {
	   
      
    },
    computed: {
	    ...mapGetters([
	      'msgType',
	      'userInfo',
	      'contractNo'
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
</style>
