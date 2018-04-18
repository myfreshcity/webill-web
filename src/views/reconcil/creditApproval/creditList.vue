<!--减免列表-->

<template>
	<div class="content">
	  <div class="filter-container client-serach">
	  	<el-form :inline="true" :model="formSearch" class="demo-form-inline">
        <el-form-item label="">
          <el-input v-model="formSearch.realName" placeholder="客户姓名"></el-input>
        </el-form-item>
        <el-form-item label="">
		    <el-input v-model="formSearch.applyer" placeholder="发起人"></el-input>
		  </el-form-item>
		  <el-form-item label="">
		    <el-input v-model="formSearch.amount" placeholder="协商金额"></el-input>
		  </el-form-item>
		   <el-form-item>
		    <el-button type="primary" @click="onSearch" :loading="loading1">查询</el-button>
		    <el-button  @click="clear" >清空</el-button>
		  </el-form-item>
		</el-form>
	  </div>
	  <ul class="client-ul">
	  	<li class="client-li"><span>合同编号</span><span>客户姓名</span><span>逾期期数</span><span>减免金额</span><span>处理备注</span><span>减免有效期</span><span>发起人</span><span>操作</span></li>
	  	<li v-for="(ele,k) in clientList">
	  		<span >{{ele.contract_no}}</span>
	  		<span >{{ele.customer}}</span>
	  		<span >{{ele.overtime_num}}</span>
	  		<span >{{ele.commit_amount}}</span>
	  		<span >{{ele.remark|remarkFilter}}</span>
	  		<span >{{ele.deadline}}</span>
	  		<span >{{ele.applyer}}</span>
	  		<span @click="checkDetail(ele.commit_id)" class="span-check"><el-button type="text">查看</el-button></span>
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
      	totalCount:0,
      	clientList:[],
      	formSearch:{
      		realName:"",
      		applyer:"",
      		amount:""
      	},
      	currentPage:1,
      }
    },
    filters:{
    	remarkFilter(data){
    		if(data==" "){
    			return "无"
    		}else{
    			return data
    		}
    	}
    },
    mounted:function(){
    	  $(window).unbind ('scroll');
	           var data = new FormData();
	           data.append('userId', this.userInfo.id);
	           data.append('page', 1);
	           data.append('applyer', this.formSearch.applyer);
	           data.append('customer', this.formSearch.realName);
//	           data.append('amount', this.formSearch.amount);
	           const url=this.$checkStage('/charge/commit/get')
	           this.$http.post(url, data).then((response) => {
	           	            console.log(response)
	                        this.clientList=response.data.commit_list
	                        this.totalCount=response.data.num
	                    }, (response) => {

	                    });
    },
     methods: {
     	checkDetail(data){
     		sessionStorage.setItem('extraData',data)
     		this.$router.push({path:'/reconcil/creditDetail'})
     	},
      clear(){
      	this.formSearch.realName=""
      	this.formSearch.applyer=""
      	this.formSearch.amount=""
      },
      handleCurrentChange(val) {
      	  if(val!=1){
       	   	   $(".el-pager").children("li").eq(0).removeClass("active");
       	   }
      	    var data = new FormData();
	           data.append('userId', this.userInfo.id);
	           data.append('page', val);
	           data.append('applyer', this.formSearch.applyer);
	           data.append('customer', this.formSearch.realName);
//	           data.append('amount', this.formSearch.amount);
	           const url=this.$checkStage('/charge/commit/get')
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
	           data.append('applyer', this.formSearch.applyer);
	           data.append('customer', this.formSearch.realName);
//	           data.append('amount', this.formSearch.amount);
	           const url=this.$checkStage('/charge/commit/get')
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
	.content .client-ul li:hover{
		background: #ecf5ff;
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
		line-height: 50px;
		font-size: 14px;
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
