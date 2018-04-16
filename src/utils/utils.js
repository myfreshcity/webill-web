import Cookies from 'js-cookie'
import { getToken } from '@/utils/auth' // 验权

export const resetHistory = function () {
  let history = window.sessionStorage
  history.clear()
  history.setItem('/', 0)
}

export const parseURL = function (url) {
  let parser = document.createElement('a'),
    searchObject = {},
    queries, split;
  // Let the browser do the work
  parser.href = url
  // Convert query string to object
  queries = parser.search.replace(/^\?/, '').split('&')
  for (let i = 0; i < queries.length; i++) {
    split = queries[i].split('=')
    searchObject[split[0]] = split[1]
  }
  return {
    protocol: parser.protocol,
    host: parser.host,
    hostname: parser.hostname,
    port: parser.port,
    pathname: parser.pathname,
    search: parser.search,
    searchObject: searchObject,
    hash: parser.hash
  }
}

/* 获取URL参数 */
export const getUrlParams = function (name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) {
    return unescape(r[2]);
  }
  return null;
}


//将日期时间戳转化为日期格式  不带时分秒value为13位unix时间戳 
export const timeStampToDate = function(value) {
				 var date = new Date(value);
				 var Y = date.getFullYear();
				 var m = date.getMonth() + 1;
				 var d = date.getDate();
				 var H = date.getHours();
				 var i = date.getMinutes();
				 var s = date.getSeconds();
				 if (m < 10) {
				  m = '0' + m;
				 }
				 if (d < 10) {
				  d = '0' + d;
				 }
				 if (H < 10) {
				  H = '0' + H;
				 }
				 if (i < 10) {
				  i = '0' + i;
				 }
				 if (s < 10) {
				  s = '0' + s;
				 }
//				 <!-- 获取时间格式 2017-01-03 10:13:48 -->
				 // var t = Y+'-'+m+'-'+d+' '+H+':'+i+':'+s;
//				 <!-- 获取时间格式 2017-01-03 -->
				 var t = Y + '-' + m + '-' + d;
				 return t;
    }

export const timeStampToDate2 = function(value) {
				 var date = new Date(value);
				 var Y = date.getFullYear();
				 var m = date.getMonth() + 1;
				 var d = date.getDate();
				 var H = date.getHours();
				 var i = date.getMinutes();
				 var s = date.getSeconds();
				 if (m < 10) {
				  m = '0' + m;
				 }
				 if (d < 10) {
				  d = '0' + d;
				 }
				 if (H < 10) {
				  H = '0' + H;
				 }
				 if (i < 10) {
				  i = '0' + i;
				 }
				 if (s < 10) {
				  s = '0' + s;
				 }
//				 <!-- 获取时间格式 2017-01-03 10:13:48 -->
				 // var t = Y+'-'+m+'-'+d+' '+H+':'+i+':'+s;
//				 <!-- 获取时间格式 2017-01-03 -->
				 var t = Y + '.' + m + '.' + d;
				 return t;
    }


//将日期时间戳转化为日期格式  带时分秒value为13位unix时间戳 
export const formatDate = function(value) {
				 var date = new Date(value);
				 var Y = date.getFullYear();
				 var m = date.getMonth() + 1;
				 var d = date.getDate();
				 var H = date.getHours();
				 var i = date.getMinutes();
				 var s = date.getSeconds();
				 if (m < 10) {
				  m = '0' + m;
				 }
				 if (d < 10) {
				  d = '0' + d;
				 }
				 if (H < 10) {
				  H = '0' + H;
				 }
				 if (i < 10) {
				  i = '0' + i;
				 }
				 if (s < 10) {
				  s = '0' + s;
				 }
//				 <!-- 获取时间格式 2017-01-03 10:13:48 -->
				  var t = Y+'-'+m+'-'+d+' '+H+':'+i+':'+s;
//				 <!-- 获取时间格式 2017-01-03 -->
//				 var t = Y + '-' + m + '-' + d;
				 return t;
    }
//将日期格式转化为时间戳
export const dateToTimeStamp = function(value) {
	var date =  new Date(value)
	var s=date.getTime()
	return s;
}
//获取距离今天多少天的日期
export const GetDateStr = function(AddDayCount) {  //sDate是"2002-12-18"格式
		var dd = new Date(); 
		dd.setDate(dd.getDate()+AddDayCount);//获取AddDayCount天后的日期 
		var y = dd.getFullYear(); 
		var m = dd.getMonth()+1;//获取当前月份的日期 
		var d = dd.getDate(); 
		 if (m < 10) {
				  m = '0' + m;
				 }
				 if (d < 10) {
				  d = '0' + d;
				 } 
		return y+"-"+m+"-"+d; 
} 
//距离今天还有多少天
export const DateDiff = function(sDate) {  //sDate是"2002-12-18"格式
	var nowDate=timeStampToDate(new Date().getTime()).split("-")
	var aDate, oDate1, oDate2, iDays;
	aDate = sDate.split("-");
	oDate1 = new Date(aDate[0], aDate[1] - 1, aDate[2]);
	oDate2 = new Date(nowDate[0], nowDate[1] - 1, nowDate[2]);
	iDays = parseInt(Math.abs(oDate1 - oDate2) / 1000 / 60 / 60 / 24);
	if ((oDate1 - oDate2) < 0) {
	    return -iDays;
	}
	return iDays;
}

