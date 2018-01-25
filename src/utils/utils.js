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
	    return "车险已";
	}
	return iDays;
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
//获取
export function getCookie(name) {
  var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
  if (arr = document.cookie.match(reg))
    return (arr[2]);
  else
    return null;
}

//设置cookie,增加到vue实例方便全局调用
export function setCookie (c_name, value, expiredays) {
  var exdate = new Date();
  exdate.setDate(exdate.getDate() + expiredays);
  document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());
};

//删除cookie
export function delCookie (name) {
  var exp = new Date();
  exp.setTime(exp.getTime() - 1);
  var cval = getCookie(name);
  if (cval != null)
   document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
};


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