<!--对账列表-->

<template>
	<div class="content">
	  <div class="nav1">
			<p class="p-title"><span class="span-line"></span>合同信息</p>
			<p class="nav1-p">手机号码：<span>{{checkDetail.mobile_no}}</span></p>
			<p class="nav1-p">客户姓名：<span>{{checkDetail.customer}}</span></p>
			<p class="nav1-p">身份证号：<span>{{checkDetail.id_number}}</span></p>
			<p class="nav1-p">合同编号：<span>{{checkDetail.contract_no}}</span></p>
			<p class="nav1-p">借款金额：<span>{{checkDetail.contract_amount}}</span></p>
			<p class="nav1-p">放款金额：<span>{{checkDetail.loan_amount}}</span></p>
			<p class="nav1-p">放款日期：<span>{{checkDetail.loan_date}}</span></p>
			<p class="nav1-p">所在门店：<span>{{checkDetail.shop}}</span></p>
			<p class="nav1-p">客户经理：<span>{{checkDetail.sale_person}}</span></p>
			<p class="nav1-p">导入时间：<span>{{checkDetail.created_time}}</span></p>
	  </div>
	  <div class="nav1">
	  	  <p class="p-title"><span class="span-line"></span>还款计划</p>
		  <ul class="client-ul">
		  	<li class="client-li"><span>合同编号</span><span>还款日期</span><span>还款期数</span><span >应还本息</span><span>应还滞纳金</span><span>实还本息</span><span>实还滞纳金</span><span>本息缴清日</span><span>还款状态</span></li>
		  	<li v-for="(ele,k) in repaymentList">
		  		<span >{{ele.contract_no}}</span>
		  		<span >{{ele.deadline}}</span>
		  		<span >{{ele.tensor}}</span>
		  		<span >{{ele.amount}}</span>
		  		<span >{{ele.fee}}</span>
		  		<span >{{ele.actual_amt}}</span>
		  		<span >{{ele.actual_fee}}</span>
		  		<span >{{ele.settled_date}}</span>
		  		<span >
		  			<el-tooltip class="item" effect="dark" content="还款中" placement="right"><svg-icon icon-class="wait" v-show="ele.is_settled==0&&ele.delay_day<1"/></el-tooltip>
		  			<el-tooltip class="item" effect="dark" content="结清" placement="right"><svg-icon icon-class="duihao" v-show="ele.is_settled==1" class="duihao"/></el-tooltip>
		  			<el-tooltip class="item" effect="dark" content="逾期" placement="right"><svg-icon icon-class="yuqi" v-show="ele.is_settled==0&&ele.delay_day>0"/></el-tooltip>
		  		</span>
		  	</li>
		  </ul>
	  </div>
	  <div class="nav1">
	  	  <p class="p-title"><span class="span-line"></span>处理历史</p>
	  	  <ul class="client-ul">
		  	<li class="client-li">
		  		<span class="date-span">申请时间</span>
          <span>减免方式</span>
			 	<span>实还金额</span>
			 	<span>减免金额</span>
			 	<span>是否有效</span>
			 	<span class="remark-span">备注</span>
		  	</li>
		  	<li v-for="(ele,k) in historyList">
		  	<span class="date-span">{{ele.apply_date}}</span>
          <span>{{ele.discount_type | discountType}}</span>
			 	<span>{{ele.pay_amt}}</span>
			 	<span>{{ele.amount}}</span>
			 	<span>{{ele.result|resultFilter}}</span>
			 	<span  class="remark-span">{{ele.remark}}</span>
		  	</li>
		  	<li v-if="historyList.length==0" class="noRecord">无记录</li>
		  </ul>
	  </div>
	  <div class="nav1">
	  	  <p class="p-title"><span class="span-line"></span>冲账历史</p>
	  	  <ul class="client-ul">
		  	<li class="client-li"><span>支付时间</span><span>姓名</span><span>还款金额</span><span>冲账余额</span><span >还款渠道</span><span>流水创建时间</span></li>
		  	<li v-for="(ele,k) in checkDetail.real_pays">
					<span>{{ele.refund_time}}</span>
					<span>{{ele.refund_name}}</span>
					<span>{{ele.amount}}</span>
					<span>{{ele.remain_amt}}</span>
					<span>{{ele.way}}</span>
					<span>{{ele.create_time}}</span>
				</li>
		  </ul>
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
    props: {
      detailType: {
        type: String,
        default: 'detail'
      }
    },
    data() {
      return {
      	historyList:[],
      	checkDetail:{},
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
      		sortWay:"",
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
    	},
    	resultFilter(index){
			if(index===0){
				return "待审核"
			}else if(index===100){
				return "通过"
			}else if(index===200){
				return "拒绝"
			}else{
				return ""
			}
		},
		discountType(index){
			if(index==1){
				return "有息结清"
			}else if(index==2){
				return "无息结清"
			}else{
				return "不结清"
			}
		},
    },
    mounted:function(){
			 $(window).unbind ('scroll');
			   const checkUrl=this.$checkStage('/charge/contract/detail/get')
	           this.$http.post(checkUrl, {"is_overtime":0,"contract_id":this.$route.params.contractId}).then((response) => {
	           	            console.log(response)
	           	            this.checkDetail=response.data
	           	            this.repaymentList=response.data.overtime_list
	           	            this.historyList=response.data.commit_history
	                    }, (response) => {

	                    });
     },
     methods: {


    },
    computed: {
	    ...mapGetters([
	      'userInfo',
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
		margin-top: 20px;

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
		border: 1px #E3E7F1 solid;
		border-right:none ;
		border-top: none;
		display: flex;
	}
	.content .client-ul li:hover{
		background: #ecf5ff;
	}
	.content .client-ul .client-li{
		border-top: 1px #E3E7F1 solid;
		background: #F1F2F8;
		font-size: 14px;
		font-weight: bold;
	}
	.content .client-ul .client-li:hover{
		background: #F1F2F8;
	}
	.content .client-ul .client-li span{
		font-weight: bold;
	}
	.content .client-ul li span{
		flex: 1;
		text-align: center;
		padding: .1rem 0;
		border-right: 1px #E3E7F1 solid;
		line-height: 20px;
		font-size: 14px;
	}
	.content .client-ul li .client-span-card{
		flex: 1.5;
	}
	.content .client-ul li  .svg-icon{
		font-size: 20px;
	}
	.duihao{
		color: #10C55B;
	}
	.p-title{
		font-size: 14px;
	}
	.span-line{
		float: left;
		width: 5px;
		height: 16px;
		background: #0BB1FF;
		margin-right: 5px;
	}
	.nav1{
		padding: .2rem .3rem;
	}
	.nav1 .nav1-p{
		padding-left: 30px;
		margin-top: 20px;
		font-size: 14px;
	}
	.nav1 .nav1-p span{
		margin-right: 30px;
	}
	.nav1 ul li .remark-span{
		flex:3;
	}
	.nav1 ul li .date-span{
		flex:2;
	}
	.nav1 ul .noRecord{
		display: block;
		text-align: center;
		line-height: 50px;
		font-size: 14px;
	}
</style>
