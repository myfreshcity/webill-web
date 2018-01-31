<!--客户列表-->

<template>
	<div class="content">
	  <div class="filter-container client-serach">
	  	<el-form :inline="true" :model="formSearch" class="demo-form-inline">
	  	  <el-form-item label="数据列表">
		  	  <el-date-picker
			      v-model="formSearch.latestReportTimeDatetime"
			      type="date"
			      placeholder="选择日期"
			      value-format="yyyy-MM-dd">
			   </el-date-picker>
		  </el-form-item>
		  <el-form-item label="">
		    <el-input v-model="formSearch.realName" placeholder="客户姓名"></el-input>
		  </el-form-item>
		  <el-form-item label="">
		    <el-input v-model="formSearch.mobileNo" placeholder="手机号码"></el-input>
		  </el-form-item>
		  <el-form-item label="">
		    <el-input v-model="formSearch.idNo" placeholder="身份证号"></el-input>
		  </el-form-item>
		  <el-form-item label="">
		    <el-select v-model="formSearch.latestReportType" placeholder="信息类型">
		      <el-option label="基础" value="0"></el-option>
		      <el-option label="标准" value="1"></el-option>
		    </el-select>
		  </el-form-item>
		  <el-form-item label="">
		    <el-select v-model="formSearch.latestReportStatus" placeholder="信息状态">
		      <el-option label="获取中" value="0"></el-option>
		      <el-option label="获取成功" value="1"></el-option>
		      <el-option label="获取失败" value="2"></el-option>
		    </el-select>
		  </el-form-item>
		  <el-form-item>
		    <el-button type="primary" @click="onSearch">查询</el-button>
		  </el-form-item>
		</el-form>
	  </div>
	  <ul class="client-ul">
	  	<li class="client-li"><span>序号</span><span>最近更新时间</span><span>客户姓名</span><span class="client-span">手机号</span><span class="client-span">身份证号</span><span>信息类型</span><span>查询次数</span><span>信息状态</span><span class="client-span">操作</span></li>
	  	<li v-for="(ele,k) in clientList">
	  		<span>{{ele.id}}</span>
	  		<span>{{ele.latestReportTimeStr}}</span>
	  		<span>{{ele.realName}}</span>
	  		<span class="client-span">{{ele.mobileNo}}</span>
	  		<span class="client-span">{{ele.idNo}}</span>
	  		<span>{{ele.latestReportType|msgType}}</span>
	  		<span>{{ele.refreshTimes}}</span>
	  		<span>{{ele.latestReportStatus|msgStatus}}</span>
	  		<span class="client-span">
	  			<b class="checkMsg" v-show="ele.latestReportStatus==1||(ele.latestReportStatus==2&&ele.refreshTimes>0)" @click="checkMsg(ele)">查看信息</b>
	  			<b class="getMsg" v-show="ele.latestReportStatus==1||ele.latestReportStatus==2">重新获取</b>
	  		</span>
	  	</li>
	  </ul>
	  <div class="block" id="foot-page">
	    <el-pagination
	      @current-change="handleCurrentChange"
	      :page-size="10"
	      layout="total, prev, pager, next, jumper"
	      :total="totalCount">
	    </el-pagination>
	  </div>
	</div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { getClientList } from '@/api/client'
  export default {
    data() {
      return {
      	totalCount:0,
      	clientList:[],
      	latestReportType:'',
      	formSearch:{
      		latestReportTimeDatetime:"",
      		realName:"",
      		mobileNo:"",
      		idNo:"",
      		latestReportType:"",
      		latestReportStatus:"",
      		start:0,
      		length:10,
      		sortWay:""
      	},
         currentPage4: 4
      }
    },
    filters:{
    	msgType(index){
    		if(index==0){
    			return "标准"
    		}else{
    			return "高级"
    		}
    	},
    	msgStatus(index){
    		if(index==0){
    			return "获取中"
    		}else if(index==1){
    			return "获取成功"
    		}else{
    			return "获取失败"
    		}
    	}
    },
    mounted:function(){
           var data = new FormData();
           data.append('userId', 1);
           data.append('start', 1);
           data.append('length', 10);
           data.append('realName', this.formSearch.realName);
           data.append('mobileNo', this.formSearch.mobileNo);
           data.append('idNo', this.formSearch.idNo);
           data.append('latestReportStatus', this.formSearch.latestReportStatus);
           data.append('latestReportType', this.formSearch.latestReportType);
           data.append('sortWay', this.formSearch.sortWay);
           const url=this.$backStage('/api/customer/list')
           this.$http.post(url, data).then((response) => {
                        // success callback
                        console.log(response)
                        this.clientList=response.data.records
                        this.totalCount=response.data.total
                    }, (response) => {
                        // error callback
                    });
           
    	
    },
     methods: {
      checkMsg(data){
      	console.log(data)
      	const url=this.$backStage('/api/customer/selectReport')
      	this.$http.post(url, {"reportKey":data.latestReportKey,"name":data.realName,"idCard":data.idNo,"mobile":data.mobileNo})
      	.then((response) => {
                        // success callback
                        console.log(response)
                        this.$store.dispatch('MsgDetail', response.data.obj)
                        if(this.msgType==0){
                        	this.$router.push({path:'/client/reportPageBase'})
                        }else{
                            this.$router.push({path:'/client/reportPageNorm'})
                        }
                    }, (response) => {
                        // error callback
                    });
      },
      handleCurrentChange(val) {
      	   var data = new FormData();
           data.append('userId', 1);
           data.append('start', (val-1)*10);
           data.append('length', 10);
           data.append('realName', this.formSearch.realName);
           data.append('mobileNo', this.formSearch.mobileNo);
           data.append('idNo', this.formSearch.idNo);
           data.append('latestReportStatus', this.formSearch.latestReportStatus);
           data.append('latestReportType', this.formSearch.latestReportType);
           data.append('sortWay', this.formSearch.sortWay);
            const url=this.$backStage('/api/customer/list')
           this.$http.post(url, data).then((response) => {
                        // success callback
                        console.log(response)
                        this.clientList=response.data.records
                        this.totalCount=response.data.total
                    }, (response) => {
                        // error callback
                    });
      },
      onSearch(){
      	var data = new FormData();
           data.append('userId', 1);
           data.append('start', 1);
           data.append('length', 10);
           data.append('realName', this.formSearch.realName);
           data.append('mobileNo', this.formSearch.mobileNo);
           data.append('idNo', this.formSearch.idNo);
           data.append('latestReportStatus', this.formSearch.latestReportStatus);
           data.append('latestReportType', this.formSearch.latestReportType);
           data.append('sortWay', this.formSearch.sortWay);
            const url=this.$backStage('/api/customer/list')
           this.$http.post(url, data).then((response) => {
                        // success callback
                        console.log(response)
                        this.clientList=response.data.records
                        this.totalCount=response.data.total
                    }, (response) => {
                        // error callback
                    });
      }
    },
    computed: {
	    ...mapGetters([
	      'msgType'
	    ])
	}
  }
