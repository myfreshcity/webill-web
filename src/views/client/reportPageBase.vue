<!--模板页面-->

<template>
	<div class="content">
		<p class="head">{{msgTitle}}</p>
		<sticky className="sub-navbar">
		<ul class="tabs-ul">
			<li :class="{'li-active':liActive==1}" @click="changeLi(1)">用户基本信息</li>
			<li :class="{'li-active':liActive==2}" @click="changeLi(2)">金融类通话信息</li>
			<li :class="{'li-active':liActive==3}" @click="changeLi(3)">联系人区域汇总</li>
			<li :class="{'li-active':liActive==4}" @click="changeLi(4)">长时间联系人</li>
			<li :class="{'li-active':liActive==5}" @click="changeLi(5)">高频联系人</li>
			<li :class="{'li-active':liActive==6}" @click="changeLi(6)">多平台借贷分析</li>
			<li :class="{'li-active':liActive==7}" @click="changeLi(7)">催收风险分析</li>
			<li :class="{'li-active':liActive==8}" @click="changeLi(8)">出行数据分析</li>
		</ul>
		</sticky>
		<div class="nav nav1" id="section-1">
			<p class="navP-title">用户基本信息</p>
			<p class="navP-head">基本信息</p>
			<ul class="nav1-ul">
				<li><span class="tabName"><b>登记姓名</b></span><span class="tabValue">{{baseMsg.user_name}}</span><span class="tabName"><b>性别</b></span><span class="tabValue">{{baseMsg.sex}}</span></li>
				<li><span class="tabName"><b>年龄</b></span><span class="tabValue">{{baseMsg.age}}</span><span class="tabName"><b>户籍地址</b></span><span class="tabValue">{{baseMsg.residence_address}}</span></li>
				<li>
					<span class="tabName"><b>居住地址</b></span><span class="tabValue tabValue2">{{baseMsg.residence_address}}<b>标准版可验真</b><br /></span>
				</li>
				<li><span class="tabName"><b>工作地址</b></span><span class="tabValue tabValue2">{{baseMsg.residence_address}}<b>标准版可验真</b></span></li>
				<li><span class="tabName"><b>身份证</b></span><span class="tabValue tabValue2">{{baseMsg.id_no}}<b>标准版可验真</b></span></li>
				<li class="mobile-li"><span class="tabName tabMobile"><b>手机号</b></span><span class="tabValue tabValue2 tabValue3">
						<p class="mobile-p1">{{baseMsg.website}}<span>{{baseMsg.reliability}}</span></p>
						<p class="mobile-p2">
							<span>{{baseMsg.mobile_no}}({{baseMsg.reg_time}})</span>
							<span class="mobile-span1"><svg-icon icon-class="dian" />{{baseMsg.check_name}}</span>
							<span class="mobile-spanlast mobile-span1"><svg-icon icon-class="dian" />{{baseMsg.check_idcard}}</span>
						</p>
						<p class="mobile-p3">
							<span>{{baseMsg.phone_silent_result}}</span>
							<span class="mobile-spanlast mobile-span2"><svg-icon icon-class="dian" />{{baseMsg.phone_silent_evidence}}</span>
						</p>
						<p class="mobile-p4">{{baseMsg.contact_each_other_evidence}}</p>
					</span>
				</li>
			</ul>
			<p class="navP-head">重要联系人</p>
			<ul class="contact-ul">
				<li class="contact-li"><span>关系</span><span>姓名</span><span class="contact-span">手机号码</span><span class="contact-span">是否为临时小号</span><span class="contact-span">通话时长排名</span><span class="contact-span">联系次数(6个月)</span><span>通话时长</span></li>
			    <li v-for="(ele,k) in msg.report_contact"><span>{{ele.relationship}}</span><span>{{ele.contact_name}}</span><span class="contact-span">{{ele.mobile_no}}</span><span class="contact-span">{{ele.check_xiaohao}}</span><span class="contact-span">{{ele.call_time_rank}}</span><span class="contact-span">{{ele.call_cnt}}</span><span>{{ele.call_len}}</span></li>
			    <!--<li ><span>父母</span><span>王玉梅</span><span class="contact-span">15966335913</span><span class="contact-span">非临时小号</span><span class="contact-span">1</span><span class="contact-span">379</span><span>459.20</span></li>
			    <li ><span>父母</span><span>王玉梅</span><span class="contact-span">15966335913</span><span class="contact-span">非临时小号</span><span class="contact-span">1</span><span class="contact-span">379</span><span>459.20</span></li>
			    <li ><span>父母</span><span>王玉梅</span><span class="contact-span">15966335913</span><span class="contact-span">非临时小号</span><span class="contact-span">1</span><span class="contact-span">379</span><span>459.20</span></li>
			    <li ><span>父母</span><span>王玉梅</span><span class="contact-span">15966335913</span><span class="contact-span">非临时小号</span><span class="contact-span">1</span><span class="contact-span">379</span><span>459.20</span></li>
			    <li ><span>父母</span><span>王玉梅</span><span class="contact-span">15966335913</span><span class="contact-span">非临时小号</span><span class="contact-span">1</span><span class="contact-span">379</span><span>459.20</span></li>-->
			</ul>
			<p class="navP-head">黑名单</p>
			<ul class="contact-ul blacklist-ul">
				<li class="contact-li"><span>检查项</span><span>结果</span><span class="blacklist-span">依据</span></li>
			    <li ><span>黑中介分数</span><span class="notNorm"></span><span class="blacklist-span">分数范围0-100，参考分为10，分数越低关系越紧密</span></li>
			    <li ><span>直接联系人中黑名单人数</span><span class="notNorm"></span><span class="blacklist-span">分数范围0-100，参考分为10，分数越低关系越紧密</span></li>
			    <li ><span>间接联系人中黑名单人数</span><span class="notNorm">高级版可查看</span><span class="blacklist-span">间接联系人：和被查询号码的直接联系人有通话记录</span></li>
			    <li ><span>直接联系人数量</span><span class="notNorm"></span><span class="blacklist-span">直接联系人：和被查询号码有通话记录</span></li>
			    <li ><span>引起黑名单的直接联系人数量</span><span class="notNorm"></span><span class="blacklist-span">直接联系人有和黑名单用户的通话记录的号码数量</span></li>
			    <li ><span>直接联系人中引起间接黑名单占比</span><span></span><span class="blacklist-span">直接联系人有和黑名单用户的通话记录的号码数量在直接联系人数量中的百分比</span></li>
			</ul>
		</div>
		<div class="nav nav2" id="section-2">
			<p class="navP-title">金融类通话信息</p>
			<ul class="contact-ul blacklist-ul">
				<li class="contact-li"><span>检查项</span><span class="blacklist-span">结果</span><span class="blacklist-span">依据</span></li>
			    <li v-for="(ele,k) in msg.financial_call_info"><span >{{ele.check_point_cn}}</span><span class="blacklist-span">{{ele.result}}</span><span class="blacklist-span">{{ele.evidence}}</span></li>
			    <li><span>互联网金融</span><span class="blacklist-span notNorm"></span><span class="blacklist-span notNorm"></span></li>
			    <li><span>典当</span><span class="blacklist-span notNorm"></span><span class="blacklist-span notNorm"></span></li>
			    <li><span>保险</span><span class="blacklist-span notNorm">高级版可查看</span><span class="blacklist-span notNorm">高级版可查看</span></li>
			    <li><span>小号</span><span class="blacklist-span notNorm"></span><span class="blacklist-span notNorm"></span></li>
			    <li><span>证券</span><span class="blacklist-span notNorm"></span><span class="blacklist-span notNorm"></span></li>
			    <li><span>理财</span><span class="blacklist-span"></span><span class="blacklist-span"></span></li>
			</ul>
		</div>
		<div class="nav nav3" id="section-3">
			<p class="navP-title">联系人区域汇总</p>
			<div id="myChart" ></div>
		</div>
		<div class="nav nav4" id="section-4">
			<p class="navP-title">长时间联系人(Top10)</p>
			<div id="longTimeChart" ></div>
		</div>
		<div class="nav nav5" id="section-5">
			<p class="navP-title">高频联系人(Top10)</p>
			<div id="highTimeChart" ></div>
		</div>
		<div class="nav nav5" id="section-6">
			<p class="navP-title">多平台借贷分析</p>
			<ul class="contact-ul blacklist-ul">
				<li class="contact-li"><span>检查项</span><span>结果</span><span class="blacklist-span">依据</span></li>
			    <li >
			    	<span class="span-mid"><b>身份证在多个网贷平台进行借款申请</b></span>
			    	<span class="span-mid"><b>建议拒绝</b></span>
			    	<span class="blacklist-span">
			    		<b>风险等级：高</b>
			    		<b>总个数：30</b>
			    		<b><svg-icon icon-class="dian" />互联网金融门户：1</b>
			    	</span>
			    </li>
			    <li >
			    	<span class="span-mid"><b>手机号在多个网贷平台进行借款申请</b></span>
			    	<span class="span-mid"><b>建议拒绝</b></span>
			    	<span class="blacklist-span">
			    		<b>风险等级：高</b>
			    		<b>总个数：30</b>
			    		<b><svg-icon icon-class="dian" />互联网金融门户：1</b>
			    	</span>
			    </li>
			</ul>
		</div>
		<div class="nav nav6" id="section-7">
			<p class="navP-title">催收风险分析</p>
			<ul class="contact-ul blacklist-ul">
				<li class="contact-li"><span>检查项</span><span>催收信息</span><span>疑似催收信息</span></li>
			    <li ><span>号码个数</span><span class="notNorm"></span><span class="notNorm"></span></li>
			    <li ><span>被叫次数</span><span class="notNorm"></span><span class="notNorm"></span></li>
			    <li ><span>被叫时长</span><span class="notNorm"></span><span class="notNorm"></span></li>    
			    <li ><span>被叫时长15s以下的次数</span><span class="notNorm"></span><span class="notNorm"></span></li>
			    <li ><span>被同一号码呼叫的最多次数</span><span class="notNorm"></span><span class="notNorm"></span></li>
			    <li ><span>被同一号码呼叫2次以上的号码个数</span><span class="notNorm">高级版可查看</span><span class="notNorm">高级版可查看</span></li>
			    <li ><span>主叫次数</span><span class="notNorm"></span><span class="notNorm"></span></li>
			    <li ><span>主叫时长</span><span class="notNorm"></span><span class="notNorm"></span></li>
			    <li ><span>近7天被催收呼叫次数</span><span class="notNorm"></span><span class="notNorm"></span></li>
			    <li ><span>近7-30天被催收呼叫次数</span><span class="notNorm"></span><span class="notNorm"></span></li>
			    <li ><span>近30-60天被催收呼叫次数</span><span class="notNorm"></span><span class="notNorm"></span></li>
			    <li ><span>近60-90天被催收呼叫次数</span><span class="notNorm"></span><span class="notNorm"></span></li>
			    <li ><span>近90-120天被催收呼叫次数</span><span></span><span></span></li>
			</ul>
		</div>
		<div class="nav nav7" id="section-8">
			<p class="navP-title">出行数据分析</p>
			<ul class="contact-ul trip-ul">
				<li class="contact-li"><span>时间段</span><span>出发地</span><span>目的地</span><span class="trip-span">出行开始时间</span><span class="trip-span">出行结束时间</span></li>
			   <li ><span class="notNorm2">高级版可查看</span></li>
			</ul>
		</div>
		<div class="top-div" @click="goTop">
			<p><svg-icon icon-class="top" /></p>
			<p>回顶部</p>
		</div>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'
	import Sticky from '@/components/Sticky'
	import $ from 'jquery'
	import Highcharts from 'highCharts'
	 export default {
	 	components: { Sticky },
	    data() {
	      return {
	      	liActive:1,
	      	msgTitle:'客户信息基础版',
	        activeName: 'first',
	        msg:{},
	        baseMsg:{},
	        contactAreaList:[],
	        contactInList:[],
	        contactOutList:[],
	        contactCountList:[],
	        topdateMobList:[],
	        topdateTimeList:[],
	        topdateCountList:[],
	        toptimesMobList:[],
	        toptimesTimeList:[],
	        toptimesCountList:[]
	      };
	    },
	    mounted:function(){
	    	console.log(this.msgDetail)
	    	this.msg=this.msgDetail
	    	this.baseMsg=this.msg.cus_basic_info
	    	for(let i=0;i<this.msg.contact_region.length;i++){
	    		this.contactAreaList.push(this.msg.contact_region[i].region_loc)
	    		this.contactInList.push(Number(this.msg.contact_region[i].region_call_in_cnt))
	    		this.contactOutList.push(Number(this.msg.contact_region[i].region_call_out_cnt))
	    		this.contactCountList.push(Number(this.msg.contact_region[i].region_uniq_num_cnt))
	    	}
	    	for(let i=0;i<this.msg.top10_date_contact.length;i++){
	    		this.topdateMobList.push(this.msg.top10_date_contact[i].format_tel)
	    		this.topdateTimeList.push(Number(this.msg.top10_date_contact[i].call_length))
	    		this.topdateCountList.push(Number(this.msg.top10_date_contact[i].call_times))
	    	}
	    	for(let i=0;i<this.msg.top10_times_contact.length;i++){
	    		this.toptimesMobList.push(this.msg.top10_date_contact[i].format_tel)
	    		this.toptimesTimeList.push(Number(this.msg.top10_date_contact[i].call_length))
	    		this.toptimesCountList.push(Number(this.msg.top10_date_contact[i].call_times))
	    	}
	    	console.log(this.contactAreaList)
	    	console.log(this.contactInList)
	    	console.log(this.contactOutList)
	    	console.log(this.contactCountList)
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
	    beforeUpdate:function(){
             var _this=this
             $(window).scroll(function(){
 			     //为页面添加页面滚动监听事件
                  var wst =  $(window).scrollTop() //滚动条距离顶端值
				 for (var i=1; i<8; i++){             //加循环
				  if(($("#section-"+i).offset().top-100)<=wst){ //判断滚动条位置
					  _this.liActive=i
					  _this.$forceUpdate()
					 }
				 }
	        })
	    },
	    methods: {
    	  goTop(){
    		window.scrollTo(0, 0); 
    		this.liActive=1
    	  },
	      changeLi(index){
	      	this.liActive=index
	      	window.scrollTo(0, $("#section-"+index).offset().top)
	      },
	      handleClick(tab, event) {
	        console.log(tab, event);
	      },
	      changeType(){
	      	this.$router.push({path:'/template/temPageNorm'})
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
		            categories: this.contactAreaList,
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
		            data: this.contactInList,
		            tooltip: {
		                valueSuffix: '次'
		            }
		        },{
		            name: '呼出次数',
		            type: 'column',
		            data: this.contactOutList,
		            tooltip: {
		                valueSuffix: '次'
		            }
		        }, {
		            name: '号码个数',
		            type: 'spline',
		            yAxis: 1,
		            data: this.contactCountList,
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
		            categories: this.topdateMobList,
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
		            align: 'center',
		            x: 0,
		            verticalAlign: 'top',
		            y: -10,
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
		            data: this.topdateTimeList,
		            tooltip: {
		                        valueSuffix: '分钟'
		                     }
		        }, {
		            name: '通话次数',
		            data: this.topdateCountList,
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
			            categories: this.toptimesMobList,
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
			            align: 'center',
			            x: 0,
			            verticalAlign: 'top',
			            y: -10,
			            floating: true,
			            borderWidth: 1,
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
			            data: this.toptimesTimeList,
			            tooltip: {
			                        valueSuffix: '分钟'
			                     }
			        }, {
			            name: '通话次数',
			            data: this.toptimesCountList,
			             tooltip: {
			                        valueSuffix: '次数'
			                     }
			        }]
			    })
	      }
	    },
	    computed: {
		    ...mapGetters([
		      'msgDetail'
		    ])
		}
	  };
</script>

<style scoped>
	.content{
		padding: 0 70px;
		padding-bottom: 700px;
		padding-top: 30px;
	}
	.content .head{
		height: 80px;
		line-height: 80px;
		font-weight: bold;
		font-size: 24px;
		border-bottom: 1px #D8D8D8 solid;
		margin-bottom: 20px;
	}
	.el-tabs{
		/*padding-left: 50px;*/
	}
	.el-tabs__nav-wrap::after{
		display: none;
		height: 0;
	}
	.tabs-ul{
		margin-bottom: 50px;
		display: flex;
		background: #fff;
		padding-top: 10px;
	}
	.tabs-ul li{
		
		margin: 10px 10px;
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
		padding-left: 30%;
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
		margin-left: 30px;
		color: #409EFF;
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
    .contact-ul li .notNorm{
    	border-bottom: none;
    	color: #0BB1FF;
    }
    .contact-ul li .notNorm2{
    	text-align: center;
    	color: #0BB1FF;
    }
    .contact-ul li .contact-span{
    	flex: 1.5;
    }
    .blacklist-ul li .blacklist-span{
    	flex: 2.5;
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
</style>