<!--对账详情-->

<template>
	<div class="content">
		<p class="title">
			对账信息
		</p>

		<div class="nav1">
			<p class="p-title"><span class="span-line"></span>客户信息</p>
      <div class="nav1-grid">
        <el-row>
          <el-col :span="6"><div>手机号码:{{checkDetail.mobile_no}}</div></el-col>
          <el-col :span="6"><div>客户姓名:{{checkDetail.customer}}</div></el-col>
          <el-col :span="6"><div>身份证号:{{checkDetail.id_number}}</div></el-col>
          <el-col :span="6"><div>借款期数：{{checkDetail.tensor}}</div></el-col>
        </el-row>
        <el-row>
          <el-col :span="6"><div>借款金额:{{checkDetail.contract_amount}}</div></el-col>
          <el-col :span="6"><div>放款金额:{{checkDetail.loan_amount}}</div></el-col>
          <el-col :span="6"><div>放款日期:{{checkDetail.loan_date}}</div></el-col>
          <el-col :span="6"><div>所在门店：{{checkDetail.shop}}</div></el-col>
        </el-row>
        <el-row>
          <el-col :span="6"><div>还款类型:{{checkDetail.repay_type|repayTypeFilter}}</div></el-col>
          <el-col :span="6"><div>提前还款是否计息:{{checkDetail.prepay_type|yesNoFilter}}</div></el-col>
          <el-col :span="6"><div>是否移交外催：{{checkDetail.is_out|yesNoFilter}}</div></el-col>
          <el-col :span="6"><div>合同状态：{{checkDetail.is_settled|statusFilter}}</div></el-col>
        </el-row>
        <el-row>
          <el-col :span="6"><div>客户经理:{{checkDetail.sale_person}}</div></el-col>
          <el-col :span="6"><div>导入时间:{{checkDetail.created_time}}</div></el-col>
          <el-col :span="6"><div></div></el-col>
          <el-col :span="6"><div></div></el-col>
        </el-row>
      </div>
		</div>
		 <div class="nav2">
			<p class="p-title"><span class="span-line"></span>还款情况 (合同编号——{{checkDetail.contract_no}})</p>
			<div class="nav2-box">
			 <el-tabs  v-model="activeName2" type="border-card" @tab-click="repayClick">
			    <el-tab-pane label="待还" name="first">待还</el-tab-pane>
			    <el-tab-pane label="已结清" name="second">已结清</el-tab-pane>
			    <el-tab-pane label="未到期" name="third">未到期</el-tab-pane>
			    <el-tab-pane label="全部" name="fourth">全部</el-tab-pane>
			  </el-tabs>
			</div>
			<ul>
				<li class="nav2-li-head"><span>应还日期</span><span>还款期数</span><span>逾期天数</span><span>应还本息</span><span>应还滞纳金</span><span>实还本息</span><span>实还滞纳金</span><span>本息缴清日</span><span class="nav2-span-right">还款状态</span></li>
				<li v-for="(ele,k) in repayPlan">
					<span>{{ele.deadline}}</span>
					<span>第{{ele.tensor}}期</span>
					<span>{{ele.delay_day|overtimeFilter}}</span>
					<span>{{ele.amount}}</span>
					<span>{{ele.fee}}</span>
					<span>{{ele.actual_amt}}</span>
					<span>{{ele.actual_fee}}</span>
          <span >{{ele.settled_date}}</span>
          <span >
		  			<el-tooltip class="item" effect="dark" content="还款中" placement="right"><svg-icon icon-class="wait" v-show="ele.is_settled==0&&ele.delay_day<1"/></el-tooltip>
		  			<el-tooltip class="item" effect="dark" content="结清" placement="right"><svg-icon icon-class="duihao" v-show="ele.is_settled==1" class="duihao"/></el-tooltip>
		  			<el-tooltip class="item" effect="dark" content="逾期" placement="right"><svg-icon icon-class="yuqi" v-show="ele.is_settled==0&&ele.delay_day>0"/></el-tooltip>
		  		</span>
				</li>
				<li class="last-li">
					<span class="total-span">小计</span><span>{{shouldPay1}}</span><span>{{shouldPay2}}</span><span>{{truePay1}}</span><span>{{truePay2}}</span><span></span><span></span>
				</li>
			</ul>
	    </div>
		<div class="nav1 nav3" v-show="checkDetail.is_settled!=300">
			<p class="p-title"><span class="span-line"></span>减免申请</p>
			<ul>
				<li class="li-head">
					<span class="span-left">是否结清</span>
          <span class="span-right nav3-span-right">
            <el-switch
              v-model="reduceType"
              active-color="#13ce66"
              inactive-color="#dcdfe6">
            </el-switch>
					</span>
				</li>
				<li ><span class="span-left">应还总额</span>
          <span class="span-right span-right-money"><i>{{minSum}}</i></span>
        </li>
        <li ><span class="span-left">减免金额</span>
          <span class="span-right span-right-money"><i>{{reduceMoney}}</i></span>
        </li>
				<li><span class="span-left">协商金额</span><span class="span-right nav3-span-right">
          <el-input v-model="consultValue" :disabled="radioDisable" class="work-input" type="number" placeholder="协商后的还款金额"></el-input></span>
        </li>
				<li><span class="span-left">处理备注</span><span class="span-right nav3-span-right">
          <el-input   v-model="remark" :disabled="radioDisable" class="remark-input" placeholder="选填"></el-input></span>
        </li>
			</ul>

			 <p class="nav3-sub" >
			 <el-button @click="goBack">返回</el-button>
			 <el-button type="primary" @click="commitSub">提交</el-button>
			 </p>
		</div>

		<div class="nav2">
			<p class="p-title"><span class="span-line"></span>历史处理情况</p>
			<ul style="margin-top: .3rem;">
				<li class="nav2-li-head">
			 		<span class="date-span">申请时间</span>
				 	<span>减免方式</span>
				 	<span>减免金额</span>
				 	<span>是否有效</span>
				 	<span class="remark-span">备注</span>
			 	</li>
			 	<li v-for="(ele,k) in historyList">
			 		<span class="date-span">{{ele.apply_date}}</span>
				 	<span>{{ele.discount_type|discountFilter}}</span>
				 	<span>{{ele.amount}}</span>
				 	<span>{{ele.result|resultFilter}}</span>
				 	<span  class="remark-span">{{ele.remark}}</span>
			 	</li>
			 	<li v-if="historyList.length==0" class="noRecord">无记录</li>
			</ul>
	    </div>


		<div class="nav2">
			<p class="p-title"><span class="span-line"></span>冲账流水</p>
			<ul style="margin-top: .3rem;">
				<li class="nav2-li-head"><span>支付时间</span><span>姓名</span><span>还款金额</span><span>冲账余额</span><span >还款渠道</span><span>流水创建时间</span></li>
				<li v-for="(ele,k) in realPay">
					<span>{{ele.refund_time}}</span>
					<span>{{ele.refund_name}}</span>
					<span>{{ele.amount}}</span>
					<span>{{ele.remain_amt}}</span>
					<span>{{ele.way}}</span>
					<span>{{ele.create_time}}</span>
				</li>
			</ul>
	    </div>

		<div class="nav4">
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
		  	<li class="client-li"><span>支付日期</span><span>支付时间</span><span>姓名</span><span>门店</span><span>收款卡号尾号</span><span>还款金额</span><span>余额</span><span>还款渠道</span><span>操作</span></li>
		  	<li v-for="(ele,k) in contractList">
		  		<span>{{ele.refund_date}}</span>
		  		<span>{{ele.refund_time}}</span>
		  		<span>{{ele.refund_name}}</span>
		  		<span>{{ele.shop}}</span>
		  		<span>{{ele.card_id}}</span>
		  		<span>{{ele.amount}}</span>
		  		<span>{{ele.remain_amt}}</span>
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
    <el-dialog title="冲账确认" :visible.sync="isStrike">
      <el-form :model="strikeDetail" label-width="100px">
        <el-form-item label="客户姓名">
          {{checkDetail.customer}}
        </el-form-item>
        <el-form-item label="合同编号">
          {{checkDetail.contract_no}}
        </el-form-item>
        <el-form-item label="冲账金额">
          <el-input v-model="strikeDetail.amount" type="number" style="width:120px;"></el-input>
        </el-form-item>
        <el-form-item label="优先冲滞纳金">
          <el-switch
            v-model="strikeDetail.fee_first"
            active-color="#13ce66"
            inactive-color="#dcdfe6">
          </el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isStrike = false">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </div>
    </el-dialog>
		<div class="bg" v-show="bgShow" @click="showBg()"></div>
	</div>
