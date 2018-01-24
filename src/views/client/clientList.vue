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
		      <el-option label="标准" value="0"></el-option>
		      <el-option label="高级" value="1"></el-option>
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
	  		<span>{{ele.count}}</span>
	  		<span>{{ele.latestReportTimeDatetime}}</span>
	  		<span>{{ele.realName}}</span>
	  		<span class="client-span">{{ele.mobileNo}}</span>
	  		<span class="client-span">{{ele.idNo}}</span>
	  		<span>{{ele.latestReportType|msgType}}</span>
	  		<span>{{ele.refreshTimes}}</span>
	  		<span>{{ele.latestReportStatus|msgStatus}}</span>
	  		<span class="client-span">
	  			<b class="checkMsg">查看信息</b>
	  			<b class="getMsg">重新获取</b>
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
      		length:10
      	},
        tableData: [{
          count:1,
          latestReportTimeDatetime: '2016-05-03',
          realName: '王小虎',
          mobileNo: '18888888888',
          idNo: '411102199105080059',
          latestReportType: '0',
          refreshTimes: 1,
          latestReportStatus:"0"
        }, {
          count:2,
          latestReportTimeDatetime: '2016-05-03',
          realName: '王小虎',
          mobileNo: '18888888888',
          idNo: '411102199105080059',
          latestReportType: '0',
          refreshTimes: 1,
          latestReportStatus:"1"
        },{
          count:3,
          latestReportTimeDatetime: '2016-05-03',
          realName: '王小虎',
          mobileNo: '18888888888',
          idNo: '411102199105080059',
          latestReportType: '1',
          refreshTimes: 1,
          latestReportStatus:"2"
        },{
          count:4,
          latestReportTimeDatetime: '2016-05-03',
          realName: '王小虎',
          mobileNo: '18888888888',
          idNo: '411102199105080059',
          latestReportType: '0',
          refreshTimes: 1,
          latestReportStatus:"0"
        },{
          count:5,
          latestReportTimeDatetime: '2016-05-03',
          realName: '王小虎',
          mobileNo: '18888888888',
          idNo: '411102199105080059',
          latestReportType: '1',
          refreshTimes: 1,
          latestReportStatus:"1"
        },{
          count:6,
          latestReportTimeDatetime: '2016-05-03',
          realName: '王小虎',
          mobileNo: '18888888888',
          idNo: '411102199105080059',
          latestReportType: '0',
          refreshTimes: 1,
          latestReportStatus:"2"
        },{
          count:7,
          latestReportTimeDatetime: '2016-05-03',
          realName: '王小虎',
          mobileNo: '18888888888',
          idNo: '411102199105080059',
          latestReportType: '0',
          refreshTimes: 1,
          latestReportStatus:"1"
        },{
          count:8,
          latestReportTimeDatetime: '2016-05-03',
          realName: '王小虎',
          mobileNo: '18888888888',
          idNo: '411102199105080059',
          latestReportType: '0',
          refreshTimes: 1,
          latestReportStatus:"1"
        },{
          count:9,
          latestReportTimeDatetime: '2016-05-03',
          realName: '王小虎',
          mobileNo: '18888888888',
          idNo: '411102199105080059',
          latestReportType: '1',
          refreshTimes: 1,
          latestReportStatus:"0"
        },{
          count:10,
          latestReportTimeDatetime: '2016-05-03',
          realName: '王小虎',
          mobileNo: '18888888888',
          idNo: '411102199105080059',
          latestReportType: '0',
          refreshTimes: 1,
          latestReportStatus:"2"
        },{
          count:11,
          latestReportTimeDatetime: '2016-05-03',
          realName: '王小虎',
          mobileNo: '18888888888',
          idNo: '411102199105080059',
          latestReportType: '0',
          refreshTimes: 1,
          latestReportStatus:"2"
        },{
          count:12,
          latestReportTimeDatetime: '2016-05-03',
          realName: '王小虎',
          mobileNo: '18888888888',
          idNo: '411102199105080059',
          latestReportType: '1',
          refreshTimes: 1,
          latestReportStatus:"1"
        }],
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
    	this.totalCount=this.tableData.length
    	for(let i=0;i<this.tableData.length;i++){
    		if(i<10){
    			this.clientList.push(this.tableData[i])
    		}
    	}
    },
     methods: {
      handleClick(row) {
        console.log(row);
      },
      handleCurrentChange(val) {
      	this.clientList=[]
          this.$http.post("http://yadong.test.manmanh.com/webill-app/api/customer/list",this.formSearch)
          .then(response => {
          	console.log(response)
		    // success callback
		  }, response => {
		    // error callback
		  })
      	for(let i=0;i<this.tableData.length;i++){
      		if((val-1)*10-1<i&&i<val*10){
      			this.clientList.push(this.tableData[i])
      		}
      	}
      },
      onSearch(){
      	console.log(this.formSearch)
      }
    },
  }
</script>

<style scoped>
	.content {
		padding-top: 10px;
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
		padding: 5px 3px;
		margin-right: 10px;
		font-size: 12px;
	}
	.content .client-ul li span .getMsg{
		border-radius: 3px;
		border:1px #409EFF solid;
		color: #409EFF;
		padding: 5px 2px;
		font-size: 12px;
	}
</style>