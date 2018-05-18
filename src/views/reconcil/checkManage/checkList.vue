<!--对账列表-->

<template>
	<div class="content">
	  <div class="filter-container client-serach">
	  	<el-form :inline="true" :model="formSearch" class="demo-form-inline">
        <el-form-item label="">
          <el-input v-model="formSearch.realName" placeholder="客户姓名"></el-input>
        </el-form-item>
        <el-form-item label="">
		    <el-input v-model="formSearch.shop" placeholder="门店"></el-input>
		</el-form-item>
        <el-form-item label="">
		    <el-input v-model="formSearch.contractNo" placeholder="合同编号"></el-input>
		  </el-form-item>
		  <el-form-item label="">
		    <el-select v-model="formSearch.checkStatus" placeholder="合同状态">
		      <el-option label="还款中" value="0"></el-option>
		      <el-option label="逾期" value="100"></el-option>
		      <el-option label="结清" value="300"></el-option>
		    </el-select>
		  </el-form-item>
		  <el-form-item label="">
		    <el-date-picker class="dataInp"
                          v-model="formSearch.repayDate"
                          type="date"
                          placeholder="还款日"
                          value-format="yyyy-MM-dd">
            </el-date-picker>
		  </el-form-item>
		  <el-form-item label="逾期天数">
		    <el-input v-model="formSearch.startDate" placeholder="" class="dateRange"  type="number"></el-input>
		    -
		    <el-input v-model="formSearch.endDate" placeholder="" class="dateRange" type="number"></el-input>
		  </el-form-item>
		  <el-form-item>
		    <el-button type="primary" @click="onSearch" :loading="loading1">查询</el-button>
		    <el-button  @click="clear" >清空</el-button>
		  </el-form-item>
		</el-form>
	  </div>
	  <p class="ul-head"><span class="client-spanLeft">数据列表</span><el-button type="primary" @click="handleDownload()" :loading="downloadLoading">导出数据</el-button></p>
	  <ul class="client-ul">
	  	
	  	<li class="client-li"><span>合同编号</span><span>客户姓名</span><span>所在门店</span><span class="client-span-card">联系电话</span><span>放款日</span><span >下一还款日</span><span >最高逾期天数</span><span>合同状态</span><span>操作</span></li>
	  	<li v-for="(ele,k) in contractList">
	  		<span >{{ele.contract_no}}</span>
	  		<span >{{ele.customer}}</span>
	  		<span>{{ele.shop}}</span>
	  		<span class="client-span-card">{{ele.mobile_no}}</span>
	  		<span>{{ele.loan_date}}</span>
	  		<span>{{ele.repay_date}}</span>
	  		<span :class="{'leadDay':ele.delay_days<0}">{{ele.delay_days|decorateDelayDay}}</span>
	  		<span >{{ele.is_settled|checkStatus}}</span>
	  		<span @click="checkDetail(ele.contract_id)" class="span-check"><el-button type="text">详情</el-button></span>
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
  import { getLoginUser,timeStampToDate } from '@/utils/utils'
  import { getToken } from '@/utils/auth' // 验权
  import Cookies from 'js-cookie'
  export default {
    data() {
      return {
      	downloadLoading:false,
      	loading1:false,
      	totalCount:0,
      	contractList:[],
      	filename:"对账列表",
      	formSearch:{
      		realName:"",
      		repayDate:"",
      		contractNo:"",
      		dealType:"",
      		shop:"",       //门店
      		startDate:"",
      		endDate:"",
      		checkStatus:"",
      		page:1
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
    			return "还款中"
    		}else if(index==100){
    			return "逾期"
    		}else if(index==200){
    			return "移交外催"
    		}else if(index==300){
    			return "结清"
    		}
    	},
    	decorateDelayDay(index){
    		if(index<0){
    			return '('+Math.abs(index)+')'
    		}else if(index==null){
    			return '-'
    		}else{
    			return index
    		}
    	}
    },
    mounted:function(){
    	      $(window).unbind ('scroll');
    	      if(sessionStorage.getItem('checkshop')){
    	      	this.formSearch.shop=sessionStorage.getItem('checkshop')
    	      }
    	      this.formSearch.page=1
    	      var dd = new Date(); 
    	      this.formSearch.repayDate=timeStampToDate(dd.getTime());
    	      this.$options.methods.inquire.bind(this)()
    },
     methods: {
     	 inquire(){
      	       var data = new FormData();
	           data.append('userId', this.userInfo.id);
	           data.append('page', this.formSearch.page);
	           data.append('contract_no', this.formSearch.contractNo);
	           data.append('customer', this.formSearch.realName);
	           data.append('all',0);
	           data.append('repay_date',this.formSearch.repayDate);
	           data.append('shop',this.formSearch.shop);
	           data.append('from_yu_day',this.formSearch.startDate);
	           data.append('to_yu_day',this.formSearch.endDate);
	           data.append('is_dealt',this.formSearch.dealType);
	           data.append('is_settled',this.formSearch.checkStatus);
	           
	           const url=this.$checkStage('/charge/contract/select')
	           this.$http.post(url, data).then((response) => {
	           	            this.loading1=false
	           	            console.log(response)
	                        this.contractList=response.data.contract_list
	                        this.totalCount=response.data.num
	                    }, (response) => {
                            this.loading1=false
	                    });
        },
     	checkDetail(contractId){
     		let routeData = this.$router.resolve({path:'/reconcil/checkDetail/'+contractId})
     		window.open(routeData.href,'_blank')
     	},
	    handleDownload() {
	      
	      this.downloadLoading = true
	      import('@/vendor/Export2Excel').then(excel => {
	        const tHeader = ['合同编号', '客户姓名', '身份证', '还款期数', '逾期期数','对账状态','处理状态','备注']
	        const filterVal = ['contract_no', 'customer', 'id_number', 'tensor', 'upload_time','check_status','deal_status','0代表未处理或对账失败，1代表已处理或处理成功']
	        const list = this.contractList
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
    	this.formSearch.date=""
      	this.formSearch.contractNo=""
      	this.formSearch.dealType=""
      	this.formSearch.shop=""
        this.formSearch.startDate=""
      	this.formSearch.endDate=""
      },
      
      handleCurrentChange(val) {
      	  if(val!=1){
       	   	   $(".el-pager").children("li").eq(0).removeClass("active");
       	   }
      	    this.formSearch.page=val
      	    this.$options.methods.inquire.bind(this)()
      },
      onSearch(){
      	sessionStorage.setItem('checkshop',this.formSearch.shop)
      	this.loading1=true
      	this.formSearch.page=1
      	this.$options.methods.inquire.bind(this)()
      },
     
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
	.client-serach .dateRange{
		width: 80px;
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
		font-size: 16px;
		font-weight: bold;
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
		font-size: 16px;
		font-weight: bold;
	}
	.content .client-ul .client-li:hover{
		background: #F1F2F8;
	}
	.content .client-ul .client-li span{
		font-weight: bold;
	}
	.content .client-ul li span{
		font-size: 14px;
		flex: 1;
		text-align: center;
		padding: .1rem 0;
		border-right: 1px #E3E7F1 solid;
		line-height: 30px;
	}
	.content ul li .leadDay{
		color: #10C55B;
	}
	.content .client-ul li .client-span-card{
		flex: 1.5;
	}
	.span-check{
		color: #0BB1FF;
	}
	.span-check:hover{
		color: #000;
	}
	.duihao{
		color: #10C55B;
	}
	.content .client-ul li  .svg-icon{
		font-size: 20px;
	}
</style>
