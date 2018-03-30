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
			<p>实还金额</p>
			<div class="nav2-box">
			 <el-tabs  v-model="activeName1" type="card" @tab-click="realClick">
			    <el-tab-pane label="未冲账" name="first"></el-tab-pane>
			    <el-tab-pane label="已冲账" name="second"></el-tab-pane>
			    <el-tab-pane label="全部" name="third"></el-tab-pane>
			  </el-tabs>
			</div>
			<ul>
				<li class="nav2-li-head"><span>支付时间</span><span>姓名</span><span>还款金额</span><span class="nav2-span-right">还款渠道</span></li>
				<li v-for="(ele,k) in realPay">
					<span>{{ele.refund_time}}</span>
					<span>{{ele.refund_name}}</span>
					<span>{{ele.amount}}</span>
					<span>{{ele.way}}</span>
				</li>
				<li><span >合计</span><span class="spanAll"></span></li>
			</ul>
	    </div>
	    <div class="nav2">
			<p>还款计划</p>
			<div class="nav2-box">
			 <el-tabs  v-model="activeName2" type="card" @tab-click="repayClick">
			    <el-tab-pane label="逾期" name="first"></el-tab-pane>
			    <el-tab-pane label="提前结清" name="second"></el-tab-pane>
			    <el-tab-pane label="正常结清" name="third"></el-tab-pane>
			    <el-tab-pane label="还款中" name="fourth"></el-tab-pane>
			    <el-tab-pane label="全部" name="five"></el-tab-pane>
			  </el-tabs>
			</div>
			<ul>
				<li class="nav2-li-head"><span>应还日期</span><span>还款期数</span><span>逾期天数</span><span>应还本息</span><span class="nav2-span-right">还款状态</span></li>
				<li v-for="(ele,k) in repayPlan">
					<span>{{ele.deadline}}</span>
					<span>第{{ele.tensor}}期</span>
					<span>{{ele.overtime_date|overtimeFilter}}</span>
					<span>{{ele.amount}}</span>
					<span>{{ele.refund_status}}</span>
				</li>
			</ul>
	    </div>
		<!--<div class="nav2" >
			<ul>
				<li class="nav2-li-head"><span>应还日期</span><span>还款期数</span><span>逾期天数</span><span>应还本息</span><span class="nav2-span-right">还款状态</span></li>
				<li v-for="(ele,k) in overList">
					<span>{{ele.deadline}}</span>
					<span>第{{ele.tensor}}期</span>
					<span>{{ele.overtime_date}}</span>
					<span>{{ele.amount}}</span>
					<span>-</span>
				</li>
				<li><span>合计</span><span>共{{checkDetail.overtime_num}}期</span><span>-</span><span>{{checkDetail.overtime_sum}}</span><span>{{checkDetail.remain_sum}}</span></li>
			</ul>
		</div>-->
		<div class="nav1 nav3">
			<p>修改还款信息</p>
			<ul>
				<li class="li-head"><span class="span-left" >审批结果</span><span class="span-right">{{approveResult|resultFilter}}</span></li>
				<li v-if="approveRemark"><span class="span-left" >拒绝理由</span><span class="span-right">{{approveRemark}}</span></li>
				<li ><span class="span-left">最低还款额</span><span class="span-right">{{minSum}}<span class="redSpan">注：未加逾期费用</span></span></li>
				<li>
					<span class="span-left">处理方式</span>
					<span class="span-right">
					    <el-radio :disabled="radioDisable" v-model="selectType" label="0">&nbsp;清除欠款</el-radio>
					    <el-radio :disabled="radioDisable" v-model="selectType" label="1">&nbsp;一次性结清</el-radio>
					    <el-radio :disabled="radioDisable" v-model="selectType" label="2">&nbsp;移交外催</el-radio>
					</span>
				</li>
				<li><span class="span-left">协商金额</span><span class="span-right"><el-input v-model="consultValue" :disabled="radioDisable||handOver" class="work-input" placeholder="协商后的还款金额"></el-input></span></li>
				<li>
					<span class="span-left">承诺日期</span>
					<span class="span-right">
						<el-date-picker class="dataInp"
                          v-model="repayDate"
                          type="date"
                          end-data="2018-04-01"
                          placeholder="承诺还款日期"
                          :disabled="radioDisable||handOver"
                          value-format="yyyy-MM-dd">
                        </el-date-picker>
					</span>
				</li>
				<li><span class="span-left">处理备注</span><span class="span-right"><el-input v-model="remark" :disabled="radioDisable" class="remark-input" placeholder=""></el-input></span></li>
			</ul>
			 <p class="nav3-sub" v-if="!radioDisable"><el-button v-waves type="primary" @click="commitSub">提交</el-button></p>
		</div>
		<div class="nav4" v-if="!radioDisable">
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
		  	<li class="client-li"><span>支付日期</span><span>支付时间</span><span>姓名</span><span>门店</span><span>收款卡号尾号</span><span>还款金额</span><span>还款渠道</span><span>操作</span></li>
		  	<li v-for="(ele,k) in contractList">
		  		<span>{{ele.refund_date}}</span>
		  		<span>{{ele.refund_time}}</span>
		  		<span>{{ele.refund_name}}</span>
		  		<span>{{ele.shop}}</span>
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
				activeName1: 'first',
				activeName2: 'first',
				overList:[],  //逾期列表
				minSum:"",   //最低还款额
				isStrike:false,
				strikeDetail:{},
				bgShow:false,
				radioDisable:false, 
				handOver:false,
				selectType:'0',    
				consultValue:"",
				repayDate:'',      //承诺还款日期
				remark:'',         //备注
				loading1:false,
		      	totalCount:0,
		      	contractList:[],
		      	matching:true,
		      	selectShow:true,
		      	approveResult:"",   //审批结果
		      	approveRemark:"",   //拒绝审批理由
		      	formSearch:{
		      		realName:"",
		      		range:"",
		      		date:""
		      	},
		      	currentPage:1,
		      	checkDetail:{},
		      	realPay:[],   //实际还款列表
		      	realPay1:[],
		      	realPay2:[],
		      	realPay3:[],
		      	repayPlan:[],  //还款计划列表
		      	repayPlan1:[],
		      	repayPlan2:[],
		      	repayPlan3:[],
		      	repayPlan4:[],
		      	repayPlan5:[],
			}
		},
		filters:{
			overtimeFilter(index){
				if(index<0){
					return "--"
				}else{
					return index
				}
			},
			resultFilter(index){
				if(index==0){
					return "拒绝"
				}else if(index==1){
					return "通过"
				}else{
					return ""
				}
			}
		},
		mounted:function(){
			 $(window).unbind ('scroll');
			 if(this.userInfo.mobileNo){
			 	  const checkUrl=this.$checkStage('/charge/contract/detail/get')
		           this.$http.post(checkUrl, {'contract_no':this.contractNo,"is_overtime":0}).then((response) => {
		           	            console.log(response)
		           	            this.checkDetail=response.data
		           	            this.overList=response.data.overtime_list
		           	            this.minSum=this.checkDetail.overtime_sum
		           	            this.approveResult=this.checkDetail.commit.result
		           	            this.approveRemark=this.checkDetail.commit.approve_remark
		           	            this.realPay3=this.checkDetail.real_pays
		           	            this.realPay=this.realPay3
		           	            for(let i=0;i<this.realPay.length;i++){
		           	            	if(this.realPay[i].amount==0){
		           	            		this.realPay2.push(this.realPay[i])
		           	            	}else{
		           	            		this.realPay1.push(this.realPay[i])
		           	            	}
		           	            }
		           	            this.repayPlan5=this.checkDetail.overtime_list
		           	            
		           	            for(let i=0;i<this.repayPlan5.length;i++){
		           	            	if(this.repayPlan5[i].refund_status=="逾期"){
		           	            		this.repayPlan1.push(this.repayPlan5[i])
		           	            	}else if(this.repayPlan5[i].refund_status=="提前结清"){
		           	            		this.repayPlan2.push(this.repayPlan5[i])
		           	            	}else if(this.repayPlan5[i].refund_status=="正常结清"){
		           	            		this.repayPlan3.push(this.repayPlan5[i])
		           	            	}else if(this.repayPlan5[i].refund_status=="还款中"){
		           	            		this.repayPlan4.push(this.repayPlan5[i])
		           	            	}
		           	            }
		           	            this.repayPlan=this.repayPlan1
		           	            if(this.checkDetail.commit.amount){
		           	            	this.selectType=String(this.checkDetail.commit.type)
		           	            	this.repayDate=this.checkDetail.commit.deadline
		           	            	this.remark=this.checkDetail.commit.remark
		           	            	this.consultValue=this.checkDetail.commit.amount
		           	            	if(this.checkDetail.commit.result==1&&this.checkDetail.commit.is_valid==1){
		           	            		this.radioDisable=true
		           	            	}
		           	            	
		           	            }
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
		                        this.contractList=response.data.unlinked_list
		                        this.totalCount=response.data.num
		                       
		                    }, (response) => {
	
		                    });
			 }else{
			 	this.$router.push({path:'/reconcil/checkList'})
			 }
			 
		},
		watch:{
			 selectType:function(index){
		     	if(index==2){
				  		this.handOver=true;
				  		this.minSum="-"
				 }else if(index==1){
				 	    this.handOver=false;
				  		this.minSum=this.checkDetail.unsettled_amount
				 }else{
				  		this.handOver=false;
				  		this.minSum=this.checkDetail.overtime_sum
				}
		     	
		     },
		},
		methods:{
			realClick(index) {
			   console.log(this.activeName1)
			   if(this.activeName1=="first"){
			   	   this.realPay=this.realPay1
			   }else if(this.activeName1=="second"){
			   	    this.realPay=this.realPay2
			   }else{
			   	    this.realPay=this.realPay3
			   }
		    },
		    repayClick(index) {
		    	if(this.activeName2=="first"){
		    		console.log(1111)
			   	   this.repayPlan=this.repayPlan1
			   }else if(this.activeName2=="second"){
			   	    this.repayPlan=this.repayPlan2
			   }else if(this.activeName2=="third"){
			   	    this.repayPlan=this.repayPlan3
			   }else if(this.activeName2=="fourth"){
			   	    this.repayPlan=this.repayPlan4
			   }else{
			   	    this.repayPlan=this.repayPlan5
			   }
		    },
			cancel(){
				this.isStrike=false
				this.bgShow=false
			},
			confirm(){
			   var data = new FormData();
	           data.append('contract_no', this.contractNo);
	           data.append('user_id',this.userInfo.id);
	           data.append('refund_id', this.strikeDetail.refund_id);
	           const url=this.$checkStage('/charge/refund/unlink/link')
	           this.$http.post(url, data).then((response) => {
	           	            console.log(response)
	           	            if(response.data.isSucceed==200){
	           	            	 this.$router.push({path:'/backPage'})
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
			   if((!this.repayDate||!this.consultValue)&&this.selectShow){
			   	  this.$alert("协商金额，日期为必填项", '系统提示', {
					     confirmButtonText: '确定',
				   });
			   }else{
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
		           	            if(response.data.isSucceed==200){
		           	            	this.$router.push({path:'/reconcil/checkList'})
		           	            }else{
		           	            	this.$alert(response.data.message, '系统提示', {
						                  confirmButtonText: '确定',
								    });
		           	            }
		                    }, (response) => {
		                        
		                    });
	          }
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
                             this.loading1=false
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
	.nav2 .nav2-box{
		width: 80%;
		margin-top: .2rem;
		padding: .2rem;
	}
	.nav2 ul{
		width: 80%;
		padding: .2rem;
		margin-top: -.4rem;
	}
	.nav2 ul li{
		display: flex;
		height: .5rem;
		line-height: .5rem;
		border: 1px #E3E7F1 solid;
		border-top:none ;
	}
	.nav2 ul .nav2-li-head{
		/*border-top: 1px #E3E7F1 solid;*/
		background: #eee;
	}
	.nav2 ul li span{
		flex:1;
		text-align: center;
		border-right:1px #E3E7F1 solid ;
	}
	.nav2 ul li .spanAll{
		flex: 3;
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
	
	.redSpan{
		margin-left: .2rem;
		color: red;
	}
</style>