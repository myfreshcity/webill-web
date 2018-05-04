<!--模板页面-->

<template>
	<div class="content">
		<!--<p class="msgType">
			<el-button  @click="changeType()">基础版</el-button>
			<el-button type="primary">标准版</el-button>
		</p>-->
		<p class="head">{{msgTitle}}<el-button  @click="changeType()">标准版</el-button><el-button type="primary">基础版</el-button></p>
		<sticky className="sub-navbar">
			<ul class="tabs-ul">
				<li :class="{'li-active':liActive==1}" @click="changeLi(1)">用户基本信息</li>
				<li :class="{'li-active':liActive==2}" @click="changeLi(2)">金融类通话信息</li>
				<li :class="{'li-active':liActive==3}" @click="changeLi(3)">联系人区域汇总</li>
				<li :class="{'li-active':liActive==4}" @click="changeLi(4)">长时间联系人</li>
				<li :class="{'li-active':liActive==5}" @click="changeLi(5)">高频联系人</li>
				<li :class="{'li-active':liActive==6}" @click="changeLi(6)">通话详单</li>
				<li :class="{'li-active':liActive==7}" @click="changeLi(7)">多平台借贷分析</li>
				<li :class="{'li-active':liActive==8}" @click="changeLi(8)">催收风险分析</li>
				<li :class="{'li-active':liActive==9}" @click="changeLi(9)">出行数据分析</li>
			</ul>
		</sticky>
		<div class="nav nav1" id="section-1">
			<p class="navP-title">用户基本信息</p>
			<p class="navP-head">基本信息</p>
			<ul class="nav1-ul">
				<li><span class="tabName"><b>登记姓名</b></span><span class="tabValue">张三</span><span class="tabName"><b>性别</b></span><span class="tabValue">男</span></li>
				<li><span class="tabName"><b>年龄</b></span><span class="tabValue">30</span><span class="tabName"><b>户籍地址</b></span><span class="tabValue">山东省济南市平阴县</span></li>
				<li>
					<span class="tabName"><b class="tabName-b">居住地址</b></span><span class="tabValue tabValue2">山东省济南市平阴县<br /><b class="detail-b"><svg-icon icon-class="dian" />居住地址可通过地图定位技术精确定位到，坐标(108.2132132E，36.56246465N)</b></span>
				</li>
				<li><span class="tabName"><b class="tabName-b">工作地址</b></span><span class="tabValue tabValue2">山东省济南市平阴县<br /><b class="detail-b"><svg-icon icon-class="dian" />居住地址可通过地图定位技术精确定位到，坐标(108.2132132E，36.56246465N)</b></span></li>
				<li><span class="tabName"><b>身份证</b></span><span class="tabValue tabValue2">3701xxxxxxxxxx3011<b class="label" >在法院黑名单</b></span></li>
				<li class="mobile-li"><span class="tabName tabMobile"><b>手机号</b></span><span class="tabValue tabValue2 tabValue3">
						<p class="mobile-p1">山东移动<span>未实名认证</span></p>
						<p class="mobile-p2">
							<span>135xxxx7865（已使用26个月）</span>
							<span class="mobile-span1"><svg-icon icon-class="dian" />用户姓名与运营商提供的姓名[xx强]不匹配</span>
							<span class="mobile-spanlast mobile-span1"><svg-icon icon-class="dian" />运营商未提供身份证号码</span>
						</p>
						<p class="mobile-p3">
							<span>6个月内有10天无通话记录</span>
							<span class="mobile-spanlast mobile-span2"><svg-icon icon-class="dian" />根据运营商通话详单数据，连续三天以上无通话记录1次: 2015-04-03 13:05:26 - 2015-04-08 00:07:36, 10天</span>
						</p>
						<p class="mobile-p4">互通过电话的号码有21个，比例为69%</p>
					</span>
				</li>
			</ul>
			<p class="navP-head">联系人</p>
			<ul class="contact-ul">
				<li class="contact-li"><span>关系</span><span>姓名</span><span class="contact-span">手机号码</span><span class="contact-span">是否为临时小号</span><span class="contact-span">通话时长排名</span><span class="contact-span">联系次数(6个月)</span><span>通话时长</span></li>
			    <li ><span>父母</span><span>张二</span><span class="contact-span">159xxxx5343</span><span class="contact-span xiaohaoSpan"><b>临时小号</b></span><span class="contact-span">1</span><span class="contact-span">379</span><span>459.20</span></li>
			    <li ><span>父母</span><span>王五</span><span class="contact-span">157xxxx5967</span><span class="contact-span">非临时小号</span><span class="contact-span">7</span><span class="contact-span">345</span><span>49.10</span></li>
			    <li ><span>兄妹</span><span>张玉梅</span><span class="contact-span">158xxxx1233</span><span class="contact-span">非临时小号</span><span class="contact-span">3</span><span class="contact-span">37</span><span>149.50</span></li>
			    <li ><span>兄妹</span><span>张玉菊</span><span class="contact-span">188xxxx8963</span><span class="contact-span">非临时小号</span><span class="contact-span">6</span><span class="contact-span">129</span><span>259.00</span></li>
			    <li ><span>同事</span><span>王亚东</span><span class="contact-span">133xxxx7658</span><span class="contact-span">非临时小号</span><span class="contact-span">8</span><span class="contact-span">239</span><span>49.80</span></li>
			    <li ><span>同事</span><span>张龙飞</span><span class="contact-span">176xxxx2457</span><span class="contact-span">非临时小号</span><span class="contact-span">3</span><span class="contact-span">69</span><span>45.20</span></li>
			</ul>
			<p class="navP-head">黑名单</p>
			<ul class="contact-ul blacklist-ul">
				<li class="contact-li"><span>检查项</span><span>结果</span><span class="blacklist-span">依据</span></li>
			    <li ><span>黑中介分数</span><span>14</span><span class="blacklist-span">分数范围0-100，参考分为10，分数越低关系越紧密</span></li>
			    <li ><span>直接联系人中黑名单人数</span><span>1</span><span class="blacklist-span">分数范围0-100，参考分为10，分数越低关系越紧密</span></li>
			    <li ><span>间接联系人中黑名单人数</span><span>298</span><span class="blacklist-span">间接联系人：和被查询号码的直接联系人有通话记录</span></li>
			    <li ><span>直接联系人数量</span><span>329</span><span class="blacklist-span">直接联系人：和被查询号码有通话记录</span></li>
			    <li ><span>引起黑名单的直接联系人数量</span><span>104</span><span class="blacklist-span">直接联系人有和黑名单用户的通话记录的号码数量</span></li>
			    <li ><span>直接联系人中引起间接黑名单占比</span><span>32%</span><span class="blacklist-span">直接联系人有和黑名单用户的通话记录的号码数量在直接联系人数量中的百分比</span></li>
			</ul>
		</div>
		<div class="nav nav2" id="section-2">
			<p class="navP-title">金融类通话信息</p>
			<ul class="contact-ul blacklist-ul">
				<li class="contact-li"><span>检查项</span><span>结果</span><span class="blacklist-span">依据</span></li>
			    <li ><span>澳门电话</span><span>无通话记录</span><span class="blacklist-span">分数范围0-100，参考分为10，分数越低关系越紧密</span></li>
			    <li ><span>110</span><span>无通话记录</span><span class="blacklist-span">分数范围0-100，参考分为10，分数越低关系越紧密</span></li>
			    <li ><span>120</span><span>无通话记录</span><span class="blacklist-span">间接联系人：和被查询号码的直接联系人有通话记录</span></li>
			    <li ><span>律师号码</span><span>无通话记录</span><span class="blacklist-span">直接联系人：和被查询号码有通话记录</span></li>
			    <li ><span>法院号码</span><span>无通话记录</span><span class="blacklist-span">直接联系人有和黑名单用户的通话记录的号码数量</span></li>
			    <li ><span>贷款类号码</span><span>无通话记录</span><span class="blacklist-span">直接联系人有和黑名单用户的通话记录的号码数量在直接联系人数量中的百分比</span></li>
			</ul>
		</div>
		<div class="nav nav3" id="section-3">
			<p class="navP-title">联系人区域汇总<el-button type="primary" @click="derive()">导出所有</el-button></p>
			<div id="myChart" ></div>
		</div>
		<div class="nav nav4" id="section-4">
			<p class="navP-title">长时间联系人</p>
			<div id="longTimeChart" ></div>
		</div>
		<div class="nav nav5" id="section-5">
			<p class="navP-title">高频联系人</p>
			<div id="highTimeChart" ></div>
		</div>
		<div class="nav nav5" id="section-6">
			<p class="navP-title">通话详单</p>
			<img src="../../../static/images/template/temImage.jpg" />
		</div>
		<div class="nav nav5" id="section-7">
			<p class="navP-title">多平台借贷分析</p>
			<ul class="contact-ul blacklist-ul">
				<li class="contact-li"><span>检查项</span><span>检查结果</span><span class="blacklist-span tongdun-span">依据</span></li>
				<li >
			    	<span class="span-mid"><b>客户行为检测</b></span>
			    	<span class="span-mid"><b>身份证在多个网贷平台进行借款申请</b></span>
			    	<span class="blacklist-span tongdun-span">
			    		<b>风险等级：高</b>
			    		<b>总个数：30</b>
			    		<b><svg-icon icon-class="dian" />互联网金融门户：1</b>
			    	</span>
			    </li>
			    <li >
			    	<span class="span-mid"><b>客户行为检测</b></span>
			    	<span class="span-mid"><b>身份证在多个网贷平台进行借款申请</b></span>
			    	<span class="blacklist-span tongdun-span">
			    		<b>风险等级：高</b>
			    		<b>总个数：30</b>
			    		<b><svg-icon icon-class="dian" />互联网金融门户：1</b>
			    	</span>
			    </li>
			</ul>
		</div>
		<div class="nav nav6" id="section-8">
			<p class="navP-title">催收风险分析</p>
			<ul class="contact-ul blacklist-ul">
				<li class="contact-li"><span>检查项</span><span>催收信息</span><span>疑似催收信息</span></li>
			    <li ><span>号码个数</span><span>5个</span><span>8个</span></li>
			    <li ><span>被叫次数</span><span>5次</span><span>6次</span></li>
			    <li ><span>被叫时长</span><span>120秒</span><span>10秒</span></li>    
			    <li ><span>被叫时长15s以下的次数</span><span>5次</span><span>7次</span></li>
			    <li ><span>被同一号码呼叫的最多次数</span><span>20次</span><span>10次</span></li>
			    <li ><span>被同一号码呼叫2次以上的号码个数</span><span>8个</span><span>10个</span></li>
			    <li ><span>主叫次数</span><span>10次</span><span>8次</span></li>
			    <li ><span>主叫时长</span><span>20秒</span><span>12秒</span></li>
			    <li ><span>近7天被催收呼叫次数</span><span>15次</span><span>20次</span></li>
			    <li ><span>近7-30天被催收呼叫次数</span><span>30次</span><span>10次</span></li>
			    <li ><span>近30-60天被催收呼叫次数</span><span>10次</span><span>10次</span></li>
			    <li ><span>近60-90天被催收呼叫次数</span><span>10次</span><span>20次</span></li>
			    <li ><span>近90-120天被催收呼叫次数</span><span>15次</span><span>20次</span></li>
			</ul>
		</div>
		<div class="nav nav7" id="section-9">
			<p class="navP-title">出行数据分析</p>
			<ul class="contact-ul trip-ul">
				<li class="contact-li"><span>时间段</span><span>出发地</span><span>目的地</span><span class="trip-span">出行开始时间</span><span class="trip-span">出行结束时间</span></li>
			    <li ><span>双休日</span><span>山东</span><span>北京</span><span class="trip-span">2010-07-02 15：23：20</span><span class="trip-span">2010-07-02 15：23：20</span></li>
			    <li ><span>工作日</span><span>北京</span><span>山东</span><span class="trip-span">2010-07-02 15：23：20</span><span class="trip-span">2010-07-02 15：23：20</span></li>
			    <li ><span>双休日</span><span>山东</span><span>湖南</span><span class="trip-span">2010-07-02 15：23：20</span><span class="trip-span">2010-07-02 15：23：20</span></li>
			</ul>
		</div>
		<div class="top-div" @click="goTop">
			<p><svg-icon icon-class="top" /></p>
			<p>回顶部</p>
		</div>
	</div>
