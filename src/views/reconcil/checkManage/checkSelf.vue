<!--信息说明页-->

<template>
	<div class="content">
         <p class="p1 component-item"><span>现金流水 &nbsp;&nbsp;模板下载</span><el-button v-waves type="primary"><svg-icon icon-class="downLoad" /> 模 板</el-button></p>
         <p class="p2">(请先下载Excel模板，按照模板格式填写数据，以确保数据格式正确)</p>
         <p class="p1"><span>上传流水文件</span><input type="file" id="file" name="myfile" multiple="multiple"></p>
         <p class="p2">(只支持.xls文件，切勿更改文件后缀名。） </p>
         <p class="p3">注：仅支持当天之前的流水对账，且不允许重复对账</p>
         <p class="p4"><el-button v-waves type="primary" @click="UpladFile()">确认上传</el-button></p>
	</div>
</template>

<script>
	import waves from '@/directive/waves/index.js' // 水波纹指令
	export default {
		 directives: {
		    waves
		 },
		 methods:{
		 	UpladFile(){
	     		var fileObj = document.getElementById("file").files; // 获取文件对象
	            var FileController = 'http://yadong.test.manmanh.com/charge/upload';                    // 接收上传文件的后台地址 
	            // FormData 对象
	            var form = new FormData();
	            for(i=0;i<fileObj.length;i++){      
                 formData.append("file["+i+"]", fileObj[i]); //++++++++++    
                 }     
	//          form.append("author", "hooyes");                        // 可以增加表单数据
//	            form.append("file", fileObj);                           // 文件对象
	            // XMLHttpRequest 对象
	            var xhr = new XMLHttpRequest();
	            xhr.open("post", FileController, true);
	            xhr.send(form);
	            xhr.onload = function () {
	                this.$alert("上传成功", '系统提示', {
		                  confirmButtonText: '确定',
				    });
	            };
	          
	     	},
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