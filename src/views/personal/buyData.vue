<!--购买数据-->

<template>
	<div class="content">
		<p class="p-head">客户信息标准版</p>
		<div class="nav1">
			<div class="sel-div">
				选择套餐
			</div>
			<ul class="sel-ul">
				<li @click="chooseType(1)" :class="{'li-active':selectType==1}">
					<span class="span1">100次</span>
					<span class="span2">??元</span>
					<img src="../../../static/images/pay/bottom.png" v-show="selectType==1"/>
				</li>
				<li @click="chooseType(2)" :class="{'li-active':selectType==2}">
					<span class="span1">200次</span>
					<span class="span2">??元</span>
					<img src="../../../static/images/pay/bottom.png" v-show="selectType==2"/>
				</li>
				<li @click="chooseType(3)" :class="{'li-active':selectType==3}">
					<span class="span1">300次</span>
					<span class="span2">??元</span>
					<img src="../../../static/images/pay/bottom.png" v-show="selectType==3"/>
				</li>
				<li @click="chooseType(4)" :class="{'li-active':selectType==4}">
					<span class="span1">500次</span>
					<span class="span2">??元</span>
					<img src="../../../static/images/pay/bottom.png" v-show="selectType==4"/>
				</li>
			</ul>
		</div>
		<div class="nav2">
			<div class="sel-div">
				支付方式
			</div>
			<ul class="sel-ul">
				<li @click="pay(1)" :class="{'li-active':payType==1}">
					<span class="span1"><img src="../../../static/images/pay/zhifubao.png"/></span>
					<img src="../../../static/images/pay/bottom.png" v-show="payType==1" class="img-bottom"/>
				</li>
				<li @click="pay(2)" :class="{'li-active':payType==2}">
					<span class="span1"><img src="../../../static/images/pay/weixin.png"/></span>
					<img src="../../../static/images/pay/bottom.png" v-show="payType==2" class="img-bottom"/>
				</li>
				<li @click="pay(3)" :class="{'li-active':payType==3}">
					<span class="span1"><img src="../../../static/images/pay/yinlian2.png"/></span>
					<img src="../../../static/images/pay/bottom.png" v-show="payType==3" class="img-bottom"/>
				</li>
				
			</ul>
		</div>
		<button>确认购买</button>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				selectType:1,
				payType:1,
			}
		},
		methods:{
			chooseType(index){
			      this.selectType=index
			},
			pay(index){
				this.payType=index
			}
		}
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
	.content .sel-ul li span{
		display: block;
	}
	.content .sel-ul li .span1{
		font-size: 20px;
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
	.content button{
		display: block;
		width: 120px;
		height: 50px;
		text-align: center;
		line-height: 50px;
		color: #fff;
		margin: 0 auto;
		background: #409EFF;
		border-radius:6px ;
		border: none;
		outline: none;
	}
</style>