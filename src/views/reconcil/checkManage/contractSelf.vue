<!--导入合同列表页-->

<template>
	<div class="content">
         <p class="p1 component-item"><span>贷款合同 &nbsp;&nbsp;模板下载</span><el-button v-waves type="primary" @click="downLoad"><svg-icon icon-class="downLoad" /> 模 板</el-button></p>
         <p class="p2">(请先下载Excel模板，按照模板格式填写数据，以确保数据格式正确)</p>
         <!--<p class="p1"><span>上传流水文件</span><input type="file" id="file" name="myfile" multiple="multiple" accept=".xls"></p>-->
         <p class="p1"><span class="span-p1">上传合同文件</span> <upload-excel-component @on-selected-file='selected'></upload-excel-component></p>
         <p class="p2">(只支持.xls文件，切勿更改文件后缀名。） </p>
         <p class="p4"><el-button v-waves type="primary" @click="UpladFile()" :loading="loading">确认上传</el-button></p>
         <!--<upload-excel-component @on-selected-file='selected'></upload-excel-component>-->
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
		 		this.loading=false
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
	            	console.log(response)
	            	if(response.data.isSucceed==200){
	            		_this.$alert("上传成功", '系统提示', {
			                  confirmButtonText: '确定',
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
	     	  console.log(data)
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
	.p1{
		font-size: .26rem;
		margin-bottom: .5rem;
	}
	.p1 button{
		padding: .1rem .2rem;
		margin-left: .5rem;
		text-align: center;
		font-size: .18rem;
	}
	.p1 input{
		margin-left: .5rem;
		outline: none;
		font-size: .2rem;
		display: inline-block;
		border-radius: .2rem;
	}
	.p1 .span-p1{
		float: left;
		margin-top: 5px;
	}
	.p2{
		color: #666;
		margin-bottom: .5rem;
	}
	.p3{
		color: red;
		margin-bottom: .3rem;
	}
	.p4 {
		text-align: center;
	}
</style>