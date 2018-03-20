<!--对账详情-->

<template>
	<div class="content">
		<p class="title">
			对账信息
		</p>
		<div class="nav1">
			<p>客户信息</p>
			<ul>
				<li class="li-head"><span class="span-left">合同编号</span><span class="span-right">{{checkDetail.contract_no}}</span></li>
				<li><span class="span-left">客户姓名</span><span class="span-right">{{checkDetail.customer}}</span></li>
				<li><span class="span-left">身份证号码</span><span class="span-right">{{checkDetail.id_number}}</span></li>
			</ul>
		</div>
		<div class="nav2">
			<p>逾期信息</p>
			<ul>
				<li class="nav2-li-head"><span>应还日期</span><span>还款期数</span><span>应还本息</span><span class="nav2-span-right">实还金额</span></li>
				<li v-for="(ele,k) in checkDetail.overtime_list">
					<span>{{ele.deadline}}</span>
					<span>第{{ele.tensor}}期</span>
					<span>{{ele.amount}}</span>
					<span>-</span>
				</li>
				<li><span>合计</span><span>共{{checkDetail.tensor}}期</span><span>{{checkDetail.overtime_sum}}</span><span>{{checkDetail.remain_sum}}</span></li>
			</ul>
		</div>
		<div class="nav1 nav3">
			<p>修改还款信息</p>
			<ul>
				<li class="li-head"><span class="span-left">清欠还款额</span><span class="span-right">最低还款额：1257.04 已挂账金额：200</span></li>
				<li><span class="span-left">提前结清还款额</span><span class="span-right">最低还款额：6357.04</span></li>
				<li>
					<span class="span-left">处理方式</span>
					<span class="span-right">
					    <el-radio :disabled="radioDisable" v-model="selectType" label="0">&nbsp;清除欠款</el-radio>
					    <el-radio :disabled="radioDisable" v-model="selectType" label="1">&nbsp;提前结清</el-radio>
					    <el-radio :disabled="radioDisable" v-model="selectType" label="2">&nbsp;移交外催</el-radio>
					</span>
				</li>
				<li v-if="selectShow"><span class="span-left">协商金额</span><span class="span-right"><el-input v-model="consultValue" :disabled="radioDisable" class="work-input" placeholder="协商后的还款金额"></el-input></span></li>
				<li v-if="selectShow">
					<span class="span-left">承诺日期</span>
					<span class="span-right">
						<el-date-picker class="dataInp"
                          v-model="repayDate"
                          type="date"
                          placeholder="承诺还款日期"
                          :disabled="radioDisable"
                          value-format="yyyy-MM-dd">
                        </el-date-picker>
					</span>
				</li>
				<li><span class="span-left">处理备注</span><span class="span-right"><el-input v-model="remark" :disabled="radioDisable" class="remark-input" placeholder=""></el-input></span></li>
			</ul>
			 <p class="nav3-sub" v-if="!radioDisable"><el-button v-waves type="primary" @click="commitSub">提交</el-button></p>
		</div>
		<div class="nav4" v-if="matching">
			<p>未匹配流水列表</p>
			 <div class="filter-container client-serach">
			  	<el-form :inline="true" :model="formSearch" class="demo-form-inline">
		        <el-form-item label="客户姓名">
		          <el-input v-model="formSearch.realName" placeholder="客户姓名"></el-input>
		        </el-form-item>
		        <el-form-item label="还款金额">
				    <el-input v-model="formSearch.range" placeholder="还款金额"></el-input>
				  </el-form-item>
				  <el-form-item label="支付日期">
				     <el-date-picker class="dataInp"
		                          v-model="formSearch.date"
		                          type="date"
		                          placeholder="支付日期"
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
		  	<li class="client-li"><span>支付日期</span><span>支付时间</span><span>姓名</span><span>收款卡号尾号</span><span>还款金额</span><span>还款渠道</span><span>操作</span></li>
		  	<li v-for="(ele,k) in contractList">
		  		<span>{{ele.refund_date}}</span>
		  		<span>{{ele.refund_time}}</span>
		  		<span>{{ele.refund_name}}</span>
		  		<span>{{ele.card_id}}</span>
		  		<span>{{ele.amount}}</span>
		  		<span>{{ele.type}}</span>
		  		<span @click="strike(ele)" class="span-check">冲账</span>
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
		 <div class="unlinked_list" v-show="isStrike">
		  	 <p class="p1">冲账确认</p>
		  	 <p class="p2"><span class="unlinked_span1">客户姓名：</span><span class="unlinked_span2">{{checkDetail.customer}}</span></p>
		  	 <p class="p2"><span class="unlinked_span1">合同编号：</span><span class="unlinked_span2">{{checkDetail.contract_no}}</span></p>
		  	 <p class="p2"><span class="unlinked_span1">冲账金额：</span><span class="unlinked_span2">{{strikeDetail.amount}}</span></p>
		  	 <p class="p3"><el-button  @click="cancel" >取消</el-button><el-button type="primary" @click="confirm" >确定</el-button></p>
		  </div>
		<div class="bg" v-show="bgShow" @click="showBg()"></div>
	</div>
