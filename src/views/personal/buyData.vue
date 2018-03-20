<!--购买数据-->

<template>
	<div class="content">
		<p class="p-head">{{productType|typeFilter}}  <el-button  @click="changeType()"><svg-icon icon-class="change" />{{changeTitle}}</el-button></p>
		<div class="nav1">
			<div class="sel-div">
				选择套餐
			</div>
			<ul class="sel-ul">
				<li v-for="(ele,k) in mealList" @click="chooseType(k,ele)" :class="{'li-active':selectType==k}">
					<span class="span1">{{ele.times}}次</span>
					<span class="span2">{{ele.price|priceFilter}}元</span>
					<img src="../../../static/images/pay/bottom.png" v-show="selectType==k"/>
					<img src="../../../static/images/pay/zhekou.png" class="zhe-img"/>
				</li>
			</ul>
		</div>
		<div class="nav2">
			<div class="sel-div">
				支付方式
			</div>
			<ul class="sel-ul">
				<!--<li @click="pay(1)" :class="{'li-active':payType==1}">
					<span class="span1"><img src="../../../static/images/pay/zhifubao.png"/></span>
					<img src="../../../static/images/pay/bottom.png" v-show="payType==1" class="img-bottom"/>
				</li>
				<li @click="pay(2)" :class="{'li-active':payType==2}">
					<span class="span1"><img src="../../../static/images/pay/weixin.png"/></span>
					<img src="../../../static/images/pay/bottom.png" v-show="payType==2" class="img-bottom"/>
				</li>-->
				<li @click="pay(3)" :class="{'li-active':payType==3}">
					<span class="span1"><img src="../../../static/images/pay/yinlian2.png"/></span>
					<img src="../../../static/images/pay/bottom.png" v-show="payType==3" class="img-bottom"/>
				</li>
				
			</ul>
		</div>
		<p class="p-btn"><el-button type="primary"  :loading="loading" @click="toPay()">确认购买</el-button></p>
		<form action="https://cashier.lianlianpay.com/payment/authpay.htm" method="post" id="sub">
			    <input type="hidden" name="version" :value='payDetail.version'/>
                <input type="hidden" name="oid_partner" :value='payDetail.oid_partner'/>
                <input type="hidden" name="user_id" :value='payDetail.user_id'/>
                <input type="hidden" name="sign_type" :value='payDetail.sign_type'/>
                <input type="hidden" name="sign" :value='payDetail.sign'/>
                <input type="hidden" name="busi_partner" :value='payDetail.busi_partner'/>
                <input type="hidden" name="no_order" :value='payDetail.no_order'/>
                <input type="hidden" name="dt_order" :value='payDetail.dt_order'/>
                <input type="hidden" name="name_goods" :value='payDetail.name_goods'/>
                <input type="hidden" name="info_order" :value='payDetail.info_order'/>
                <input type="hidden" name="money_order" :value='payDetail.money_order'/>
                <input type="hidden" name="notify_url" :value='payDetail.notify_url'/>
                <input type="hidden" name="url_return" :value='payDetail.url_return'/>
                <input type="hidden" name="userreq_ip" :value='payDetail.userreq_ip'/>
                <input type="hidden" name="risk_item" :value='payDetail.risk_item'/>
                <input type="hidden" name="timestamp" :value='payDetail.timestamp'/>
                <input type="hidden" name="id_type" :value='payDetail.id_type'/>
                <input type="hidden" name="id_no" :value='payDetail.id_no'/>
                <input type="hidden" name="acct_name" :value='payDetail.acct_name'/>
                <input type="hidden" name="flag_modify" :value='payDetail.flag_modify'/>
		</form>
		<!--<button>确认购买</button>-->
	</div>
</template>

