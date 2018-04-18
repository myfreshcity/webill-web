<!--减免详情-->

<!--对账详情-->

<template>
	<div class="content">
		<p class="title">
			协商金额审批详情
		</p>
		<div class="nav1">
			<ul>
				<li class="li-head"><span class="span-left">客户姓名</span><span class="span-right">{{creditDetail.customer}}</span></li>
				<li><span class="span-left">借款金额</span><span class="span-right">{{creditDetail.loan_amount}}</span></li>
				<li><span class="span-left">总期数</span><span class="span-right">{{creditDetail.tensor}}</span></li>
			</ul>
		</div>
		<div class="nav2" v-if="overtimeList.length!=0">
			<ul>
				<li class="nav2-li-head"><span>应还日期</span><span>还款期数</span><span>应还本息</span><span class="nav2-span-right">实还金额</span></li>
				<li v-for="(ele,k) in overtimeList">
					<span>{{ele.deadline}}</span>
					<span>{{ele.tensor}}</span>
					<span>{{ele.amount}}</span>
					<span class="nav2-span-right">-</span>
				</li>
				<li><span>合计</span><span>共{{creditDetail.overtime_num}}期</span><span>{{creditDetail.overtime_sum}}</span><span>{{creditDetail.remain_sum}}</span></li>
			</ul>
		</div>
		<div class="nav1 nav3">
			<ul>
				<li class="li-head"><span class="span-left">申请状态</span><span class="span-right">{{creditDetail.result|resultFilter}}</span></li>
				<li><span class="span-left">减免金额</span><span class="span-right">{{creditDetail.commit_amount}}</span></li>
				<li><span class="span-left">处理备注</span><span class="span-right">{{creditDetail.remark}}</span></li>
				<!--<li><span class="span-left">协商有效期</span><span class="span-right">{{creditDetail.deadline}}</span></li>-->
				<li>
					<span class="span-left">审核操作</span>
					<span class="span-right">
					    <el-radio v-model="selectType" label="100">&nbsp;通过</el-radio>
					    <el-radio v-model="selectType" label="200">&nbsp;拒绝</el-radio>
					</span>
				</li>
				<li><span class="span-left">拒绝原因</span><span class="span-right nav3-span-right"><el-input v-model="remark" :disabled="selectType==1" class="remark-input" placeholder=""></el-input></span></li>
			</ul>
			 <p class="nav3-sub" v-if="creditShow"><el-button v-waves type="primary" @click=creditSub>提交</el-button></p>
		</div>
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
				creditShow:true,
				selectType:'',    
				creditDetail:{},   //协商详情
				overtimeList:[],
				remark:"",
			}
		},
		filters:{
			resultFilter(data){
				if(data==0){
					return "待审核"
				}else if(data==100){
					return "通过"
				}else{
					return "拒绝"
				}
			}
		},
		mounted:function(){
					   $(window).unbind ('scroll');
					   const checkUrl=this.$checkStage('/charge/commit/detail/get')
			           this.$http.post(checkUrl, {'commit_id':sessionStorage.getItem('extraData')}).then((response) => {
	           	            console.log(response)
	           	            if(response.data.isSucceed==200){
		           	            this.creditDetail=response.data
		           	            this.overtimeList=this.creditDetail.ovetime_list
//		           	            if(this.creditDetail.result==0||this.creditDetail.result==1){
//		           	            	this.creditShow=false
//		           	            	this.selectType=String(this.creditDetail.result)
//		           	            }
	           	            }else{
	           	            	this.$alert(response.data.message, '系统提示', {
							                  confirmButtonText: '确定',
								});
							    this.$router.go(-1)
	           	            }
	                    }, (response) => {

	                    });
         },
         methods:{
         	creditSub(){
         	   if(this.selectType==2&&!this.remark){
         	   	    this.$alert("请填写拒绝原因", '系统提示', {
		                  confirmButtonText: '确定',
				    });
         	   }else{
	         	   var data = new FormData();
		           data.append('userId', this.userInfo.id);
		           data.append('commit_id', sessionStorage.getItem('extraData'));
		           data.append('result', this.selectType);
		           data.append('comments', this.remark);
		           const url=this.$checkStage('/charge/commit/approve')
		           this.$http.post(url, data).then((response) => {
		           	            if(response.data.isSucceed==200){
		           	            	this.$router.push({path:'/reconcil/creditList'})
		           	            	 this.$message({
								          message: '审核成功',
								          type: 'success'
							         });
		           	            }else{
		           	            	this.$alert("审核失败", '系统提示', {
							                  confirmButtonText: '确定',
									    });
		           	            }
	
		           }, (response) => {
	
		                    });
	            }
         	}
         },
		 computed: {
		    ...mapGetters([
		      'msgType',
		      'userInfo',
		      'contractNo',
		      'commitId'
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
	.nav1 ul{
		width: 80%;
		margin-top: .2rem;
		padding: .2rem;
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
	
	.nav3 .work-input{
		width: 30%;
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
</style>