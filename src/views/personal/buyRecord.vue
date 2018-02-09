<!--购买记录-->

<template>
	<div class="content">
	  <div class="filter-container client-serach">
	  	<el-form :inline="true" :model="formSearch" class="demo-form-inline">
	  	  
		  <el-form-item label="套餐类型">
		    <el-select v-model="formSearch.latestReportType" placeholder="请选择消费类型">
		      <el-option label="客户信息-基础版" value="0"></el-option>
		      <el-option label="客户信息-标准版" value="1"></el-option>
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
		    <el-button type="primary" @click="clear" >清空</el-button>
		  </el-form-item>
		</el-form>
	  </div>
	  <ul class="client-ul">
	  	<li class="client-li"><span>序号</span><span class="client-span">购买类型</span><span>套餐类型</span><span>信息次数</span><span>金额</span><span  class="client-span">购买时间</span></li>
	  	<li v-for="(ele,k) in clientList">
	  		<span>{{ele.id}}</span>
	  		<span class="client-span">{{ele.payType|mealType}}</span>
	  		<span>{{ele.infoLevel|msgType}}</span>
	  		<span>{{ele.times}}</span>
	  		<span>{{ele.price|priceFilter}}</span>
	  		<span class="client-span">{{ele.orderTimeStr}}</span>
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
  export default {
    data() {
      return {
      	totalCount:0,
      	clientList:[],
      	formSearch:{
      		latestReportType:"",
      		beginTime:"",
      		lastTime:"",
      		start:0,
      		length:10
      	},
        tableData: [],
         currentPage4: 4
      }
    },
    filters:{
    	msgType(index){
    		if(index==0){
    			return "基础版"
    		}else{
    			return "标准版"
    		}
    	},
    	mealType(index){
    		if(index==0){
    			return "客户信息"
    		}else{
    			return "会员"
    		}
    	},
    	priceFilter(data){
    		return data/100
    	}
    },
    mounted:function(){
    	if(this.userInfo.mobileNo){
    	   var data = new FormData();
           data.append('userId', this.userInfo.id);
           data.append('start', 1);
           data.append('length', 10);
           data.append('infoLevel', this.formSearch.latestReportType);
           data.append('timeFrom', this.formSearch.beginTime);
           data.append('timeTo', this.formSearch.lastTime);
           const url=this.$backStage('/api/trade/list')
           this.$http.post(url, data).then((response) => {
                        // success callback
                        this.clientList=response.data.records
                        this.totalCount=response.data.total
                    }, (response) => {
                        // error callback
                    });
        }else{
				this.$router.push({path:'/personal/account'})
		}
    },
     methods: {
      clear(){
     		this.formSearch.latestReportType=""
     		this.formSearch.beginTime=""
     		this.formSearch.lastTime=""
      },
      handleCurrentChange(val) {
           var data = new FormData();
           data.append('userId', this.userInfo.id);
           data.append('start', (val-1)*10);
           data.append('length', 10);
           data.append('infoLevel', this.formSearch.latestReportType);
           data.append('timeFrom', this.formSearch.beginTime);
           data.append('timeTo', this.formSearch.lastTime);
           const url=this.$backStage('/api/trade/list')
           this.$http.post(url, data).then((response) => {
                        // success callback
                        this.clientList=response.data.records
                        this.totalCount=response.data.total
                    }, (response) => {
                        // error callback
                    });
      },
      onSearch(){
      	   var data = new FormData();
           data.append('userId', this.userInfo.id);
           data.append('start', 1);
           data.append('length', 10);
           data.append('infoLevel', this.formSearch.latestReportType);
           data.append('timeFrom', this.formSearch.beginTime);
           data.append('timeTo', this.formSearch.lastTime);
           const url=this.$backStage('/api/trade/list')
           this.$http.post(url, data).then((response) => {
                        // success callback
                        this.clientList=response.data.records
                        this.totalCount=response.data.total
                    }, (response) => {
                        // error callback
                    });
      }
    },
     computed: {
	    ...mapGetters([
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
		width:3rem;
	}
	
	
	.client-serach .el-select{
		width: 3rem;
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
	
</style>