</template>

<script>
	import Sticky from '@/components/Sticky'
	import $ from 'jquery'
	import Highcharts from 'highCharts'
	 export default {
	 	components: { Sticky },
	    data() {
	      return {
	      	liActive:1,
	      	msgTitle:'客户信息标准版',
	        activeName: 'first',
	        versions:1,            //1=>基础版   2=>标准版
	      };
	    },
	    mounted:function(){
	    	this.initChart1()
	    	this.initChart2()
	    	this.initChart3()
	    	 var _this=this
             $(window).scroll(function(){
 			     //为页面添加页面滚动监听事件
                  var wst =  $(window).scrollTop() //滚动条距离顶端值
				 for (var i=1; i<9; i++){             //加循环
				  if(($("#section-"+i).offset().top-100)<=wst){ //判断滚动条位置
					  _this.liActive=i
					  _this.$forceUpdate()
					 }
				 }
	        })
	    },
	    methods: {
	     derive(){
	      	
	      },
    	  goTop(){
    		window.scrollTo(0, 0); 
    		this.liActive=1
    	  },
	      changeLi(index){
	      	this.liActive=index
	      	window.scrollTo(0, $("#section-"+index).offset().top)
	      },
	      handleClick(tab, event) {
	      },
	      changeType(){
	      	this.$router.push({path:'/template/temPageBase'})
	      },
	      initChart1(){
		    Highcharts.chart(document.getElementById('myChart'),{
		    	colors : ['#a4d266', '#5a9dee', '#333'],
		        chart: {
		            zoomType: 'xy'
		        },
		        title: {
		            text: ''
		        },
		        subtitle: {
		            text: ''
		        },
		        credits: {  
		            enabled: false     //不显示LOGO 
		        }, 
		        xAxis: [{
		            categories:  ['澳门','美国','山东','全国','广东','湖南','海南','江苏','湖北','浙江','四川'],
		            crosshair:false
		        }],
		        yAxis: [{ // Primary yAxis
		            labels: {
		                format: '',
		                style: {
		                    color: Highcharts.getOptions().colors[0]
		                }
		            },
		            title: {
		                text: '次数',
		                style: {
		                    color: Highcharts.getOptions().colors[0]
		                }
		            }
		        },{ // Primary yAxis
		            labels: {
		                format: '',
		                style: {
		                    color: Highcharts.getOptions().colors[1]
		                }
		            },
		            title: {
		                text: '个数',
		                style: {
		                    color: Highcharts.getOptions().colors[1]
		                }
		            },
		             opposite: true
		        }],
		        tooltip: {
		            shared: true
		        },
		        legend: {
		            align: 'center',
		            x: 0,
		            verticalAlign: 'top',
		            y: -10,
		            floating: true,
		            backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
		        },
		        series: [{
		            name: '呼入次数',
		            type: 'column',
		            data:[50,20,130,210,120,35,50,25,40,30,5],
		            tooltip: {
		                valueSuffix: '次'
		            }
		        },{
		            name: '呼出次数',
		            type: 'column',
		            data:[30,10,210,50,70,20,30,10,30,25,8],
		            tooltip: {
		                valueSuffix: '次'
		            }
		        }, {
		            name: '号码个数',
		            type: 'spline',
		            yAxis: 1,
		            data:[80,80,100,130,160,180,210,220,190,160,130],
		            tooltip: {
		                valueSuffix: '个'
		            }
		        }]
		    });
	      },
	      initChart2(){
	      	Highcharts.chart(document.getElementById('longTimeChart'),{
		    	colors : ['#a4d266', '#5a9dee', '#333'],
		    	chart: {
		            type: 'bar'
		        },
		        title: {
		            text: ''
		        },
		        subtitle: {
		            text: ''
		        },
		        xAxis: {
		            categories: ['<span style="color:red;border:1px #ccc solid">互联网金融</span>15093082635', '18574172635', '18574172635','18574172635','18574172635','18574172635','18574172635','18574172635','18574172635','18574172635'],
		            title: {
		                text: null
		            }
		        },
		        yAxis: [{
		            min: 0,
		            title: {
		                text: '通话次数 (次)',
		                align: 'high'
		            },
		            labels: {
		                overflow: 'justify',
		                enabled: true
		            }
		        },{
		            min: 0,
		            title: {
		                text: '通话时长 (min)',
		                align: 'high'
		            },
		            labels: {
		                overflow: 'justify',
		                enabled: true
		            },
		            opposite: true
		        }],
		        
		        plotOptions: {
		            bar: {
		                dataLabels: {
		                    enabled: true,
		                    allowOverlap: true
		                }
		            }
		        },
		        legend: {
		            layout: 'vertical',
		            align: 'right',
		            verticalAlign: 'top',
		            x: -40,
		            y: 100,
		            floating: true,
		            borderWidth: 1,
		            backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
		            shadow: true
		        },
		        credits: {
		            enabled: false
		        },
		        series: [{
		            yAxis: 1,
		            name: '通话时长',
		            data: [2000, 1800, 1500, 1100, 1000,800,700,500,450,350],
		            tooltip: {
		                        valueSuffix: '分钟'
		                     }
		        }, {
		            name: '通话次数',
		            data: [133, 156, 94, 40, 60,180,90,200,20,110],
		             tooltip: {
		                        valueSuffix: '次数'
		                     }
		        }]
		    })
	      },
	      initChart3(){
	      	 Highcharts.chart(document.getElementById('highTimeChart'),{
			    	colors : ['#a4d266', '#5a9dee', '#333'],
			    	chart: {
			            type: 'bar'
			        },
			        title: {
			            text: ''
			        },
			        subtitle: {
			            text: ''
			        },
			        xAxis: {
			            categories: ['<span style="color:red;border:1px #ccc solid">互联网金融</span>15093082635', '18574172635', '18574172635','18574172635','18574172635','18574172635','18574172635','18574172635','18574172635','18574172635'],
			            title: {
			                text: null
			            }
			        },
			        yAxis: [{
			            min: 0,
			            title: {
			                text: '通话次数 (次)',
			                align: 'high'
			            },
			            labels: {
			                overflow: 'justify',
			                enabled: true
			            }
			        },{
			            min: 0,
			            title: {
			                text: '通话时长 (min)',
			                align: 'high'
			            },
			            labels: {
			                overflow: 'justify',
			                enabled: true
			            },
			            opposite: true
			        }],
			        
			        plotOptions: {
			            bar: {
			                dataLabels: {
			                    enabled: true,
			                    allowOverlap: true
			                }
			            }
			        },
			        legend: {
			            layout: 'vertical',
			            align: 'right',
			            verticalAlign: 'top',
			            x: -40,
			            y: 100,
			            floating: true,
			            borderWidth: 1,
			            backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
			            shadow: true
			        },
			        credits: {
			            enabled: false
			        },
			        series: [{
			            yAxis: 1,
			            name: '通话时长',
			            data: [2000, 1800, 1500, 1100, 1000,800,700,500,450,350],
			            tooltip: {
			                        valueSuffix: '分钟'
			                     }
			        }, {
			            name: '通话次数',
			            data: [133, 156, 94, 40, 60,180,90,200,20,110],
			             tooltip: {
			                        valueSuffix: '次数'
			                     }
			        }]
			    })
	      }
	    }
	  };
