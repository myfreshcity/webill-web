<!--对账详情-->

<template>
	<div class="content">
		<p class="title">
			对账信息
		</p>
		<div class="nav1">
			<p class="p-title"><span class="span-line"></span>客户信息</p>
			<p class="nav1-p">手机号码：<span>{{checkDetail.mobile_no}}</span></p>
			<p class="nav1-p">客户姓名：<span>{{checkDetail.customer}}</span></p>
			<p class="nav1-p">身份证号：<span>{{checkDetail.id_number}}</span></p>
		</div>
		 <div class="nav2">
			<p class="p-title"><span class="span-line"></span>还款情况 (合同编号——{{checkDetail.contract_no}})</p>
			<div class="nav2-box">
			 <el-tabs  v-model="activeName2" type="border-card" @tab-click="repayClick">
			    <el-tab-pane label="逾期" name="first">逾期</el-tab-pane>
			    <el-tab-pane label="结清" name="second">提前结清</el-tab-pane>
			    <el-tab-pane label="还款中" name="third">还款中</el-tab-pane>
			    <el-tab-pane label="全部" name="fourth">全部</el-tab-pane>
			  </el-tabs>
			</div>
			<ul>
				<li class="nav2-li-head"><span>应还日期</span><span>还款期数</span><span>逾期天数</span><span>应还本息</span><span>应还滞纳金</span><span>实还本息</span><span>实还滞纳金</span><span class="nav2-span-right">还款状态</span></li>
				<li v-for="(ele,k) in repayPlan">
					<span>{{ele.deadline}}</span>
					<span>第{{ele.tensor}}期</span>
					<span>{{ele.overtime_date|overtimeFilter}}</span>
					<span>{{ele.amount}}</span>
					<span>{{ele.fee}}</span>
					<span>{{ele.actual_amt}}</span>
					<span>{{ele.actual_fee}}</span>
					<span>{{ele.refund_status}}</span>
				</li>
				<li class="last-li">
					<span class="total-span">小计</span><span>{{shouldPay1}}</span><span>{{shouldPay2}}</span><span>{{truePay1}}</span><span>{{truePay2}}</span><span></span>
				</li>
			</ul>
	    </div>
		<div class="nav1 nav3">
			<p class="p-title"><span class="span-line"></span>处理面板</p>
			<ul>
				<li class="li-head"><span class="span-left" >审批结果</span><span class="span-right">{{approveResult|resultFilter}}</span></li>
				<li v-if="approveResult==200"><span class="span-left" >拒绝理由</span><span class="span-right">{{approveRemark}}</span></li>
				<li >
					<span class="span-left">处理方式</span>
					<span class="span-right nav3-span-right">
						     <el-radio-group v-model="dealDetail">
						      <el-radio-button label="提醒还款" :disabled="radioDisable"></el-radio-button>
						      <el-radio-button label="申请减免" :disabled="radioDisable"></el-radio-button>
						      <el-radio-button label="移交外催" :disabled="radioDisable"></el-radio-button>
						    </el-radio-group>
					</span>
				</li>
				<li ><span class="span-left">应还总额</span><span class="span-right span-right-money">{{minSum}} (<b>减免金额：{{reduceMoney}}</b>)&nbsp;&nbsp;&nbsp;<el-checkbox v-model="selectType" :disabled="radioDisable||handOver">一次结清</el-checkbox></span></li>
				<li><span class="span-left">协商金额</span><span class="span-right nav3-span-right"><el-input v-model="consultValue" :disabled="radioDisable||handOver" class="work-input" type="number" placeholder="协商后的还款金额"></el-input></span></li>
				<li><span class="span-left">处理备注</span><span class="span-right nav3-span-right"><el-input   v-model="remark" :disabled="radioDisable" class="remark-input" placeholder="选填"></el-input></span></li>
			</ul>
			 <p class="nav3-sub" ><el-button v-if="!radioDisable" @click="goBack">返回</el-button><el-button v-if="!radioDisable" v-waves type="primary" @click="commitSub">提交</el-button><el-button class="history-span"  @click="showHistory"><svg-icon icon-class="zhankai" v-show="!historyShow"/><svg-icon icon-class="shousuo" v-show="historyShow"/>历史记录 </el-button></p>
			 <ul class="history" v-show="historyShow">
			 	<li class="li-head">
			 		<span >申请时间</span>
				 	<span>申请方式</span>
				 	<span>协商金额</span>
				 	<span>是否有效</span>
				 	<span class="remark-span">备注</span>
			 	</li>
			 	<li v-for="(ele,k) in historyList">
			 		<span >{{ele.apply_date}}</span>
				 	<span>{{ele.type|applyType}}</span>
				 	<span>{{ele.amount}}</span>
				 	<span>{{ele.result|resultFilter}}</span>
				 	<span  class="remark-span">{{ele.remark}}</span>
			 	</li>
			 	<li v-if="historyList.length==0" class="noRecord">无记录</li>
			 </ul>
		</div>
		<div class="nav2">
			<p class="p-title"><span class="span-line"></span>冲账流水</p>
			<div class="nav2-box">
			 <el-tabs  v-model="activeName1" type="border-card" @tab-click="realClick">
			    <el-tab-pane label="冲账历史" name="first">冲账历史</el-tab-pane>
			    <!--<el-tab-pane label="已冲账" name="second">已冲账</el-tab-pane>-->
			    <!--<el-tab-pane label="全部" name="third">全部</el-tab-pane>-->
			  </el-tabs>
			</div>
			<ul>
				<li class="nav2-li-head"><span>支付时间</span><span>姓名</span><span>还款金额</span><span>冲账余额</span><span class="nav2-span-right">还款渠道</span></li>
				<li v-for="(ele,k) in realPay">
					<span>{{ele.refund_time}}</span>
					<span>{{ele.refund_name}}</span>
					<span>{{ele.amount}}</span>
					<span>{{ele.remain_amt}}</span>
					<span>{{ele.way}}</span>
				</li>
				<!--<li class="last-li"><p>冲账余额：{{checkDetail.remain_sum}} <b>注：冲账余额>0,为客户多还金额</b></p></li>-->
			</ul>
	    </div>
	    <p class="p-waste"><el-button   @click="showWaste"><svg-icon icon-class="zhankai" v-show="!wasteShow"/><svg-icon icon-class="shousuo" v-show="wasteShow"/>未匹配流水列表 </el-button></p>
		<div class="nav4" v-if="!radioDisable&&wasteShow">
			<p class="p-title"><span class="span-line"></span>未匹配流水列表</p>
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
				    <el-button  @click="clear" >清空</el-button>
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
		  		<span @click="strike(ele)" class="span-check"><el-button type="text">冲账</el-button></span>
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
	import { DateDiff } from '@/utils/utils'
	import waves from '@/directive/waves/index.js' // 水波纹指令
	export default {
		 directives: {
		    waves
		 },
		 data(){
			return {
				wasteShow:false,
				historyList:[],  //协商历史
				historyShow:false,
				reduceMoney:0,  //减免金额
				shouldPay1:0,  //应还本息
				shouldPay2:0,  //应还逾期
				shouldPay3:0,  
				shouldPay4:0,  
				truePay1:0,    //实还本息
				truePay2:0,    //实还逾期
				truePay3:0,    
				truePay4:0,    
				isSettle:1,
				dealDetail:"提醒减免",
				dealType:"0",
				activeName1: 'first',
				activeName2: 'first',
				overList:[],  //逾期列表
				minSum:"",   //最低还款额
				isStrike:false,
				strikeDetail:{},
				bgShow:false,
				radioDisable:false, 
				handOver:false,
				selectType:true,    
				consultValue:"",
				repayDate:'',      //承诺还款日期
				remark:'',         //备注
				loading1:false,
		      	totalCount:0,
		      	contractList:[],
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
//		      	realPay1:[],
//		      	realPay2:[],
//		      	realPay3:[],
		      	repayPlan:[],  //还款计划列表
		      	repayPlan1:[],
		      	repayPlan2:[],
		      	repayPlan3:[],
		      	repayPlan4:[],
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
			applyType(index){
				if(index==0){
					return "提醒还款"
				}else if(index==1){
					return "申请减免"
				}else{
					return "移交外催"
				}
			},
			discountFilter(index){
				if(index==1){
					return "一次结清"
				}else{
					return ""
				}
			}
		},
		mounted:function(){
			 $(window).unbind ('scroll');
//			 if(this.userInfo.mobileNo){
			 	  const checkUrl=this.$checkStage('/charge/contract/detail/get')
		           this.$http.post(checkUrl, {'contract_no':this.contractNo,"contract_id":"","is_overtime":0}).then((response) => {
		           	            console.log(response)
		           	            this.checkDetail=response.data
		           	            this.overList=response.data.overtime_list
		           	            this.historyList=response.data.commit_history
		           	          
		           	            this.approveResult=this.checkDetail.commit.result
		           	            this.approveRemark=this.checkDetail.commit.approve_remark
		           	            this.realPay=this.checkDetail.real_pays
//		           	            this.realPay=this.realPay3
//		           	            for(let i=0;i<this.realPay.length;i++){
//		           	            	if(this.realPay[i].amount==0){
//		           	            		this.realPay2.push(this.realPay[i])
//		           	            	}else{
//		           	            		this.realPay1.push(this.realPay[i])
//		           	            	}
//		           	            }
		           	            this.repayPlan4=this.checkDetail.overtime_list
		           	            
		           	            for(let i=0;i<this.repayPlan4.length;i++){
		           	            	if(this.repayPlan4[i].is_settled==0){
		           	            		this.repayPlan2.push(this.repayPlan4[i])
		           	            	}else if(this.repayPlan4[i].is_settled==1){
		           	            		this.repayPlan3.push(this.repayPlan4[i])
		           	            	}
		           	            }
		           	            for(let j=0;j<this.repayPlan2.length;j++){
		           	            	if(this.repayPlan2[j].delay_day>0){
		           	            		this.repayPlan1.push(this.repayPlan2[j])
		           	            	}
		           	            }
		           	            this.repayPlan=this.repayPlan1
		           	             for(let i=0;i<this.repayPlan.length;i++){
		           	             	if(this.repayPlan[i].amount){
		           	             		this.shouldPay1+=Number(this.repayPlan[i].amount)
		           	             	}
								   	if(this.repayPlan[i].fee){
		           	             		this.shouldPay2+=Number(this.repayPlan[i].fee)
		           	             	}
								   	if(this.repayPlan[i].actual_amt){
		           	             		this.truePay1+=Number(this.repayPlan[i].actual_amt)
		           	             	}
								   	if(this.repayPlan[i].actual_fee){
		           	             		this.truePay2+=Number(this.repayPlan[i].actual_fee)
		           	                }
								  }
		           	             for(let i=0;i<this.repayPlan3.length;i++){
		           	             	if(this.repayPlan3[i].amount){
		           	             		this.shouldPay3+=Number(this.repayPlan3[i].amount)
		           	             	}
								   	if(this.repayPlan3[i].fee){
		           	             		this.shouldPay4+=Number(this.repayPlan3[i].fee)
		           	             	}
								   	if(this.repayPlan3[i].actual_amt){
		           	             		this.truePay3+=Number(this.repayPlan3[i].actual_amt)
		           	             	}
								   	if(this.repayPlan3[i].actual_fee){
		           	             		this.truePay4+=Number(this.repayPlan3[i].actual_fee)
		           	                }
								  }
		           	             this.minSum1=this.shouldPay1+this.shouldPay2-this.truePay1-this.truePay2
		           	             this.minSum2=this.shouldPay3+this.shouldPay4-this.truePay3-this.truePay4
		           	             this.minSum=this.minSum2
		           	             console.log(this.minSum)
		           	            if(this.checkDetail.commit.type){
		           	            	if(this.checkDetail.commit.type==0){
		           	            		this.dealDetail="提醒还款"
		           	            	}else if(this.checkDetail.commit.type==1){
		           	            		this.dealDetail="申请减免"
		           	            	}else{
		           	            		this.dealDetail="移交外催"
		           	            	}
		           	            	this.repayDate=this.checkDetail.commit.deadline
		           	            	this.remark=this.checkDetail.commit.remark
		           	            	this.reduceMoney=this.checkDetail.commit.amount
		           	            	this.consultValue=this.minSum-this.checkDetail.commit.amount
		           	            	
		           	            	if(this.checkDetail.commit.type==1&&this.checkDetail.commit.is_dealt==1){
		           	            		this.radioDisable=false
		           	            	}else if(this.checkDetail.commit.is_dealt==1){
		           	            		this.radioDisable=true
		           	            	}
		           	            	
		           	            }else{
		           	            	this.dealDetail="提醒还款"
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
//			 }else{
//			 	this.$router.push({path:'/reconcil/checkList'})
//			 }
			 
		},
		watch:{
			 selectType:function(str){
		     	if(str){
		     		    this.isSettle=1
				  		this.minSum=this.minSum2
				  		this.reduceMoney=this.minSum-this.consultValue
				 }else{
				 	    this.isSettle=0
				  		this.minSum=this.minSum1
				  		this.reduceMoney=this.minSum-this.consultValue
				}
		     	
		     },
		     dealDetail:function(str){
		     	if(str=="提醒还款"){
		     		this.handOver=true;
		     		this.dealType='0'
		     		this.selectType=false
		     	}else if(str=="申请减免"){
		     		this.handOver=false;
		     		this.dealType='1'
		     		this.selectType=true
		     	}else{
		     		this.handOver=true;
		     		this.dealType='2'
		     		this.selectType=false
		     	}
		     },
		     consultValue:function(str){
		     	this.reduceMoney=this.minSum-str
		     }
//		     dealType:function(index){
//		     	if(index==1||index==2){
//		     		this.handOver=true;
//		     	}else{
//		     		this.handOver=false;
//		     	}
//		     }	
		},
		methods:{
			showHistory(){
				this.historyShow=!this.historyShow
			},
			showWaste(){
				this.wasteShow=!this.wasteShow
			},
			realClick(index) {
			   if(this.activeName1=="first"){
			   	   this.realPay=this.realPay1
			   }else if(this.activeName1=="second"){
			   	    this.realPay=this.realPay2
			   }else{
			   	    this.realPay=this.realPay3
			   }
		    },
		    repayClick(index) {
		    	this.shouldPay1=0
		    	this.shouldPay2=0
		    	this.truePay1=0
		    	this.truePay2=0
		    	if(this.activeName2=="first"){
			   	   this.repayPlan=this.repayPlan1
			   }else if(this.activeName2=="second"){
			   	    this.repayPlan=this.repayPlan2
			   }else if(this.activeName2=="third"){
			   	    this.repayPlan=this.repayPlan3
			   }else if(this.activeName2=="fourth"){
			   	    this.repayPlan=this.repayPlan4
			   }
			    for(let i=0;i<this.repayPlan.length;i++){
       	             	if(this.repayPlan[i].amount){
       	             		this.shouldPay1+=Number(this.repayPlan[i].amount)
       	             	}
					   	if(this.repayPlan[i].fee){
       	             		this.shouldPay2+=Number(this.repayPlan[i].fee)
       	             	}
					   	if(this.repayPlan[i].actual_amt){
       	             		this.truePay1+=Number(this.repayPlan[i].actual_amt)
       	             	}
					   	if(this.repayPlan[i].actual_fee){
       	             		this.truePay2+=Number(this.repayPlan[i].actual_fee)
		                }
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
//			lookRemark(data){
//				    if(!data){
//				    	data="未备注"
//				    }
//			        this.$alert(data, '备注', {
//			          confirmButtonText: '确定',
//			        });
//			},
			goBack(){
				this.$router.push({path:'/reconcil/checkList'})
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
			   if((!this.consultValue)&&!this.handOver){
			   	  this.$alert("协商金额", '系统提示', {
					     confirmButtonText: '确定',
				   });
				   
			   }else{
				   var data = new FormData();
		           data.append('contract_no', this.contractNo);
		           data.append('user_id',this.userInfo.id);
		           data.append('type', this.dealType);
		           data.append('discount_type', this.isSettle);
		           data.append('amount', this.reduceMoney);
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
	           	            this.loading1=false
	                        this.contractList=response.data.unlinked_list
	                        this.totalCount=response.data.num
	                    }, (response) => {
                             this.loading1=false
	                    });
	                    
	       },
	       clear(){
//	       	this.currentPage=6
	      	this.formSearch.realName=""
	      	this.formSearch.range=""
	      	this.formSearch.date=""
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

<style scoped>
	
	.title{
		height: .5rem;
		background:#F1F2F8 ;
		line-height: .5rem;
		padding-left: .3rem;
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
	}
	.nav1 .nav1-p span{
		margin-right: 30px;
	}
	.nav4{
		padding: .3rem;
	}
	.nav1 ul{
		width: 80%;
		margin-top: .1rem;
		padding: .1rem .2rem;
	}
	.nav4 p{
		margin-bottom: .3rem;
	}
	.p-waste{
		padding: .3rem;
	}
	.nav1 ul li{
		border: 1px #E3E7F1 solid;
		display: flex;
	    height: .5rem;
	    line-height: .5rem;
	    text-align: center;
	    border-top:none ;
	}
	.nav1 ul .noRecord{
		display: block;
		text-align: center;
	}
	.nav1 ul .li-head{
		border-top:1px #E3E7F1 solid ;
	}
	/*.nav1 .history li{
	}*/
	.nav1 ul li span{
		flex: 1;
	}
	.nav1 ul li .remark-span{
		flex:3;
	}
	.nav1 ul li .look-span{
		color: #0BB1FF;
	}
	.nav1 ul li .span-left{
		flex: .3;
		border-right:1px #E3E7F1 solid ;
		background: #F1F2F8;
	}
	.nav1 ul li .span-right b{
		color: red;
		font-size: 14px;
	}
	.nav1 ul li .span-right-money{
		font-size: 14px;
	}
	.nav2{
		padding: .1rem .3rem;
	}
	.nav2 .nav2-box{
		width: 80%;
		margin-top: .1rem;
		padding: .1rem .2rem;
	}
	.nav2 ul{
		width: 80%;
		padding: .1rem .2rem;
		margin-top: -.3rem;
	}
	.nav2 ul li{
		display: flex;
		height: .5rem;
		line-height: .5rem;
		border: 1px #E3E7F1 solid;
		border-top:none ;
	}
	 .last-li p{
	 	text-align: center;
		width: 100%;
	}
	 .last-li p b{
		color: red;
	}
	.nav2 ul .nav2-li-head{
		/*border-top: 1px #E3E7F1 solid;*/
		background: #F1F2F8;
	}
	.nav2 ul li span{
		flex:1;
		text-align: center;
		border-right:1px #E3E7F1 solid ;
	}
	.nav2 ul li .total-span{
		flex: 3;
	}
	.nav2 ul li .spanAll{
		flex: 3;
	}
	.nav2 ul li .nav2-span-right{
		border-right: none;
	}
	.nav3 .el-select{
		height: .5rem;
	}
	.nav3 .el-select .el-input{
		height: .5rem;
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
		height: .4rem;
	}
	
	.nav3-sub{
		width: 80%;
		padding: .1rem .2rem;
		text-align: center;
		overflow: hidden;
	}
	.nav3-sub .history-span{
		float: right;
		color: #666;
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
		font-size: 12px;
		border-radius: 5px;
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