</template>

<script>
	import $ from 'jquery'
	import { mapGetters } from 'vuex'
	import waves from '@/directive/waves/index.js' // 水波纹指令
	export default {
		 directives: {
		    waves
		 },
		 data(){
			return {
				isStrike:false,
				strikeDetail:{},
				bgShow:false,
				radioDisable:false, 
				selectType:'0',    
				consultValue:"",
				repayDate:'',      //承诺还款日期
				remark:'',         //备注
				loading1:false,
		      	loading2:false,
		      	totalCount:0,
		      	contractList:[],
		      	latestReportType:'',
		      	matching:true,
		      	selectShow:true,
		      	formSearch:{
		      		realName:"",
		      		range:"",
		      		date:""
		      	},
		      	currentPage:1,
		      	checkDetail:{},
			}
		},
		mounted:function(){
			 console.log(this.contractNo)
			 $(window).unbind ('scroll');
			   const checkUrl=this.$checkStage('/charge/contract/detail/get')
	           this.$http.post(checkUrl, {'contract_no':this.contractNo}).then((response) => {
	           	            console.log(response)
	           	            this.checkDetail=response.data
	                    }, (response) => {

	                    });
	           var data = new FormData();
	           data.append('userId', this.userInfo.id);
	           data.append('page', 1);
	           data.append('range', this.formSearch.range);
	           data.append('customer', this.formSearch.realName);
	           data.append('refund_date', this.formSearch.date);
	           const url=this.$checkStage('/charge/refund/unlink/get')
	           this.$http.post(url, data).then((response) => {
	           	            console.log(response)
	                        this.contractList=response.data.unlinked_list
	                        this.totalCount=response.data.num
	                    }, (response) => {

	                    });
		},
		watch:{
			 selectType:function(index){
		     	if(index==2){
				  		this.selectShow=false;
				 }else{
				  		this.selectShow=true;
				}
		     	
		     },
		},
		methods:{
			cancel(){
				this.isStrike=false
				this.bgShow=false
			},
			confirm(){
			   this.$router.push({path:'/backPage'})
			   var data = new FormData();
	           data.append('contract_no', this.contractNo);
	           data.append('user_id',this.userInfo.id);
	           data.append('refund_id', this.strikeDetail.refund_id);
	           const url=this.$checkStage('/charge/refund/unlink/link')
	           this.$http.post(url, data).then((response) => {
	           	            console.log(response)
	           	            if(response.data.status==200){
	           	            	
	           	            }else{
	           	            	this.$alert(response.data.message, '系统提示', {
					                  confirmButtonText: '确定',
							    });
	           	            }
	                    }, (response) => {
	                    	
	                        
	                    });
			},
			showBg(){
				this.isStrike=false
				this.bgShow=false
			},
			strike(data){
				this.isStrike=true
				this.bgShow=true
				this.strikeDetail=data
			},
			commitSub(){
			   var data = new FormData();
	           data.append('contract_no', this.contractNo);
	           data.append('user_id',this.userInfo.id);
	           data.append('type', this.selectType);
	           data.append('deadline', this.repayDate);
	           data.append('amount', this.consultValue);
	           data.append('commit',this.remark);
	           const url=this.$checkStage('/charge/commit/create')
	           this.$http.post(url, data).then((response) => {
	           	            console.log(response)
	           	            if(response.data.status==200){
	           	            	this.$router.push({path:'/reconcil/checkDetail'})
	           	            }else{
	           	            	this.$alert(response.data.message, '系统提示', {
					                  confirmButtonText: '确定',
							    });
	           	            }
	                    }, (response) => {
	                        
	                    });
			},
			 handleCurrentChange(val) {
	       	   if(val!=1){
	       	   	   $(".el-pager").children("li").eq(0).removeClass("active");
	       	   }
	      	   var data = new FormData();
	           data.append('userId', this.userInfo.id);
	           data.append('page', val);
	           data.append('range', this.formSearch.range);
	           data.append('customer', this.formSearch.realName);
	           data.append('refund_date', this.formSearch.date);
	           const url=this.$checkStage('/charge/refund/unlink/get')
	           this.$http.post(url, data).then((response) => {
	           	            console.log(response)
	                        this.contractList=response.data.unlinked_list
	                        this.totalCount=response.data.num
	                    }, (response) => {

	                    });
	      },
	      onSearch(){
	      	this.loading1=true
	      	var data = new FormData();
	           data.append('userId', this.userInfo.id);
	           data.append('page', 1);
	           data.append('range', this.formSearch.range);
	           data.append('customer', this.formSearch.realName);
	           data.append('refund_date', this.formSearch.date);
	           const url=this.$checkStage('/charge/refund/unlink/get')
	           this.$http.post(url, data).then((response) => {
	           	            console.log(response)
	           	            this.loading1=false
	                        this.contractList=response.data.unlinked_list
	                        this.totalCount=response.data.num
	                    }, (response) => {

	                    });
	                    
	       },
	       clear(){
	       	this.currentPage=6
	      	this.formSearch.realName=""
	      	this.formSearch.mobileNo=""
	      	this.formSearch.idNo=""
	      	this.formSearch.latestReportStatus=""
	      	this.formSearch.latestReportType=""
	      	this.formSearch.latestReportTimeDatetime=""
	      },
		},
		 computed: {
		    ...mapGetters([
		      'contractNo',
		      'userInfo'
		    ])
		}
	}
