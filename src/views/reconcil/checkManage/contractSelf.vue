<!--导入合同列表页-->

<template>
	<div class="content">
         <!--<p class="p1 component-item"><span>贷款合同 &nbsp;&nbsp;模板下载</span><el-button v-waves type="primary" @click="downLoad"><svg-icon icon-class="downLoad" /> 模 板</el-button></p>
         <p class="p2">(请先下载Excel模板，按照模板格式填写数据，以确保数据格式正确)</p>
         <p class="p1"><span class="span-p1">上传合同文件</span> <upload-excel-component @on-selected-file='selected'></upload-excel-component></p>
         <p class="p2">(只支持.xls文件，切勿更改文件后缀名。） </p>-->
         <p class="p-title">贷款合同-模板下载</p>
         <p class="p-download p-download1"><el-button   @click="downLoad"><img src="../../../../static/images/reconcil/downLoad.png" alt="" /><span class="span1">点击下载 </span></el-button><span class="tip">(请先下载Excel模板，按照模板格式填写数据，以确保数据格式正确)</span></p>
         <p class="p-title">上传合同文件</p>
         <p class="p-download"><upload-excel-component @on-selected-file='selected'></upload-excel-component></p>
         <p class="p4"><el-button v-waves type="primary" @click="UpladFile()" >确认上传</el-button></p>
         <el-table :data="tableData" border highlight-current-row style="width: 100%;margin-top:20px;">
	      <el-table-column v-for='item of tableHeader' :prop="item" :label="item" :key='item'>
	      </el-table-column>
	    </el-table>
	</div>
</template>

<script>
	import $ from 'jquery'
	import { mapGetters } from 'vuex'
	import waves from '@/directive/waves/index.js' // 水波纹指令
	import UploadExcelComponent from '@/components/UploadExcel/index.vue'
	export default {
		 directives: {
		    waves
		 },
		 components: { UploadExcelComponent },
		 data(){
		 	return{
		 		loading:false,
		 		tableData: [],
                tableHeader: []
		 	}
		 },
		 mounted:function(){
		 	if(!this.userInfo.mobileNo){
		 		this.$router.push({path:'/recomcil/checkList'})
		 	}else{
		 		var url= this.$checkStage('/charge/refund/newest')
		 		this.$http.get(url).then(response=>{  
	            	console.log(response)
	            })
		 	}
		 },
		 methods:{
		 	UpladFile(){
		 		if(document.getElementById("excel-upload-input").files.length==0){
		 			this.$alert("未选择文件", '系统提示', {
			                  confirmButtonText: '确定',
					});
		 		}else{
		 		 const loading = this.$loading({
		          lock: true,
		          text: '上传中',
		          spinner: 'el-icon-loading',
		          background: 'rgba(0, 0, 0, 0.7)'
		        });
	     		var fileObj = document.getElementById("excel-upload-input").files; // 获取文件对象
	            var FileController = this.$checkStage('/charge/plan/upload');                    // 接收上传文件的后台地址 
	            // FormData 对象
	            var form = new FormData();
//	            for(var i=0;i<fileObj.length;i++){      
//                 form.append("file["+i+"]", fileObj[i]); //++++++++++    
//               }
	            form.append("file", fileObj[0])
                var _this=this
	            _this.$http.post(FileController, form).then(response=>{  
//	            	console.log(response)
	            	loading.close();
	            	if(response.data.isSucceed==200){
//	            		_this.$alert("上传成功", '系统提示', {
//			                  confirmButtonText: '确定',
//					    });
					     _this.$message({
				          message: '上传文件成功',
				          type: 'success'
				        });
					    _this.loading=false
		                _this.$router.push({path:'/reconcil/repaymentDetail'})
	            	}else{
	            		_this.$alert(response.data.message, '系统提示', {
					        confirmButtonText: '确定',
					    });
					    _this.loading=false
	            	}
		         }) 
		        }
	        },
	     	downLoad(){
	     		window.open(this.$checkStage('/charge/plan/download'))
	     	},
	     	selected(data) {
		      this.tableData = data.results
		      this.tableHeader = data.header
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
	.p4 {
		text-align: center;
	}
	.p-title{
		font-size: 24px;
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
</style>