//时间先后对比
export const MyFormatTime=function(str){  
     
    var year=str.split('-')[0];  
    var month=str.split('-')[1];  
    var date = str.split('-')[2].split(' ')[0];  
    var h = str.split('-')[2].split(' ')[1].split(':')[0];  
    var m = str.split('-')[2].split(' ')[1].split(':')[1];  
    var s = str.split('-')[2].split(' ')[1].split(':')[2];      
    return new Date(year,month,date,h,m,s);  
}  
//时间格式转化 xx/xx/xx/ 转化为xxxx-xx-xx
export const timeChange=function(str){
	var list=str.split('/')
		      var time=[]
		      if(list[2].length==2){
		      	time.push('20'+list[2])
		      }else{
		      	time.push(list[2])
		      }
		      if(list[0]<10){
		      	time.push('0'+list[0])
		      }else{
		      	time.push(list[0])
		      }
		       if(list[1]<10){
		      	time.push('0'+list[1])
		      }else{
		      	time.push(list[1])
		      }
		      return time.join('-')
}

//隐藏密码
export const  encryptLicence= function(data) {
	var licenceArr=[]
	for(var i=0;i<data.length;i++){
			licenceArr.push("*")
	}
	return licenceArr.join("")
}

//隐藏手机中间4位
export const  encryptMobile= function(data) {
	var licenceArr=[]
	for(var i=0;i<data.length;i++){
			if(i==3||i==4||i==5||i==6){
				licenceArr.push("*")
			}else{
				licenceArr.push(data[i])
			}
	}
	return licenceArr.join("")
}
//身份证号，银行卡号隐藏
export const  encryptIdNo= function(data) {
	var licenceArr=[]
	for(var i=0;i<data.length;i++){
			if(i==4||i==5||i==6||i==7||i==8||i==9||i==10||i==11||i==12||i==13){
				licenceArr.push("*")
			}else{
				licenceArr.push(data[i])
			}
	}
	return licenceArr.join("")
}


//获取n年 n天 n月前或后的日期
export function initDefaultDate(n,timeUnit) {  
    var curr_date = new Date();  
    if (timeUnit === 'd') {  
    curr_date.setDate(curr_date.getDate() + n);  
    } else if (timeUnit === 'M') {  
        curr_date.setMonth(curr_date.getMonth() + n);  
    } else if (timeUnit === 'y') {  
        curr_date.setFullYear(curr_date.getFullYear() + n);  
    }  
    var strYear = curr_date.getFullYear();  
    var strMonth = curr_date.getMonth()+1;  
    var strDay = curr_date.getDate();  
    var strHours = curr_date.getHours();  
    var strMinutes = curr_date.getMinutes();  
  
    var datastr = strYear + '-' + formatNumber(strMonth) + '-'  
        + formatNumber(strDay) +' '+ formatNumber(strHours) + ':' + formatNumber(strMinutes);  
    return datastr;  
}
//日期自动补零
export function formatNumber(value){    
    return (value < 10 ? '0' : '') + value;    
}  
export function getLoginUser(){    
    if (getToken()) {
    	         const url=('http://longfei.test.manmanh.com/webill-app/api/user/login')
					     this.$http.post(url,{"mobileNo":Cookies.get(username),"password":Cookies.get(password),'checkFlag':"pwd"})
					      .then((response) => { 
					          if(response.data.status==200){
					             this.$store.dispatch('UserInfo', response.data.obj)
					          }else{
					          	this.$alert("登录信息有误，请退出后重新登录", '系统提示', {
							          confirmButtonText: '确定',
							        });
					          }
					         
					      }).catch(function(response){
				             this.$alert("登录信息有误，请退出后重新登录", '系统提示', {
							          confirmButtonText: '确定',
							        });
				        })
    }
} 
 export function exportCsv(obj){
	         var title = obj.title;
	         var titleForKey = obj.titleForKey;
	         var data = obj.data;
	         var str = [];
	         str.push(obj.title.join(",")+"\n");
	         for(var i=0;i<data.length;i++){
	             var temp = [];
	             for(var j=0;j<titleForKey.length;j++){
	                 temp.push(data[i][titleForKey[j]]);
		          }
		          str.push(temp.join(",")+"\n");
			     }
			      var uri = 'data:text/csv;charset=utf-8,' + encodeURIComponent(str.join(""));  
			      var downloadLink = document.createElement("a");
			      downloadLink.href = uri;
			      downloadLink.download = "联系人列表.csv"; 
			      document.body.appendChild(downloadLink);
			      downloadLink.click();
			      document.body.removeChild(downloadLink); 
	 }
//从 file 域获取 本地图片 url 

export function getFileUrl(sourceId) { 
	var url; 
	if (navigator.userAgent.indexOf("MSIE")>=1) { // IE 
	    url = document.getElementById(sourceId).value; 
	} else if(navigator.userAgent.indexOf("Firefox")>0) { // Firefox 
	    url = window.URL.createObjectURL(document.getElementById(sourceId).files.item(0)); 
	} else if(navigator.userAgent.indexOf("Chrome")>0) { // Chrome 
	    url = window.URL.createObjectURL(document.getElementById(sourceId).files.item(0)); 
	} 
	return url; 
} 