</template>

<script>
	import $ from 'jquery'
	import { mapGetters } from 'vuex'
  import { getLoginUser,timeStampToDate,DateDiff } from '@/utils/utils'
	import waves from '@/directive/waves/index.js' // 水波纹指令
	export default {
		 directives: {
		    waves
		 },
		 data(){
			return {
        wasteShow: false,
        historyList: [],  //协商历史
        historyShow: false,
        reduceMoney: 0,  //减免金额
        shouldPay1: 0,  //应还本息
        shouldPay2: 0,  //应还逾期
        shouldPay3: 0,
        shouldPay4: 0,
        truePay1: 0,    //实还本息
        truePay2: 0,    //实还逾期
        truePay3: 0,
        truePay4: 0,
        isSettle: 0,
        dealDetail: "申请减免",
        dealType: "1",
        activeName1: 'first',
        activeName2: 'first',
        overList: [],  //逾期列表
        minSum: 0,   //最低还款额
        minSum1: 0, //当前应还额
        minSum2: 0, //当前逾期金额
        futureOffset: 0,//未到期费差
        isStrike: false,
        strikeDetail: {
          remain_amt:0,
          refund_id:"",
          fee_first:"",
          amount:0
        },
        bgShow: false,
        radioDisable: false,
        handOver: true,
        reduceType: false,
        consultValue: "",
        repayDate: '',      //承诺还款日期
        remark: '',         //备注
        loading1: false,
        totalCount: 0,
        contractList: [],
        approveResult: "",   //审批结果
        approveRemark: "",   //拒绝审批理由
        formSearch: {
          realName: "",
          range: "",
          date: "",
          page: 1,
        },
        currentPage: 1,
        checkDetail: {},
        realPay: [],    //实际还款列表
        repayPlan: [],  //还款计划列表
        repayPlan1: [],
        repayPlan2: [],
        repayPlan3: [],
        repayPlan4: [],
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
      repayTypeFilter(index){
        if(index==0){
          return "期初还款"
        }else{
          return "期末还款"
        }
      },
      yesNoFilter(index){
        if(index==0){
          return "否"
        }else{
          return "是"
        }
      },
      statusFilter(index){
        if(index==0){
          return "还款中"
        }else if(index==100){
          return "逾期"
        }else if(index==300){
          return "结清"
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
			discountFilter(index){
        if(index==1){
          return "结清"
        }else{
          return "清欠"
        }
			}
		},
		mounted:function(){
			 $(window).unbind ('scroll');

//			 if(this.userInfo.mobileNo){
			 	  const checkUrl=this.$checkStage('/charge/contract/detail/get')
		           this.$http.post(checkUrl, {'contract_id':this.$route.params.contractId,"is_overtime":0}).then((response) => {
                            let today = timeStampToDate(new Date().getTime())

		           	            this.checkDetail=response.data
                            this.futureOffset = Number(response.data.future_interest)
		           	            this.overList=response.data.overtime_list
		           	            this.historyList=response.data.commit_history

		           	            this.approveResult=this.checkDetail.commit.result
		           	            this.approveRemark=this.checkDetail.commit.approve_remark
		           	            this.realPay=this.checkDetail.real_pays
		           	            this.repayPlan4=this.checkDetail.overtime_list

                             for (let i = 0; i < this.repayPlan4.length; i++) {
                               if (this.repayPlan4[i].is_settled == 1) {
                                 this.repayPlan2.push(this.repayPlan4[i])
                               } else if (this.repayPlan4[i].delay_day == 0 && this.repayPlan4[i].deadline != today) {
                                 if (this.repayPlan4[i].is_settled == 0) {
                                   this.repayPlan3.push(this.repayPlan4[i])
                                 }
                               }
                             }
		           	            // 待还面板
                             for (let j = 0; j < this.repayPlan4.length; j++) {
                               if (this.repayPlan4[j].delay_day > 0 || this.repayPlan4[j].deadline == today) {
                                 if (this.repayPlan4[j].is_settled == 0) {
                                   this.repayPlan1.push(this.repayPlan4[j])
                                 }
                               }
                             }

                             this.repayPlan = this.repayPlan1
                             for (let i = 0; i < this.repayPlan.length; i++) {
                               if (this.repayPlan[i].amount) {
                                 this.shouldPay1 += Number(this.repayPlan[i].amount)
                               }
                               if (this.repayPlan[i].fee) {
                                 this.shouldPay2 += Number(this.repayPlan[i].fee)
                               }
                               if (this.repayPlan[i].actual_amt) {
                                 this.truePay1 += Number(this.repayPlan[i].actual_amt)
                               }
                               if (this.repayPlan[i].actual_fee) {
                                 this.truePay2 += Number(this.repayPlan[i].actual_fee)
                               }

                               this.minSum1 += Number(this.repayPlan[i].amount)
                               this.minSum1 += Number(this.repayPlan[i].fee)
                               this.minSum1 -= Number(this.repayPlan[i].actual_amt)
                               this.minSum1 -= Number(this.repayPlan[i].actual_fee)

                               if(this.repayPlan[i].deadline != today){
                                 this.minSum2 += Number(this.repayPlan[i].amount)
                                 this.minSum2 += Number(this.repayPlan[i].fee)
                                 this.minSum2 -= Number(this.repayPlan[i].actual_amt)
                                 this.minSum2 -= Number(this.repayPlan[i].actual_fee)
                               }

                             }

                             for (let i = 0; i < this.repayPlan3.length; i++) {
                               if (this.repayPlan3[i].amount) {
                                 this.shouldPay3 += Number(this.repayPlan3[i].amount)
                               }
                               if (this.repayPlan3[i].fee) {
                                 this.shouldPay4 += Number(this.repayPlan3[i].fee)
                               }
                               if (this.repayPlan3[i].actual_amt) {
                                 this.truePay3 += Number(this.repayPlan3[i].actual_amt)
                               }
                               if (this.repayPlan3[i].actual_fee) {
                                 this.truePay4 += Number(this.repayPlan3[i].actual_fee)
                               }
                             }

                              this.minSum=this.minSum1

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
        reduceType: function (str) {
          console.log('reduceType:'+str)
          if(str){
            this.isSettle = 1
            this.minSum = this.minSum2+ this.futureOffset
          }else{
            this.isSettle = 0
            this.minSum = this.minSum1
          }
          this.consultValue = this.minSum
          this.reduceMoney = this.minSum - this.consultValue
        },
      consultValue:function(str){
        this.reduceMoney=this.minSum-str
      }
		},
		methods:{
			inquire(){
			   var data = new FormData();
	           data.append('userId', this.userInfo.id);
	           data.append('page', this.formSearch.page);
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
        if(Number(this.strikeDetail.amount) < 0) {
          return this.$alert("冲账金额不能小于零");
        }

        if(Number(this.strikeDetail.amount) > Number(this.strikeDetail.remain_amt)) {
          return this.$alert("冲账金额不能大于流水余额");
        }

        var data = new FormData();
        data.append('contract_no', this.checkDetail.contract_no);
        data.append('user_id', this.userInfo.id);
        data.append('refund_id', this.strikeDetail.refund_id);
        data.append('fee_first', this.strikeDetail.fee_first);
        data.append('amount', this.strikeDetail.amount);
        const url = this.$checkStage('/charge/refund/unlink/link')
        this.$http.post(url, data).then((response) => {
          if (response.data.isSucceed == 200) {
            this.$router.push({path: '/backPage'})
            this.$message({
              message: '冲账成功',
              type: 'success'
            });
          } else {
            this.$alert(response.data.message, '系统提示', {
              confirmButtonText: '确定',
            });
          }
        }, (response) => {


        });
      },
			goBack(){
				this.$router.push({path:'/reconcil/checkList'})
			},
			showBg(){
				this.isStrike=false
				this.bgShow=false
			},
			strike(data){
				this.isStrike=true
				this.strikeDetail.refund_id=data.refund_id
        this.strikeDetail.amount=data.remain_amt
        this.strikeDetail.remain_amt=data.remain_amt
			},
			commitSub(){
			   if((!this.consultValue)&&!this.handOver){
			   	  this.$alert("协商金额不能为空", '系统提示', {
					     confirmButtonText: '确定',
				   });

			   }else{
				   var data = new FormData();
		           data.append('contract_no', this.checkDetail.contract_no);
		           data.append('user_id',this.userInfo.id);
		           data.append('type', this.dealType);
		           data.append('discount_type', this.isSettle);
		           data.append('amount', this.reduceMoney);
		           data.append('pay_amt', this.consultValue);
		           data.append('commit',this.remark);
		           const url=this.$checkStage('/charge/commit/create')
		           this.$http.post(url, data).then((response) => {
		           	            console.log(response)
		           	            if(response.data.isSucceed==200){
		           	            	 this.$router.push({path:'/backPage'})
		           	            	 this.$message({
								          message: this.dealDetail+'成功',
								          type: 'success'
							         });
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
	      	   this.formSearch.page=val
    	      this.$options.methods.inquire.bind(this)()
	      },
	      onSearch(){
	      	this.loading1=true
	        this.formSearch.page=1
    	    this.$options.methods.inquire.bind(this)()

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
  .nav1 .nav1-grid{
    font-size: 16px;
    padding-left: 30px;
    margin-top: 20px;
  }
  .el-col-6{
    margin-bottom: 20px;
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
	.nav1 ul li span{
		flex: 1;
	}
	.nav1 ul li .remark-span{
		flex:3;
	}
	.nav1 ul li .date-span{
		flex:2;
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
	.nav1 ul li .span-right-money i{
		font-style: normal;
	}
	.nav2{
		padding: .1rem .3rem;
	}
	.nav2 .nav2-box{
		margin-top: .1rem;
		padding: .1rem .2rem;
	}
	.nav2 ul{
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
	.nav2 ul li:hover{
		background: #ecf5ff;
	}
	.nav2 ul .nav2-li-head:hover{
		background: #F1F2F8;
	}
	 .last-li p{
	 	text-align: center;
		width: 100%;
	}
	 .last-li p b{
		color: red;
	}
	.nav2 ul .nav2-li-head{
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
		line-height: 30px;
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
		z-index:999;
	}
	.span-check{

		color: #0BB1FF;
	}
	.span-check button{
		height: 25px;
	}
	.span-check:hover{
		color: #2299DD;
	}

	.redSpan{
		margin-left: .2rem;
		color: red;
	}

  .duihao{
    color: #10C55B;
  }
</style>
