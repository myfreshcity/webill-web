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
				<li><span class="tabName"><b>登记姓名</b></span><span class="tabValue">{{baseMsg.user_name}}</span><span class="tabName"><b>性别</b></span><span class="tabValue">{{baseMsg.sex}}</span></li>
				<li><span class="tabName"><b>年龄</b></span><span class="tabValue">{{baseMsg.age}}</span><span class="tabName"><b>户籍地址</b></span><span class="tabValue">{{baseMsg.residence_address}}</span></li>
				<li>
					<span class="tabName"><b class="tabName-b">居住地址</b></span><span class="tabValue tabValue2">{{baseMsg.home_address}}<br /><b class="detail-b"><svg-icon icon-class="dian" />{{baseMsg.home_addr_check}}</b></span>
				</li>
				<li>
					<span class="tabName"><b class="tabName-b">工作地址</b></span><span class="tabValue tabValue2">{{baseMsg.work_address}}<br /><b class="detail-b"><svg-icon icon-class="dian" />工作地址可通过地图定位技术精确定位暂无</b></span>
				</li>
				<li><span class="tabName"><b>身份证</b></span><span class="tabValue tabValue2">{{baseMsg.id_no}}<b class="label" >{{baseMsg.check_court_black|blackFilter}}</b></span></li>
				<li class="mobile-li"><span class="tabName tabMobile"><b>手机号</b></span><span class="tabValue tabValue2 tabValue3">
						<p class="mobile-p1">{{baseMsg.website}}<span>{{baseMsg.reliability}}</span></p>
						<p class="mobile-p2">
							<span>{{baseMsg.mobile_no}}(注册时间{{baseMsg.reg_time}})</span>
							<span class="mobile-span1" :class='{"checkActive":nameCheck==1}'><svg-icon icon-class="dian" />{{baseMsg.check_name}}</span>
							<span class="mobile-spanlast mobile-span1" :class='{"checkActive":idCheck==1}'><svg-icon icon-class="dian" />{{baseMsg.check_idcard}}</span>
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
			    <li v-for="(ele,k) in msg.report_contact"><span>{{ele.relationship}}</span><span>{{ele.contact_name}}</span><span class="contact-span">{{ele.mobile_no}}</span><span class="contact-span" :class="{'xiaohaoSpan':ele.check_xiaohao==0}"><b>{{ele.check_xiaohao|xiaohaoFilter}}</b></span><span class="contact-span">{{ele.call_time_rank}}</span><span class="contact-span">{{ele.call_cnt}}</span><span>{{ele.call_len}}min</span></li>
			</ul>
			<p class="navP-head">黑名单</p>
			<ul class="contact-ul blacklist-ul">
				<li class="contact-li"><span>检查项</span><span>结果</span><span class="blacklist-span">依据</span></li>
			    <li ><span>黑中介分数</span><span>{{blackObj.phone_gray_score}}</span><span class="blacklist-span">分数范围0-100，参考分为10，分数越低关系越紧密</span></li>
			    <li ><span>直接联系人中黑名单人数</span><span>{{blackObj.contacts_class1_blacklist_cnt}}</span><span class="blacklist-span">分数范围0-100，参考分为10，分数越低关系越紧密</span></li>
			    <li ><span>间接联系人中黑名单人数</span><span>{{blackObj.contacts_class2_blacklist_cnt}}</span><span class="blacklist-span">间接联系人：和被查询号码的直接联系人有通话记录</span></li>
			    <li ><span>直接联系人数量</span><span>{{blackObj.contacts_class1_cnt}}</span><span class="blacklist-span">直接联系人：和被查询号码有通话记录</span></li>
			    <li ><span>引起黑名单的直接联系人数量</span><span>{{blackObj.contacts_router_cnt}}</span><span class="blacklist-span">直接联系人有和黑名单用户的通话记录的号码数量</span></li>
			    <li ><span>直接联系人中引起间接黑名单占比</span><span>{{blackObj.contacts_router_ratio}}</span><span class="blacklist-span">直接联系人有和黑名单用户的通话记录的号码数量在直接联系人数量中的百分比</span></li>
			</ul>
		</div>
		<div class="nav nav2" id="section-2">
			<p class="navP-title">金融类通话信息</p>
			<ul class="contact-ul blacklist-ul">
				<li class="contact-li"><span>检查项</span><span class="blacklist-span">结果</span><span class="blacklist-span">依据</span></li>
			    <li v-for="(ele,k) in msg.financial_call_info"><span class="span-mid"><b>{{ele.check_point_cn}}</b></span><span class="jinrong-span span-mid"><b>{{ele.result|resultFilter}}</b></span><span class="blacklist-span"><b v-show="ele.evidence.length>1">联系列表：{{ele.evidence.length}} <i v-show="!financialShow[k]" @click="showFinancial(k,1)" class="financial-more">展开更多</i><i v-show="financialShow[k]" @click="showFinancial(k,2)" class="financial-more">收起</i></b><b v-show="ele.evidence.length==0">无</b><b v-for="(item,m) in ele.evidence" v-show="financialShow[k]||ele.evidence.length==1">{{item}}</b></span></li>
			</ul>
		</div>
		<div class="nav nav3" id="section-3">
			<!--<p class="navP-title">联系人区域汇总 <el-button type="primary" @click="derive()">导出所有</el-button></p>-->
			<p class="navP-title">联系人区域汇总</p>
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
			 <div class="filter-container client-serach">
		  	<el-form :inline="true" :model="formSearch" class="demo-form-inline">
		  	 <el-form-item label="">
		  	  <el-date-picker
			      v-model="formSearch.beginTime"
			      type="date"
			      placeholder="选择日期"
			      value-format="yyyy-MM-dd">
			   </el-date-picker>
		     </el-form-item>
		     <el-form-item label="至">
		  	  <el-date-picker
			      v-model="formSearch.lastTime"
			      type="date"
			      placeholder="选择日期"
			      value-format="yyyy-MM-dd">
			   </el-date-picker>
		     </el-form-item>
			  <el-form-item label="">
			    <el-input v-model="formSearch.mobileNo" placeholder="被叫号码"></el-input>
			  </el-form-item>
			  <!--<el-form-item label="">
			    <el-select v-model="formSearch.latestReportType" placeholder="通话地区">
			      <el-option label="时间先后" value="1"></el-option>
			      <el-option label="通话时长" value="2"></el-option>
			    </el-select>
			  </el-form-item>-->
			  <el-form-item label="">
			    <el-select v-model="formSearch.callType" placeholder="呼叫类型">
			      <el-option label="主叫" value="1"></el-option>
			      <el-option label="被叫" value="2"></el-option>
			    </el-select>
			  </el-form-item>
			  <el-form-item label="">
			    <el-select v-model="formSearch.sortType" placeholder="排序类型">
			      <el-option label="时间先后" value="1"></el-option>
			      <el-option label="通话时长" value="2"></el-option>
			    </el-select>
			  </el-form-item>
			  <el-form-item>
			    <el-button type="primary" @click="onSearch" :loading="loading1">查询</el-button>
			    <el-button type="primary" @click="clear" >清空</el-button>
			  </el-form-item>
			</el-form>
		  </div>
		  <ul class="client-ul">
		  	<li class="client-li"><span class="client-span3">序号</span><span class="client-span">通话时间</span><span>本机通话地</span><span>呼叫类型</span><span class="client-span client-span2">被叫号码</span><span>通话时长</span></li>
		  	<li v-for="(ele,k) in mobileList">
		  		<span class="client-span3">{{ele.index}}</span>
		  		<span class="client-span">{{ele.callTime|timeFilter}}</span>
		  		<span>{{ele.callFrom}}</span>
		  		<span>{{ele.callMethod}}</span>
		  		<span class="client-span client-span2">{{ele.callTel}}</span>
		  		<span >{{ele.callDuration}}</span>
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
		<div class="nav nav5" id="section-7">
			<p class="navP-title">多平台借贷分析</p>
			<ul class="contact-ul blacklist-ul">
				<li class="contact-li"><span>检查项</span><span>检查结果</span><span class="blacklist-span tongdun-span">依据</span><span>综合结果</span></li>
				<li v-if="!tongdunShow"><span>无</span><span>无</span><span class="blacklist-span tongdun-span">无</span><span>无</span></li>
			    <li v-for="(ele,k) in tongdunObj.risk_items">
			    	<span class="span-mid"><b>{{ele.group}}</b></span>
			    	<span class="span-mid"><b>{{ele.item_name}}</b></span>
			    	<span class="blacklist-span tongdun-span">
			    		<b>风险等级：{{ele.risk_level|levelFilter}}</b>
			    		<b v-if="ele.item_detail.platform_count">总个数：{{ele.item_detail.platform_count}}</b>
			    		
			    		<p v-if="ele.item_detail"><b  v-for="(item,m) in ele.item_detail.platform_detail"><svg-icon icon-class="dian" />{{item}}</b></p>
			    	</span>
			    	<span class="span-mid"><b>{{tongdunObj.final_decision|decisionFilter}}</b></span>
			    </li>
			</ul>
		</div>
		<div class="nav nav6" id="section-8">
			<p class="navP-title">催收风险分析</p>
			<ul class="contact-ul blacklist-ul">
				<li class="contact-li"><span>检查项</span><span>催收信息</span><span>疑似催收信息</span></li>
			    <li ><span>号码个数</span><span>{{cuishouObj.nums_tel}}个</span><span>{{yisicuishouObj.nums_tel}}个</span></li>
			    <li ><span>被叫次数</span><span>{{cuishouObj.call_in_times}}次</span><span>{{yisicuishouObj.call_in_times}}次</span></li>
			    <li ><span>被叫时长</span><span>{{cuishouObj.call_in_length}}秒</span><span>{{yisicuishouObj.call_in_length}}秒</span></li>    
			    <li ><span>被叫时长15s以下的次数</span><span>{{cuishouObj.call_in_less_15}}次</span><span>{{yisicuishouObj.call_in_less_15}}次</span></li>
			    <li ><span>被同一号码呼叫的最多次数</span><span>{{cuishouObj.most_times_by_tel}}次</span><span>{{yisicuishouObj.most_times_by_tel}}次</span></li>
			    <li ><span>被同一号码呼叫2次以上的号码个数</span><span>{{cuishouObj.up_2_times_by_tel}}个</span><span>{{yisicuishouObj.up_2_times_by_tel}}个</span></li>
			    <li ><span>主叫次数</span><span>{{cuishouObj.call_out_times}}次</span><span>{{yisicuishouObj.call_out_times}}次</span></li>
			    <li ><span>主叫时长</span><span>{{cuishouObj.call_out_length}}秒</span><span>{{yisicuishouObj.call_out_length}}秒</span></li>
			    <li ><span>近7天被催收呼叫次数</span><span>{{cuishouObj.day7_times}}次</span><span>{{yisicuishouObj.day7_times}}次</span></li>
			    <li ><span>近7-30天被催收呼叫次数</span><span>{{cuishouObj.day30_times}}次</span><span>{{yisicuishouObj.day30_times}}次</span></li>
			    <li ><span>近30-60天被催收呼叫次数</span><span>{{cuishouObj.day60_times}}次</span><span>{{yisicuishouObj.day60_times}}次</span></li>
			    <li ><span>近60-90天被催收呼叫次数</span><span>{{cuishouObj.day90_times}}次</span><span>{{yisicuishouObj.day90_times}}次</span></li>
			    <li ><span>近90-120天被催收呼叫次数</span><span>{{cuishouObj.day120_times}}次</span><span>{{yisicuishouObj.day120_times}}次</span></li>
			</ul>
		</div>
		<div class="nav nav7" id="section-9">
			<p class="navP-title">出行数据分析</p>
			<ul class="contact-ul trip-ul">
				<li class="contact-li"><span>时间段</span><span>出发地</span><span>目的地</span><span class="trip-span">出行开始时间</span><span class="trip-span">出行结束时间</span></li>
				<li v-if="!tripShow"><span>无</span><span>无</span><span>无</span><span class="trip-span">无</span><span class="trip-span">无</span></li>
			    <li v-for="(ele,k) in tripList"><span>{{ele.trip_type}}</span><span>{{ele.trip_leave}}</span><span>{{ele.trip_dest}}</span><span class="trip-span">{{ele.trip_start_time}}</span><span class="trip-span">{{ele.trip_end_time}}</span></li>
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
	import {exportCsv,timeStampToDate} from '@/utils/utils'
	 export default {
	 	components: { Sticky },
	    data() {
	      return {
	      	tripShow:true,
	      	tongdunShow:true,
	      	liActive:1,
	      	msgTitle:'客户信息标准版',
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
	        toptimesCountList:[],
	        financialShow:[],          //金融类列表是否展开
	        tripList:[],              //出行数据列表
	        blackObj:{},             //黑名单分数
	        cuishouObj:{},           //催收信息
	        yisicuishouObj:{},       //疑似催收信息
	        tongdunObj:{},           //同盾信息
	        contactList:[],
	        nameCheck:1,             //姓名效验
	        idCheck:1,               //身份证效验
	        loading1:false,
	      	loading2:false,
	      	totalCount:0,
	      	mobileList:[],
	      	latestReportType:'',
	      	formSearch:{
	      		sortType:"",
	      		callType:"",
	      		mobileNo:"",
	      		beginTime:"",
	      		lastTime:"",
	      		length:10,
	      		sortWay:""
	      	},
	      	currentPage:1,
	      };
	    },
	     filters:{
	     	timeFilter(val){
	    		 var date = new Date(val*1000);
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
				 var t = Y + '-' + m + '-' + d;
				 return t;
	    	},
	    	resultFilter(data){
	    		if(data){
	    			return data
	    		}else{
	    			return "无"
	    		}
	    	},
	    	xiaohaoFilter(index){
	    		if(index==0){
	    			return "临时小号"
	    		}else{
	    			return "非临时小号"
	    		}
	    	},
	    	levelFilter(data){
	    		if(data=="high"){
	    			return "高"
	    		}else if(data=="medium"){
	    			return "中"
	    		}else{
	    			return "低"
	    		}
	    	},
	    	decisionFilter(data){
	    		if(data=="Reject"){
	    			return "建议拒绝"
	    		}else if(data=="Review"){
	    			return "建议审核"
	    		}else if(data=="Accept"){
	    			return "建议通过"
	    		}
	    	},
	    	blackFilter(index){
	    		if(index==0){
	    			return "在法院黑名单"
	    		}else{
	    			return "不在法院黑名单"
	    		}
	    	}
	    },
	    mounted:function(){
	    	if(this.userInfo.mobileNo){
	    		console.log(this.msgDetail)
		    	this.msg=this.msgDetail
		    	this.baseMsg=this.msg.cus_basic_info
		    	this.tripList=this.msg.trip_info
		    	this.blackObj=this.msg.black_info
		    	this.cuishouObj=this.msg.cuishou
		    	this.yisicuishouObj=this.msg.yisicuishou
		    	this.tongdunObj=this.msg.tongdun
		    	if(this.tongdunObj.risk_items.length==0){
		    		this.tongdunShow=false
		    	}else{
		    		this.tongdunShow=true
		    	}
		    	if(this.tripList.length==0){
		    		this.tripShow=false
		    	}else{
		    		this.tripShow=true
		    	}
		    	this.contactList=this.msg.all_contact
		    	const part1=new RegExp("匹配成功")
				const result1=part1.test(this.baseMsg.check_name);
				const part3=new RegExp("匹配一致")
				const result3=part3.test(this.baseMsg.check_name);
				const part2=new RegExp("匹配成功")
				const result2=part1.test(this.baseMsg.check_idcard);
				const part4=new RegExp("匹配一致")
				const result4=part4.test(this.baseMsg.check_idcard);
				if(result1||result3){
					this.nameCheck=1
				}else{
					this.nameCheck=2
				}
				if(result2||result4){
					this.idCheck=1
				}else{
					this.idCheck=2
				}
		    	for(let i=0;i<this.msg.contact_region.length;i++){
		    		this.contactAreaList.push(this.msg.contact_region[i].region_loc)
		    		this.contactInList.push(Number(this.msg.contact_region[i].region_call_in_cnt))
		    		this.contactOutList.push(Number(this.msg.contact_region[i].region_call_out_cnt))
		    		this.contactCountList.push(Number(this.msg.contact_region[i].region_uniq_num_cnt))
		    	}
		    	for(let i=0;i<this.msg.top10_date_contact.length;i++){
		    		this.topdateMobList.push('<span style="color:red;">'+this.msg.top10_date_contact[i].tags_label+'</span>'+this.msg.top10_date_contact[i].format_tel)
		    		this.topdateTimeList.push(Number(this.msg.top10_date_contact[i].call_length))
		    		this.topdateCountList.push(Number(this.msg.top10_date_contact[i].call_times))
		    	}
		    	for(let i=0;i<this.msg.top10_times_contact.length;i++){
		    		this.toptimesMobList.push('<span style="color:red;">'+this.msg.top10_times_contact[i].tags_label+'</span>'+this.msg.top10_times_contact[i].format_tel)
		    		this.toptimesTimeList.push(Number(this.msg.top10_times_contact[i].call_length))
		    		this.toptimesCountList.push(Number(this.msg.top10_times_contact[i].call_times))
		    	}
		    	for(let i=0;i<this.msg.financial_call_info.length;i++){
		    		this.financialShow.push(false)
		    	}
		    	this.initChart1()
		    	this.initChart2()
		    	this.initChart3()
		    	var _this=this
	             $(window).scroll(function(){
	 			     //为页面添加页面滚动监听事件
	                  var wst =  $(window).scrollTop() //滚动条距离顶端值
					 for (var i=1; i<10; i++){             //加循环
					  if(($("#section-"+i).offset().top-100)<=wst){ //判断滚动条位置
						  _this.liActive=i
						  _this.$forceUpdate()
						 }
					 }
		        })
	              var data = new FormData();
	           data.append('reportKey', this.reportKey);
	           data.append('currentPage', 1);
	           data.append('pageSize', 10);
	           data.append('sortWay', 1);
	           data.append('callTel', this.formSearch.mobileNo);
	           data.append('callMethod', this.formSearch.callType);
	           data.append('timeFrom', this.formSearch.beginTime);
	           data.append('timeTo', this.formSearch.lastTime);
	           const url=this.$backStage('/api/dhbReport/callsRecord')
	           this.$http.post(url, data).then((response) => {
	                        this.mobileList=response.data.obj.dataList
	                        this.totalCount=response.data.obj.totalSize
	                    }, (response) => {
	                        
	                    });
             }else{
	    		this.$router.push({path:'/client/clientList'})
	    	}
	    },
	    methods: {
	    	 handleCurrentChange(val) {
	    	   if(val!=1){
	       	   	   $(".el-pager").children("li").eq(0).removeClass("active");
	       	   }
	    	   console.log(val)
	      	   var data = new FormData();
	           data.append('reportKey', this.reportKey);
	           data.append('currentPage',val);
	           data.append('pageSize', 10);
	           data.append('sortWay', this.formSearch.sortType);
	           data.append('callTel', this.formSearch.mobileNo);
	           data.append('callMethod',this.formSearch.callType);
	           data.append('timeFrom', this.formSearch.beginTime);
	           data.append('timeTo', this.formSearch.lastTime);
	           const url=this.$backStage('/api/dhbReport/callsRecord')
	           this.$http.post(url, data).then((response) => {
	                        this.mobileList=response.data.obj.dataList
	                        this.totalCount=response.data.obj.totalSize
	                    }, (response) => {
	                        
	                    });
	      },
	      onSearch(){
	      	this.loading1=true
	      	var data = new FormData();
	           data.append('reportKey', this.reportKey);
	           data.append('currentPage',1);
	           data.append('pageSize', 10);
	           data.append('sortWay', this.formSearch.sortType);
	           data.append('callTel', this.formSearch.mobileNo);
	           data.append('callMethod',this.formSearch.callType);
	           data.append('timeFrom', this.formSearch.beginTime);
	           data.append('timeTo', this.formSearch.lastTime);
	           const url=this.$backStage('/api/dhbReport/callsRecord')
	           this.$http.post(url, data).then((response) => {
	           	            this.loading1=false
	                        this.mobileList=response.data.obj.dataList
	                        this.totalCount=response.data.obj.totalSize
	                        $("#foot-page .el-input__inner")[0].value=1
	                        $(".el-pager").children("li").removeClass("active");
                            $(".el-pager").children("li").eq(0).addClass("active");
	                    }, (response) => {
	                        
	                    });
	       },
	       clear(){
	      	this.formSearch.realName=""
	      	this.formSearch.mobileNo=""
	      	this.formSearch.idNo=""
	      	this.formSearch.latestReportStatus=""
	      	this.formSearch.latestReportType=""
	      	this.formSearch.latestReportTimeDatetime=""
	      },
	       derive(){
		      if(this.contactList.length > 0){
		            var dlist = this.contactList;
		            var obj = {title:"", titleForKey:"", data:""};
		            obj.title = ["通话号码","号码标注","通话次数","通话时长","号码归属地","呼出次数","呼入次数"];
		            obj.titleForKey = ["format_tel","tags_label","call_times","call_length","fancha_telloc","call_out_times","call_in_times"];
		             obj.data = dlist;
		             exportCsv(obj);
		      } else{
		        alert("没有数据，无法导出！");
		      }
	      },
	      
	    	showFinancial(index1,index2){
	      	
	      	if(index2==1){
	      		this.financialShow[index1]=true
	      		this.$forceUpdate() 
	      	}else{
	      		this.financialShow[index1]=false
	      		this.$forceUpdate() 
	      	}
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
		            categories:  this.contactAreaList,
		            crosshair:false
		        }],
		        yAxis: [{ // Primary yAxis
//		        	tickPixelInterval:10 ,
                    tickLength:2,
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
		            data:this.contactInList,
		            tooltip: {
		                valueSuffix: '次'
		            },
		        },{
		            name: '呼出次数',
		            type: 'column',
		            data:this.contactOutList,
		            tooltip: {
		                valueSuffix: '次'
		            }
		        }, {
		            name: '号码个数',
		            type: 'spline',
		            yAxis: 1,
		            data:this.contactCountList,
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
		            categories:this.topdateMobList,
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
		      'msgDetail',
		      'userInfo',
		      'reportKey'
		    ])
		  }
	  };