</script>

<style scoped>
	.content{
		padding: 0 70px;
		padding-bottom: 700px;
		/*padding-top: 30px;*/
	}
	.content .head{
		height: 80px;
		line-height: 80px;
		font-weight: bold;
		font-size: 24px;
		/*border-bottom: 1px #D8D8D8 solid;*/
		margin-bottom: .1rem;
	}
	.content .head button{
		float: right;
		margin-left: 20px;
		margin-top: 20px;
	}
	.el-tabs{
		/*padding-left: 50px;*/
	}
	.el-tabs__nav-wrap::after{
		display: none;
		height: 0;
	}
	.tabs-ul{
		margin-bottom: .5rem;
		display: flex;
		background: #fff;
		padding-top: 10px;
		border-bottom: 1px #E3E7F1 solid;
	}
	.tabs-ul li{
		margin: .1rem .1rem 0 .1rem;
		padding: 0 5px;
		padding-bottom: 20px;
	}
	.tabs-ul .li-active{
		color: #409EFF;
		border-bottom: 3px #409EFF solid;
	}
	.nav{
		padding-top: 70px;
	}
	.nav .navP-title{
		text-align: center;
		font-size: 20px;
		color: #333;
		font-weight: bold;
		margin-bottom: 30px;
	}
	.nav .navP-head{
		font-size: 18px;
		color: #333;
		padding-left: 10px;
		border-left: 4px #409EFF solid;
		margin-bottom: 20px;
		margin-top: 20px;
	}
	.nav .nav1-ul{
		border-radius:5px ;
		font-size: 14px;
		border-top: 1px #E3E7F1 solid;
		border-left: 1px #E3E7F1 solid;
	}
	.nav .nav1-ul li{
		border-bottom: 1px #E3E7F1 solid;
	}
	.nav .tabName{
		color: #666;
		padding: 10px 0;
		display: inline-block;
		width: 10%;
	}
	.nav .tabName b{
		padding-left: .3rem;
	}
	.nav .tabName .tabName-b{
		float: left;
	}
	.nav .tabMobile{
		float: left;
		margin-top: 100px;
	}
	.nav .tabValue{
		padding: 15px 0;
		padding-left: 20px;
		display: inline-block;
		width: 40%;
		border-left: 1px #E3E7F1 solid;
		border-right: 1px #E3E7F1 solid;
	}
	.nav .tabValue2{
		width: 90%;
	}
	.nav .tabValue2 b{
		color: #999;
	}
	.nav .tabValue2 .detail-b{
		display: inline-block;
		margin-top: 10px;
		font-size: 12px;
	}
	.nav .tabValue3{
		padding-left: 0;
		width: 90%;
	}
	.nav .nav1-ul  .mobile-li p{
		padding: 15px 0;
		padding-left: 20px;
		display: flex;
		flex-direction:column;
        justify-content: center;
        border-bottom: 1px #E3E7F1 solid;
	}
	.nav .nav1-ul  .mobile-li .mobile-p1{
		display: inline-block;
		width: 100%;
		padding-top: 0;
	}
	.nav .nav1-ul  .mobile-li .mobile-p1 span{
		margin-left: 30px;
		padding: 5px;
		border-radius: 3px;
		color: #fff;
		background: #ED5543;
	}
    .nav .nav1-ul .label{
        margin-left: 30px;
		padding: 5px;
		border-radius: 3px;
		color: #fff;
		background: #ED5543;
    }
	.nav .nav1-ul  .mobile-li .mobile-p4{
		border-bottom: none;
		padding-bottom: 0;
	}
	.mobile-li .tabValue2 span{
		margin-bottom: 10px;
	}
	.mobile-li .tabValue2 .mobile-spanlast{
		margin-bottom: 0;
	}
	.mobile-li .svg-icon{
		margin-right: 10px;
	}
	.mobile-li .tabValue2 .mobile-span1{
	     color: red;
	     font-size: 12px;
	}
	.mobile-li .tabValue2 .mobile-span2{
	     color: #999;
	     font-size: 12px;
	}
    .contact-ul{
    	border: 1px #E3E7F1 solid;
    	border-right: none;
    	border-bottom: none;
    }
    .contact-ul li{
    	display: flex;
    }
    .contact-ul .contact-li{
    	background: #F1F2F8;
    }
    .contact-ul .contact-li span{
    	font-weight: bold;
    }
    .contact-ul li span{
    	flex: 1;
    	display: inline-block;
    	padding: 10px 0;
    	padding-left: 30px;
    	border-right: 1px #E3E7F1 solid;
    	border-bottom: 1px #E3E7F1 solid;
    }
      .contact-ul li .span-mid:before{
    	content: '';
    	display: inline-block;
		vertical-align: middle;
		width: 0;
		height: 100%;
    }
    .contact-ul li .span-mid b{
    	display: inline-block;
    	vertical-align: middle;
    }
    .contact-ul li .contact-span{
    	flex: 1.5;
    }
    .contact-ul li .xiaohaoSpan b{
     	background: #eca521;
     	padding: 3px 5px;
     	border-radius: 5px;
     	color: #fff;
     }
    .blacklist-ul li .blacklist-span{
    	flex: 2.5;
    }
    .blacklist-ul li .tongdun-span{
    	flex: 1;
    }
     .blacklist-ul li .blacklist-span b{
    	display: block;
    	margin-bottom: 5px;
    	color: red;
    }
    .trip-ul li .trip-span{
    	flex: 1.5;
    }
    #myChart{
    	width: 100%;
    	height: 600px;
    	margin: 0 auto;
    }
    #longTimeChart{
    	width: 100%;
    	height: 600px;
    	margin: 0 auto;
    }
     #highTimeChart{
    	width: 100%;
    	height: 600px;
    	margin: 0 auto;
    }
    .top-div{
    	position: fixed;
    	bottom: 20px;
    	right: 20px;
    	width: 50px;
    	height: 50px;
    	text-align: center;
    	border:1px #E3E7F1 solid;
    	font-size: 14px;
    	padding-top: 6px;
    	border-radius: 5px;
    }
     .top-div p{
     	margin-bottom: 5px;
     }
    .top-div:hover{
    	background: #409EFF;
    	color: #fff;
    }
    .navP-title button{
    	float: right;
    	margin-top: -10px;
    }
    .nav img{
    	display: block;
    	margin: 0 auto;
    	width: 100%;
    }
</style>