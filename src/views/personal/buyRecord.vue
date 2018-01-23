<!--购买记录-->

<template>
	<div class="content">
	  <div class="filter-container client-serach">
	  	<el-form :inline="true" :model="formSearch" class="demo-form-inline">
	  	  
		  <el-form-item label="购买类型">
		    <el-select v-model="formSearch.latestReportType" placeholder="请选择消费类型">
		      <el-option label="客户信息-标准版" value="0"></el-option>
		      <el-option label="客户信息-高级版" value="1"></el-option>
		    </el-select>
		  </el-form-item>
		  <el-form-item label="购买时间">
		  	  <el-date-picker
			      v-model="formSearch.beginTime"
			      type="date"
			      placeholder="选择日期"
			      value-format="yyyy-MM-dd">
			   </el-date-picker>
		  </el-form-item>
		  <el-form-item label="至">
		  	  <el-date-picker
			      v-model="formSearch.lateTime"
			      type="date"
			      placeholder="选择日期"
			      value-format="yyyy-MM-dd">
			   </el-date-picker>
		  </el-form-item>
		  <el-form-item>
		    <el-button type="primary" @click="onSearch">查询</el-button>
		  </el-form-item>
		</el-form>
	  </div>
	  <ul class="client-ul">
	  	<li class="client-li"><span>序号</span><span class="client-span">购买类型</span><span>套餐类型</span><span>有效时长</span><span>金额</span><span  class="client-span">购买时间</span></li>
	  	<li v-for="(ele,k) in clientList">
	  		<span>{{ele.count}}</span>
	  		<span class="client-span">{{ele.buyType|msgType}}</span>
	  		<span>{{ele.comboType}}</span>
	  		<span>{{ele.validTime}}</span>
	  		<span>{{ele.amount}}</span>
	  		<span class="client-span">{{ele.buyTime}}</span>
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
      		latestReportType:"",
      		beginTime:"",
      		lastTime:"",
      		start:0,
      		length:10
      	},
        tableData: [{
          count:1,
          buyType:0,
          comboType:"500次",
          validTime:"1年",
          amount:"1000",
          buyTime:"2017-12-21"
        },{
          count:2,
          buyType:1,
          comboType:"100次",
          validTime:"1年",
          amount:"1000",
          buyTime:"2017-12-21"
        },{
          count:3,
          buyType:1,
          comboType:"50次",
          validTime:"1年",
          amount:"1000",
          buyTime:"2017-12-21"
        },{
          count:4,
          buyType:0,
          comboType:"200次",
          validTime:"1年",
          amount:"1000",
          buyTime:"2017-12-21"
        },{
          count:5,
          buyType:0,
          comboType:"500次",
          validTime:"1年",
          amount:"1000",
          buyTime:"2017-12-21"
        },{
          count:6,
          buyType:0,
          comboType:"500次",
          validTime:"1年",
          amount:"1000",
          buyTime:"2017-12-21"
        },{
          count:7,
          buyType:1,
          comboType:"500次",
          validTime:"1年",
          amount:"1000",
          buyTime:"2017-12-21"
        },{
          count:8,
          buyType:0,
          comboType:"500次",
          validTime:"1年",
          amount:"1000",
          buyTime:"2017-12-21"
        },{
          count:9,
          buyType:1,
          comboType:"500次",
          validTime:"1年",
          amount:"1000",
          buyTime:"2017-12-21"
        },{
          count:10,
          buyType:1,
          comboType:"500次",
          validTime:"1年",
          amount:"1000",
          buyTime:"2017-12-21"
        },{
          count:11,
          buyType:1,
          comboType:"500次",
          validTime:"1年",
          amount:"1000",
          buyTime:"2017-12-21"
        },{
          count:12,
          buyType:0,
          comboType:"100次",
          validTime:"1年",
          amount:"1000",
          buyTime:"2017-12-21"
        },],
         currentPage4: 4
      }
    },
    filters:{
    	msgType(index){
    		if(index==0){
    			return "客户信息-标准版"
    		}else{
    			return "客户信息-高级版"
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
		/*display: inline-block;*/
		border-radius: 3px;
		background: #409EFF;
		color: #fff;
		padding: 5px 2px;
		margin-right: 10px;
	}
	.content .client-ul li span .getMsg{
		border-radius: 3px;
		border:1px #409EFF solid;
		color: #409EFF;
		padding: 5px 2px;
	}
</style>