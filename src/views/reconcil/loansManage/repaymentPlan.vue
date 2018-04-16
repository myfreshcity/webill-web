<!--对账列表-->

<template>
	<div class="content">
	  <ul class="client-ul">
	  	<p><span class="client-spanLeft">数据列表</span></p>
	  	<li class="client-li"><span>合同编号</span><span>还款日期</span><span>还款期数</span><span >应还本息</span><span>应还滞纳金</span><span>实还本息</span><span>实还滞纳金</span><span>实际还款日期</span><span>还款状态</span></li>
	  	<li v-for="(ele,k) in repaymentList">
	  		<span >{{ele.contract_no}}</span>
	  		<span >{{ele.deadline}}</span>
	  		<span >{{ele.tensor}}</span>
	  		<span >{{ele.amount}}</span>
	  		<span >{{ele.fee}}</span>
	  		<span >{{ele.actual_amt}}</span>
	  		<span >{{ele.actual_fee}}</span>
	  		<span >{{ele.settled_date}}</span>
	  		<span ><svg-icon icon-class="wait" v-show="ele.is_settled==0&&ele.delay_day<1"/><svg-icon icon-class="duihao" v-show="ele.is_settled==1" class="duihao"/><svg-icon icon-class="yuqi" v-show="ele.is_settled==0&&ele.delay_day>0"/></span>
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
      	formSearch:{
      		realName:"",
      		mobileNo:"",
      		idNo:"",
      		start:0,
      		length:10,
      		sortWay:""
      	},
      	currentPage:1,
      }
    },
    filters:{
    	settledFilter(index){
    		if(index==1){
    			return "已结清"
    		}else{
    			return "未结清"
    		}
    	}
    },
    mounted:function(){
			 $(window).unbind ('scroll');
			 if(this.userInfo.mobileNo){
			   const checkUrl=this.$checkStage('/charge/contract/detail/get')
	           this.$http.post(checkUrl, {'contract_no':this.contractNo,"is_overtime":0,contract_id:this.contractId}).then((response) => {
	           	            console.log(response)
	           	            this.repaymentList=response.data.overtime_list
	                    }, (response) => {

	                    });
	         }else{
	         	this.$router.push({path:'/reconcil/repaymentDetail'})
	         }
     },
     methods: {
	   
      
    },
    computed: {
	    ...mapGetters([
	      'msgType',
	      'userInfo',
	      'contractNo',
	      'contractId'
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
	.content .client-ul li  .svg-icon{
		font-size: 24px;
	}
	.duihao{
		color: #10C55B;
	}
</style>