<script>
	import {getUrlParams} from '@/utils/utils'
	import { mapGetters } from 'vuex'
	export default{
		data(){
			return{
				selectType:0,
				payType:3,          //支付方式
				productType:0,      
				mealList:[],        //套餐列表
				mealId:"",          //套餐类型
				loading:false,
				changeTitle:"",
				payDetail:{},
			}
		},
		mounted:function(){
			if(this.userInfo.mobileNo){
				if(getUrlParams('result')=="success"){
					this.$confirm('购买数据成功', '系统提示', {
			          confirmButtonText: '确定',
			          cancelButtonText: '取消',
			          type: 'success'
			        })
				}else if(getUrlParams('result')=="faild"){
					this.$confirm('购买数据失败', '系统提示', {
			          confirmButtonText: '确定',
			          cancelButtonText: '取消',
			          type: 'warning'
			        })
				}
				if(this.msgType==0){
					this.productType=0
					this.changeTitle="切换标准版"
					const url=this.$backStage('/api/infoGoods/getInfoGoods/0')
					this.$http.get(url)
					.then((response) => { 
					    this.mealList=response.data.obj
					    this.mealId=this.mealList[0].id
					})
				}else{
					this.productType=1
					this.changeTitle="切换基础版"
					const url=this.$backStage('/api/infoGoods/getInfoGoods/1')
					this.$http.get(url)
					.then((response) => { 
					    this.mealList=response.data.obj
					    this.mealId=this.mealList[0].id
					})
				}
            }else{
				this.$router.push({path:'/personal/account'})
			}
		},
		filters: {
	    	typeFilter(index){
	    		if(index==0){
	    			return "客户信息基础版"
	    		}else{
	    			return "客户信息标准版"
	    		}
	    	},
	    	priceFilter(index){
	    		return index/100
	    	}
	    },
		methods:{
			chooseType(index,data){
			      this.selectType=index
			      this.mealId=data.id
			},
			pay(index){
				this.payType=index
			},
			toPay(){
				if(this.userInfo.isVerified==0){
		       		  this.$confirm('您还未进行实名认证，请先完成实名认证才可使用', '系统提示', {
			          confirmButtonText: '去认证',
			          cancelButtonText: '取消',
			          type: 'warning'
			        }).then(() => {
			           this.$router.push({path:'/personal/autonym'})
			        }).catch(() => {
			                
			        });
		       	}else{
				this.loading=true
				const url=this.$backStage('/api/trade/certPay')
					this.$http.post(url,{"userId":this.userInfo.id, "infoGoodsId":this.mealId})
					.then((response) => { 
						console.log(response)
						var obj=response.data.obj
					    this.payDetail={"acct_name":obj.acct_name,"busi_partner":obj.busi_partner,"dt_order":obj.dt_order,"flag_modify":obj.flag_modify,"id_no":obj.id_no,"id_type":obj.id_type,"info_order":obj.info_order,"money_order":obj.money_order,"name_goods":obj.name_goods,"no_order":obj.no_order,"notify_url":obj.notify_url,"oid_partner":obj.oid_partner,"risk_item":obj.risk_item,"sign":obj.sign,"sign_type":obj.sign_type,"timestamp":obj.timestamp,"url_return":obj.url_return,"user_id":obj.user_id,"userreq_ip":obj.userreq_ip,"version":obj.version}
                        const show=setTimeout(function () {
                       	        this.loading=false
					            document.getElementById("sub").submit()
					    }, 100)
					})
				}
			},
			changeType(){
				if(this.productType==0){
					this.productType=1
					this.changeTitle="切换基础版"
					const url=this.$backStage('/api/infoGoods/getInfoGoods/1')
					this.$http.get(url)
					.then((response) => { 
					    this.mealList=response.data.obj
					     this.mealId=this.mealList[0].id
					})
				}else{
					this.productType=0
					this.changeTitle="切换标准版"
					const url=this.$backStage('/api/infoGoods/getInfoGoods/0')
					this.$http.get(url)
					.then((response) => { 
					    this.mealList=response.data.obj
					    this.mealId=this.mealList[0].id
					})
				}
		    },
		},
		
		computed: {
	    ...mapGetters([
	      'msgType',
	      'userInfo'
	    ])
  },
	}
</script>

<style scoped>
	.content{
		padding: 30px;
		padding-top: 0;
	}
	.nav1{
		display: flex;
		overflow: hidden;
		margin-bottom: 80px;
	}
	.nav2{
		overflow: hidden;
		margin-bottom: 80px;
	}
	.content .p-head{
		height: 60px;
		line-height: 60px;
		font-size: 20px;
		border-bottom: 1px #E3E7F1 solid;
		margin-bottom: 50px;
	}
	.content .sel-div{
		width: 150px;
		height: 100px;
		text-align: center;
		/*float: left;*/
	}
	.content .sel-ul{
		flex: 1;
	}
	.content .nav1 .sel-ul li{
		width: 150px;
		height: 100px;
		text-align: center;
		border: 1px #E3E7F1 solid;
		margin-right: 50px;
		float: left;
		padding-top: 25px;
		margin-bottom: 20px;
		position: relative;
	}
	.content .nav1 .sel-ul .li-active{
		border: 1px #409EFF solid;
	}
	.content .nav1 .sel-ul li img{
		position: absolute;
		right: 0;
		bottom: 0;
	}
	.content .nav1 .sel-ul li .zhe-img{
		position: absolute;
		top: 0;
		left: 0;
		width: 40px;
		height: 40px;
	}
	.content .sel-ul li span{
		display: block;
	}
	.content .sel-ul li .span1{
		font-size: 24px;
		color: #409EFF;
		margin-bottom: 10px;
	}
	.content .nav2 .sel-div{
		width: 150px;
		height: 40px;
		line-height: 40px;
		text-align: center;
		float: left;
	}
	.content .nav2 .sel-ul li{
		width: 134px;
		height: 42px;
		border: 1px #E3E7F1 solid;
		margin-right: 30px;
		float: left;
		position: relative;
	}
	.content .nav2 .sel-ul .li-active{
		border: 1px #409EFF solid;
	}
	.content .nav2 .sel-ul li .img-bottom{
		position: absolute;
		right: 0;
		bottom: 0;
		width: 15px;
		height: 15px;
	}
	.content .nav2 .sel-ul li span img{
		display: block;
		margin: 0 auto;
		margin-top: 7px;
	}
	.content .p-btn{
		text-align: center;
	}
	.content .svg-icon{
		position: absolute;
		top: 0;
		left: 0;
		width: 50px;
		height: 50px;
	}
</style>