</script>

<style>
	
	.title{
		height: .5rem;
		background:#ccc ;
		line-height: .5rem;
		padding-left: .3rem;
	}
	.nav1{
		padding: .3rem;
	}
	.nav4{
		padding: .3rem;
	}
	.nav1 ul{
		width: 80%;
		margin-top: .2rem;
		padding: .2rem;
	}
	.nav4 ul{
		margin-top: .3rem;
	}
	.nav4 p{
		margin-bottom: .3rem;
	}
	.nav1 ul li{
		border: 1px #E3E7F1 solid;
		display: flex;
	    height: .5rem;
	    line-height: .5rem;
	    text-align: center;
	    border-top:none ;
	}
	.nav1 ul .li-head{
		border-top:1px #E3E7F1 solid ;
	}
	.nav1 ul li span{
		flex: 1;
	}
	.nav1 ul li .span-left{
		flex: .3;
		border-right:1px #E3E7F1 solid ;
		background: #eee;
	}
	.nav2{
		padding: .3rem;
	}
	.nav2 ul{
		width: 80%;
		margin-top: .2rem;
		padding: .2rem;
	}
	.nav2 ul li{
		display: flex;
		height: .5rem;
		line-height: .5rem;
		border: 1px #E3E7F1 solid;
		border-top:none ;
	}
	.nav2 ul .nav2-li-head{
		border-top: 1px #E3E7F1 solid;
		background: #eee;
	}
	.nav2 ul li span{
		flex:1;
		text-align: center;
		border-right:1px #E3E7F1 solid ;
	}
	.nav2 ul li .nav2-span-right{
		border-right: none;
	}
	.nav3 .span-right{
		text-align: left;
		padding-left: .3rem;
	}
	.nav3 .work-input{
		width: 30%;
	}
	.nav3  .el-input__inner{
		height: .4rem;
	}
	.nav3 .dataInp{
		width: 30%;
	}
	.nav3 .remark-input{
		width: 90%;
	}
	.nav3-sub{
		text-align: center;
	}
	/*未匹配流水列表*/
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
	/*冲账提示框*/
	.unlinked_list{
		width: 40%;
		height: 4rem;
		position: fixed;
		left: 50%;
		top:50% ;
		margin-left: -20%;
		margin-top: -2rem;
		background: #fff;
		z-index: 1000;
	}
	.unlinked_list .p1{
		height: .6rem;
		line-height: .6rem;
		background: #ccc;
		font-weight: bold;
		padding-left: .3rem;
	}
	.unlinked_list .p2{
		height: .6rem;
		line-height: .6rem;
		display: flex;
		margin-bottom: .2rem;
	}
	.unlinked_list .p2 .unlinked_span1{
		flex: 1;
		text-align: right;
	}
	.unlinked_list .p2 .unlinked_span2{
		flex: 2;
		text-align: left;
		padding-left: .5rem;
	}
	.unlinked_list .p3{
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