</script>

<style scoped>
	.content {
		padding-top: 10px;
	}
	.client-serach .el-input{
		width: 140px;
	}
	.client-serach .el-select{
		width: 140px;
	}
	.el-button--primary{
		margin-left: 20px;
	}
	.content .client-ul{
		margin: 0 20px;
		border: 1px #E3E7F1 solid;
		border-right:none ;
		border-bottom: none;
		font-size: 14px;
		border-radius: 5px;
	}
	.content .client-ul li{
		display: flex;
		border-bottom: 1px #E3E7F1 solid;
	}
	.content .client-ul .client-li{
		background: #F1F2F8;
		font-size: 16px;
		font-weight: bold;
	}
	.content .client-ul .client-li span{
		font-weight: bold;
	}
	.content .client-ul li span{
		flex: 1;
		text-align: center;
		padding: 20px 0;
		border-right: 1px #E3E7F1 solid;
	}
	.content .client-ul li .client-span{
		flex: 1.5;
	}
	.content .client-ul li span .checkMsg{
		border-radius: 3px;
		background: #409EFF;
		color: #fff;
		padding: 6px 6px;
		margin-right: 10px;
		font-size: 12px;
	}
	.content .client-ul li span .getMsg{
		border-radius: 3px;
		border:1px #409EFF solid;
		color: #409EFF;
		padding: 6px 6px;
		font-size: 12px;
	}
</style>