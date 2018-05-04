<!--导入流水页-->

<template>
	<div class="content">
         <p class="p-title">现金流水-模板下载</p>
         <p class="p-download p-download1"><el-button   @click="downLoad"><img src="../../../../static/images/reconcil/downLoad.png" alt="" /><span class="span1">点击下载 </span></el-button><span class="tip">(请先下载Excel模板，按照模板格式填写数据，以确保数据格式正确)</span></p>
         <p class="p-title">上传流水文件</p>
         <p class="p-download"><upload-excel-component @on-selected-file='selected'></upload-excel-component></p>
         <p class="p4"><el-button  type="primary" @click="UpladFile()" >确认上传</el-button></p>
         <!--<upload-excel-component @on-selected-file='selected'></upload-excel-component>-->
         <el-table :data="tableData" border highlight-current-row style="width: 100%;margin-top:20px;">
	      <el-table-column v-for='item of tableHeader' :prop="item" :label="item" :key='item'>
	      </el-table-column>
	    </el-table>
	    <div class="bg" v-show="bgShow"  v-loading="loading1"></div>
	</div>
</template>

<script>
	import $ from 'jquery'
	import { mapGetters } from 'vuex'
	import waves from '@/directive/waves/index.js' // 水波纹指令
	import UploadExcelComponent from '@/components/UploadExcel/index.vue'
	import {timeChange,MyFormatTime} from '@/utils/utils.js'
	export default {
		 directives: {
		    waves
		 },
		 components: { UploadExcelComponent },
		 data(){
		 	return{
		 		bgShow:false,
		 		fullscreenLoading: false,
		 		loading:false,
		 		loading1:false,
		 		tableData: [],
                tableHeader: [],
                timeList:[],    //最新支付时间列表
		 	}
		 },
		 mounted:function(){
		 	    $(window).unbind ('scroll');
		 		var url= this.$checkStage('/charge/refund/newest')
		 		this.$http.get(url).then(response=>{  
	            	console.log(response)
	            	this.timeList=response.data.refund_list
	            })
		 },
		 methods:{
		 	UpladFile(){
                if(document.getElementById("excel-upload-input").files.length==0){
		 			this.$alert("未选择文件", '系统提示', {
			                  confirmButtonText: '确定',
					});
		 		}else{
		 			for(let i=0;i<this.timeList.length;i++){
				      	for(let j=0;j<this.tableData.length;j++){
				      		if(this.tableData[j]['所在门店']==this.timeList[i].shop&&this.tableData[j]['渠道']==this.timeList[i].way){
				      			if(MyFormatTime(this.timeList[i].refundTime)>MyFormatTime(timeChange(this.tableData[j]['支付日期'])+" "+this.tableData[j]['支付时间'])){
				      				
								    this.$confirm('该支付流水可能在系统中已存在，重复导入会导致记账错误，仍然要上传吗？', '系统提示', {
							          confirmButtonText: '坚持上传',
							          cancelButtonText: '再想一想',
							          type: 'warning'
							        }).then(() => {
							           
							        }).catch(() => {
							           this.loading1=true
							           this.bgShow=true
							           var fileObj = document.getElementById("excel-upload-input").files; // 获取文件对象
							            var FileController = this.$checkStage('/charge/refund/upload');                    // 接收上传文件的后台地址 
							            var form = new FormData();
							            form.append("file", fileObj[0])
						                var _this=this
							            _this.$http.post(FileController, form).then(response=>{
							            	console.log(response)
							            	this.loading1=false
							            	this.bgShow=false
							            	if(response.data.isSucceed==200){
											    _this.$message({
										          message: '上传文件成功',
										          type: 'success'
										        });
											    _this.$store.dispatch("WasteId",response.data.file_id)
								                _this.$router.push({path:'/reconcil/repayList'})
							            	}else{
							            		_this.$alert(response.data.message, '系统提示', {
											        confirmButtonText: '确定',
											    });
							            	}
								         }, response => {
										    this.loading1=false
							            	this.bgShow=false
										  })
							        });
							        return false;
				      			}
				      		}else if(j==(this.tableData.length-1)&&i==(this.timeList.length-1)){
				      			this.loading1=true
							    this.bgShow=true
				      			var fileObj = document.getElementById("excel-upload-input").files; // 获取文件对象
							            var FileController = this.$checkStage('/charge/refund/upload');                    // 接收上传文件的后台地址 
							            var form = new FormData();
							            form.append("file", fileObj[0])
						                var _this=this
							            _this.$http.post(FileController, form).then(response=>{
							            	console.log(response)
							            	this.loading1=false
							            	 this.bgShow=false
							            	if(response.data.isSucceed==200){
											    _this.$message({
										          message: '上传文件成功',
										          type: 'success'
										        });
											    _this.$store.dispatch("WasteId",response.data.file_id)
								                _this.$router.push({path:'/reconcil/repayList'})
							            	}else{
							            		_this.$alert(response.data.message, '系统提示', {
											        confirmButtonText: '确定',
											    });
							            	}
								         }, response => {
										  	 this.loading1=false
							            	 this.bgShow=false
										  })
				      		}
				      	}
				      }
//		 		    this.loading=true
//			 		this.fullscreenLoading = true;
//		     		var fileObj = document.getElementById("excel-upload-input").files; // 获取文件对象
//		            var FileController = this.$checkStage('/charge/refund/upload');                    // 接收上传文件的后台地址 
//		            var form = new FormData();
//		            form.append("file", fileObj[0])
//	                var _this=this
//		            _this.$http.post(FileController, form).then(response=>{
//		            	console.log(response)
//		            	this.loading=false
////		            	this.fullscreenLoading = false;
//		            	if(response.data.isSucceed==200){
//						    _this.$message({
//					          message: '上传文件成功',
//					          type: 'success'
//					        });
//						    _this.$store.dispatch("WasteId",response.data.file_id)
//			                _this.$router.push({path:'/reconcil/repayList'})
//		            	}else{
//		            		_this.$alert(response.data.message, '系统提示', {
//						        confirmButtonText: '确定',
//						    });
//		            	}
//			         }, response => {
//					  	this.loading=false
//					  })
		        }
	        },
	     	downLoad(){
	     		var url=this.$checkStage('/charge/refund/download')
	     		window.open(url)
	     	},
	     	selected(data) {
//	     	  console.log(data)
		      this.tableData = data.results
		      this.tableHeader = data.header
//		      for(let i=0;i<this.timeList.length;i++){
//		      	for(let j=0;j<this.tableData.length;j++){
//		      		if(this.tableData[j]['所在门店']==this.timeList[i].shop&&this.tableData[j]['渠道']==this.timeList[i].way){
//		      			if(MyFormatTime(this.timeList[i].refundTime)>MyFormatTime(timeChange(this.tableData[j]['支付日期'])+" "+this.tableData[j]['支付时间'])){
//		      				this.$alert("您上传的支付时间早于所在门店的最新更新时间，请确认无误", '系统提示', {
//						        confirmButtonText: '确定',
//						    });
//		      			}
//		      		}
//		      	}
//		      }
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
	.content{
		padding: 30px;
	}
	
	.p3{
		font-size: 12px;
		color: red;
		margin-bottom: .3rem;
	}
	.p4 {
		text-align: center;
	}
	.p-title{
		font-size: 22px;
		border-bottom: 1px #E3E7F1 solid;
		padding-bottom: .3rem;
		margin-bottom: 30px;
	}
	.p-download{
		margin-bottom: 10px;
	}
	.p-download button{
		position: relative;
		width: 80px;
		height: 80px;
		text-align: center;
	}
	.p-download img{
		width: 40px;
		height: 40px;
		position: absolute;
		left: 20px;
		top: 10px;
	}
	.p-download .span1{
		width: 60px;
		height: 20px;
		position: absolute;
		left: 10px;
		bottom: 0;
		font-size: 12px;
	}
	.p-download .tip{
		display: inline-block;
		color: #666;
		margin-left: 10px;
		font-size: 14px;
	}
	.p-download1{
		margin-left: 16px;
		margin-bottom: 30px;
	}
	.bg{
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
	}
</style>