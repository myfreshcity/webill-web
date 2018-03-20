<!--减免列表-->

<template>
	<div class="content">
	  <div class="filter-container client-serach">
	  	<el-form :inline="true" :model="formSearch" class="demo-form-inline">
        <el-form-item label="客户姓名">
          <el-input v-model="formSearch.realName" placeholder="客户姓名"></el-input>
        </el-form-item>
        <el-form-item label="发起人">
		    <el-input v-model="formSearch.mobileNo" placeholder="发起人"></el-input>
		  </el-form-item>
		  <el-form-item label="协商金额">
		    <el-input v-model="formSearch.idNo" placeholder="协商金额"></el-input>
		  </el-form-item>
		   <el-form-item>
		    <el-button type="primary" @click="onSearch" :loading="loading1">查询</el-button>
		    <el-button type="primary" @click="clear" >清空</el-button>
		  </el-form-item>
		</el-form>
	  </div>
	  <ul class="client-ul">
	  	<li class="client-li"><span>合同编号</span><span>客户姓名</span><span>合同状态</span><span>逾期期数</span><span>逾期天数</span><span>协商金额</span><span>处理备注</span><span>减免有效期</span><span>发起人</span><span>操作</span></li>
	  	<li>
	  		<span >67524174</span>
	  		<span >张三</span>
	  		<span >逾期</span>
	  		<span >3期</span>
	  		<span >10</span>
	  		<span >500</span>
	  		<span >无</span>
	  		<span >2018-3-8</span>
	  		<span >电催1</span>
	  		<span >查看</span>
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
    data() {
      return {
      	downloadLoading:false,
      	loading1:false,
      	loading2:false,
      	totalCount:0,
      	clientList:[],
      	latestReportType:'',
      	filename:"",
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
      	currentPage:1,
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
    	msgStatus(index){
    		if(index==-1){
    			return "准备获取"
    		}else if(index==0){
    			return "获取中"
    		}else if(index==1){
    			return "获取成功"
    		}else{
    			return "获取失败"
    		}
    	}
    },
    mounted:function(){
    	   $(window).unbind ('scroll');
    	   if(this.userInfo.mobileNo){
	           var data = new FormData();
	           data.append('userId', this.userInfo.id);
	           data.append('start', 1);
	           data.append('length', 10);
	           data.append('realName', this.formSearch.realName);
	           data.append('mobileNo', this.formSearch.mobileNo);
	           data.append('idNo', this.formSearch.idNo);
	           data.append('latestReportStatus', this.formSearch.latestReportStatus);
	           data.append('latestReportType', this.formSearch.latestReportType);
	           data.append('sortWay', this.formSearch.sortWay);
	           data.append('timeFrom',this.formSearch.latestReportTimeDatetime)
	           const url=this.$backStage('/api/customer/list')
	           this.$http.post(url, data).then((response) => {
	                        this.clientList=response.data.records
	                        this.totalCount=response.data.total
	                         console.log(this.clientList)
	                    }, (response) => {

	                    });
          }  else{
          	 if (getToken()) {
    	         const url=this.$backStage('/api/user/login')
    	         const _this=this
					     _this.$http.post(url,{"mobileNo":Cookies.get("_wibn"),"password":Cookies.get("_wibp"),'checkFlag':"pwd"})
					      .then((response) => {
					          if(response.data.status==200){
					             this.$store.dispatch('UserInfo', response.data.obj)
					             var data = new FormData();
						           data.append('userId', _this.userInfo.id);
						           data.append('start', 1);
						           data.append('length', 10);
						           data.append('realName', _this.formSearch.realName);
						           data.append('mobileNo', _this.formSearch.mobileNo);
						           data.append('idNo', _this.formSearch.idNo);
						           data.append('latestReportStatus', _this.formSearch.latestReportStatus);
						           data.append('latestReportType', _this.formSearch.latestReportType);
						           data.append('sortWay', _this.formSearch.sortWay);
						           data.append('timeFrom',_this.formSearch.latestReportTimeDatetime)
						           const url=_this.$backStage('/api/customer/list')
						           _this.$http.post(url, data).then((response) => {
						                        _this.clientList=response.data.records
						                        _this.totalCount=response.data.total
						                         console.log(_this.clientList)
						                    }, (response) => {

						                    });
					          }else{
					          	_this.$alert("登录信息有误，请退出后重新登录", '系统提示', {
							          confirmButtonText: '确定',
							        });
					          }

					      }).catch(function(response){
				             _this.$alert("登录信息有误，请退出后重新登录", '系统提示', {
							          confirmButtonText: '确定',
							        });
				        })
             }
          }
         

    },
     methods: {
	    handleDownload() {
	      this.downloadLoading = true
	      import('@/vendor/Export2Excel').then(excel => {
	      	debugger
	        const tHeader = ['Id', 'Title', 'Author', 'Readings', 'Date']
	        const filterVal = ['id', 'id', 'id', 'id', 'id']
	        const list = this.clientList
	        const data = this.formatJson(filterVal, list)
	        excel.export_json_to_excel(tHeader, data, this.filename)
	        this.downloadLoading = false
	      })
	    },
	    formatJson(filterVal, jsonData) {
	      return jsonData.map(v => filterVal.map(j => {
//	        if (j === 'timestamp') {
//	          return parseTime(v[j])
//	        } else {
	          return v[j]
//	        }
	      }))
	    },
      clear(){
      	this.formSearch.realName=""
      	this.formSearch.mobileNo=""
      	this.formSearch.idNo=""
      	this.formSearch.latestReportStatus=""
      	this.formSearch.latestReportType=""
      	this.formSearch.latestReportTimeDatetime=""
      },
      refresh(){
      	this.loading2=true
      	var data = new FormData();
           data.append('userId', this.userInfo.id);
           data.append('start', 1);
           data.append('length', 10);
           data.append('realName', this.formSearch.realName);
           data.append('mobileNo', this.formSearch.mobileNo);
           data.append('idNo', this.formSearch.idNo);
           data.append('latestReportStatus', this.formSearch.latestReportStatus);
           data.append('latestReportType', this.formSearch.latestReportType);
           data.append('sortWay', this.formSearch.sortWay);
           data.append('timeFrom',this.formSearch.latestReportTimeDatetime)
            const url=this.$backStage('/api/customer/list')
           this.$http.post(url, data).then((response) => {
           	            this.loading2=false
                        this.clientList=response.data.records
                        this.totalCount=response.data.total
                        this.$message('刷新成功');
                    }, (response) => {
                       this.loading2=false
                       this.$message('刷新失败');
                    });
      },
      checkMsg(data){
      	const url=this.$backStage('/api/customer/selectReport')
      	this.$http.post(url, {"latestReportKey":data.latestReportKey,"name":data.realName,"idCard":data.idNo,"mobile":data.mobileNo})
      	.then((response) => {
                        this.$store.dispatch('MsgDetail', response.data.obj)
                        this.$store.dispatch('ReportKey', data.latestReportKey)
                        if(data.latestReportType==0){
                        	this.$router.push({path:'/client/reportPageBase'})
                        }else{
                            this.$router.push({path:'/client/reportPageNorm'})
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
           data.append('start', (val-1)*10);
           data.append('length', 10);
           data.append('realName', this.formSearch.realName);
           data.append('mobileNo', this.formSearch.mobileNo);
           data.append('idNo', this.formSearch.idNo);
           data.append('latestReportStatus', this.formSearch.latestReportStatus);
           data.append('latestReportType', this.formSearch.latestReportType);
           data.append('sortWay', this.formSearch.sortWay);
           data.append('timeFrom',this.formSearch.latestReportTimeDatetime)
            const url=this.$backStage('/api/customer/list')
           this.$http.post(url, data).then((response) => {
                        this.clientList=response.data.records
                        this.totalCount=response.data.total
                    }, (response) => {

                    });
      },
      onSearch(){
      	this.loading1=true
      	var data = new FormData();
           data.append('userId', this.userInfo.id);
           data.append('start', 1);
           data.append('length', 10);
           data.append('realName', this.formSearch.realName);
           data.append('mobileNo', this.formSearch.mobileNo);
           data.append('idNo', this.formSearch.idNo);
           data.append('latestReportStatus', this.formSearch.latestReportStatus);
           data.append('latestReportType', this.formSearch.latestReportType);
           data.append('sortWay', this.formSearch.sortWay);
           data.append('timeFrom',this.formSearch.latestReportTimeDatetime)
            const url=this.$backStage('/api/customer/list')
           this.$http.post(url, data).then((response) => {
           	            this.loading1=false
                        this.clientList=response.data.records
                        this.totalCount=response.data.total
                        $("#foot-page .el-input__inner")[0].value=1
                        $(".el-pager").children("li").removeClass("active");
                        $(".el-pager").children("li").eq(0).addClass("active");
                    }, (response) => {
                        this.loading1=false
                    });

      }
    },
    computed: {
	    ...mapGetters([
	      'msgType',
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
	.content .client-ul p{
		overflow: hidden;
		border-bottom: 1px #E3E7F1 solid;
		padding: .1rem .2rem;
		background: #F1F2F8;
	}
	.content .client-ul p .client-spanLeft{
		float: left;
		padding: .1rem 0;
	}
	.content .client-ul p button{
		float: right;
		margin-right: .3rem;
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
	.content .client-ul li .client-span-card{
		flex: 1.5;
	}
</style>