</script>

<style scoped>
	.content{
		padding: 0 70px;
		padding-bottom: 700px;
		padding-top: 10px;
	}
	.content .head{
		height: 50px;
		line-height: 50px;
		font-weight: bold;
		font-size: 24px;
		/*border-bottom: 1px #D8D8D8 solid;*/
		margin-bottom: .1rem;
	}
	.el-tabs__nav-wrap::after{
		display: none;
		height: 0;
	}
	.tabs-ul{
		margin-bottom: 20px;
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
		padding-top: 60px;
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
		font-size: 12px;
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
	.mobile-li .tabValue2 .checkActive{
	     color: #3CC477;
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
     .blacklist-ul li .jinrong-span{
    	flex: 2.5;
    }
     .blacklist-ul li .blacklist-span b{
    	display: block;
    	margin-bottom: 5px;
    	/*color: red;*/
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
    .nav .contact-ul li span b .financial-more{
    	color: red;
    	font-style:normal;
    	margin-left: 5px;
    }
    .navP-title button{
    	float: right;
    	margin-top: -10px;
    }
     /*通话详单*/
    .client-serach .el-input{
		width: 1.9rem;
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
		font-weight: bold;
	}
	.content .client-ul .client-li span{
		font-weight: bold;
	}
	.content .client-ul li span{
		flex: 1;
		text-align: center;
		padding: 20px 0;
		border-right: 1px #E3E7F1 solid;
		line-height: 24px;
	}
	.content .client-ul li .client-span{
		flex: 1.5;
	}
	.content .client-ul li .client-span2{
		flex: 2;
	}
	.content .client-ul li .client-span3{
		flex: .7;
	}
	.content .client-ul li span .checkMsg{
		padding: 6px 5px;
		font-size: 12px;
	}
	.content .client-ul li span .getMsg{
		padding: 6px 5px;
		font-size: 12px;
	}
</style>