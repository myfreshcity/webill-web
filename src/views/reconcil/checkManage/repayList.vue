<!--还款流水列表-->

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
		    <el-input v-model="formSearch.wasteId" placeholder="流水单号"></el-input>
		  </el-form-item>
		   <el-form-item label="">
		    <el-select v-model="formSearch.checkStatus" placeholder="流水状态">
		      <el-option label="匹配中" value="0"></el-option>
		      <el-option label="已匹配" value="1"></el-option>
		      <el-option label="未匹配" value="2"></el-option>
		    </el-select>
		  </el-form-item>
		  <el-form-item label="">
		    <el-date-picker class="dataInp"
                          v-model="formSearch.date"
                          type="date"
                          placeholder="支付时间"
                          value-format="yyyy-MM-dd">
            </el-date-picker>
		  </el-form-item>
		  <el-form-item>
		    <el-button type="primary" @click="onSearch" :loading="loading1">查询</el-button>
		    <el-button  @click="clear" >清空</el-button>
		  </el-form-item>
		</el-form>
	  </div>
	  <p class="ul-head"><span class="client-spanLeft">数据列表</span><el-button type="primary" @click="guide()" :loading="downloadLoading">导入流水</el-button></p>
	  <ul class="client-ul">
	  	<li class="client-li"><span class="client-span-time">支付时间</span><span>客户姓名</span><span>所在门店</span><span>还款金额</span><span>余额</span><span>渠道</span><span>收款尾号</span><span>流水单号</span><span>流水状态</span><span class="client-span-time">创建时间</span><span>操作</span></li>
	  	<li v-for="(ele,k) in contractList">
	  		<span class="client-span-time">{{ele.refundTime}}</span>
	  		<span >{{ele.refund_name}}</span>
	  		<span >{{ele.shop}}</span>
	  		<span >{{ele.amount}}</span>
	  		<span>{{ele.remain_amt}}</span>
	  		<span >{{ele.way}}</span>
	  		<span >{{ele.card_id}}</span>
	  		<span>{{ele.file_id}}</span>
	  		<span>
	  			<el-tooltip class="item" effect="dark" content="已匹配" placement="right"><i class="el-icon-check" v-show="ele.t_status==1"></i></el-tooltip>
	  			<el-tooltip class="item" effect="dark" content="未匹配" placement="right"><i class="el-icon-close" v-show="ele.t_status==2"></i></el-tooltip>
	  			<el-tooltip class="item" effect="dark" content="匹配中" placement="right"><svg-icon icon-class="wait" v-show="ele.t_status==0"/></el-tooltip>
	  		</span>
	  		<span class="client-span-time">{{ele.create_time}}</span>
	  		<span class="span-check">
	  		<el-button type="text" v-if="ele.t_status==1" @click="detail(ele)" >查看</el-button>
	  		<el-button type="text" v-if="ele.t_status==2" @click="rematch(ele)">重试</el-button>
	  		<el-button type="text" v-if="ele.t_status==1" @click="reset(ele)">重置</el-button>
	  		</span>
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
    data(){
        return {
	      	downloadLoading:false,
	      	loading:false,
	      	loading1:false,
	      	totalCount:0,
	      	contractList:[],
	      	isGuide:false,
	      	bgShow:false,
	      	formSearch:{
	      		realName:"",
	      		date:"",
	      		shop:"",
	      		checkStatus:"",
	      		wasteId:"",
	      		page:1,
	      	},
	      	 options: [{
	          value: '选项1',
	          label: '模板一'
	        }, {
	          value: '选项2',
	          label: '模板二'
	        }],
	        value: '',
	      	currentPage:1,
      }
    },
    filters:{
    	checkFilter(index){
    		if(index==0){
    			return "逾期"
    		}else if(index==1){
    			return "正常"
    		}
    	},
    	fileFilter(index){
    		if(index){
    			return "已匹配"
    		}else{
    			return "未匹配"
    		}
    	}
    },
    watch:{
    	
    },
    mounted:function(){
		 $(window).unbind ('scroll');
		      this.formSearch.wasteId=this.wasteId
	          this.formSearch.page=1
    	      this.$options.methods.inquire.bind(this)()
    },
    methods: {
     inquire(){
 	       var data = new FormData();
           data.append('userId', this.userInfo.id);
           data.append('page', this.formSearch.page);
           data.append('refund_name', this.formSearch.realName);
           data.append("file_id",this.formSearch.wasteId)
           data.append('shop',this.formSearch.shop);
           data.append('is_match',this.formSearch.checkStatus);
           data.append('refund_time', this.formSearch.date);
           const url=this.$checkStage('/charge/refund/search')
           this.$http.post(url, data).then((response) => {
           	            this.loading1=false
                        this.contractList=response.data.search_refund_list
                        this.totalCount=response.data.num
                    }, (response) => {
                        this.loading1=false
                    });
     },
 	 detail(obj){
 		sessionStorage.setItem('extraData',obj.contract_id)
	    this.$router.push({path:'/reconcil/repaymentPlan'})
 	 },
 	 reset(obj){
 	 	this.$confirm('确定要重置还款流水吗？', '系统提示', {
							          confirmButtonText: '确定',
							          cancelButtonText: '取消',
							          type: 'warning'
							        }).then(() => {
							           var data = new FormData();
	           data.append('refund_id', obj.refund_id);
	           const url=this.$checkStage('/charge/refund/reset')
	           this.$http.post(url, data).then((response) => {
	           	            if(response.data.isSucceed==200){
           	            	  this.$message({
						          message: '重置成功',
						          type: 'success'
						        });
    	                       this.$options.methods.inquire.bind(this)()
	           	            }else{
	           	            	this.$alert(response.data.message, '系统提示', {
					                  confirmButtonText: '确定',
							    });
	           	            }
	                    }, (response) => {
	                    	
	                        
	                    });
							        }).catch(() => {
							           
							        });


 	 		   

 	 },
 	 rematch(obj){
 	 	var data = new FormData();
	           data.append('refund_id', obj.refund_id);
	           const url=this.$checkStage('/charge/refund/rematch')
	           this.$http.post(url, data).then((response) => {
	           	            console.log(response)
	           	            if(response.data.isSucceed==200){
           	            	  this.$message({
						          message: '匹配成功',
						          type: 'success'
						        });
    	                       this.$options.methods.inquire.bind(this)()
	           	            }else{
	           	            	this.$alert(response.data.message, '系统提示', {
					                  confirmButtonText: '确定',
							    });
	           	            }
	                    }, (response) => {
	                    	
	                        
	                    });
 	 },
	  guide(){
	  	this.$router.push({path:'/reconcil/checkSelf'})
	  },
      clear(){
      	this.formSearch.realName=""
      	this.formSearch.date=""
      	this.formSearch.shop=""
      	this.formSearch.checkStatus=""
      	this.formSearch.wasteId=""
      	this.formSearch.shop=""
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
      	sessionStorage.setItem('shop',this.formSearch.shop)
      	this.formSearch.page=1
    	this.$options.methods.inquire.bind(this)()

      }
    },
    computed: {
	    ...mapGetters([
	      'msgType',
	      'userInfo',
	      'wasteId'
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

	.ul-head{
		padding: .1rem .2rem;
		overflow: hidden;
		margin-bottom: .1rem;
	}
	.ul-head .client-spanLeft{
		float: left;
		padding: .2rem 0 .1rem 0;
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
		font-size: 14px;
		flex: 1;
		text-align: center;
		padding: .1rem 0;
		border-right: 1px #E3E7F1 solid;
		line-height: 40px;
	}
	.content .client-ul li .client-span-time{
		flex: 2;
	}
	/*导入合同窗口*/
	.contract{
		width: 40%;
		height: 4.4rem;
		position: fixed;
		left: 50%;
		top:50% ;
		margin-left: -20%;
		margin-top: -2.2rem;
		border: 1px #E3E7F1 solid;
		background: #fff;
		padding: .3rem;
		z-index: 1000;
	}
	.contract .el-select{
		margin-left: .2rem;
		width: 1.6rem;
	}
	.p1{
		font-size: .16rem;
		margin-bottom: .3rem;
		margin-top: .2rem;
	}
	.p1 button{
		padding: .1rem .2rem;
		margin-left: .3rem;
		text-align: center;
		font-size: .16rem;
	}
	.p1 input{
		margin-left: .3rem;
		outline: none;
		font-size: .16rem;
		display: inline-block;
		border-radius: .2rem;
	}
	.p2{
		color: #666;
		margin-bottom: .3rem;
	}
	.p3{
		color: red;
		margin-bottom: .2rem;
	}
	.p4 {
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
		color: #333;
	}
	.redSpan{
		color: red;
	}
	.el-icon-check{
		font-size: 20px;
		font-weight: bold;
		color: #10C55B;
	}
	.el-icon-close{
		font-size: 20px;
		font-weight: bold;
		color: #FF3F3F;
	}
	.content .client-ul li  .svg-icon{
		font-size: 20px;
	}
</style>
