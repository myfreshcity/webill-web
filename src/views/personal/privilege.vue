<!--会员特权-->

<template>
	<div class="content">
		<p class="p-head">会员功能暂未开放，敬请期待</p>
		<div class="nav">
			<p class="p-title">会员特权</p>
			<ul>
				<li class="li1">
					<span class="span1">特权对比</span>
					<span class="span2">
						<b class="b1">试用会员</b>
						<b class="b2">免费</b>
					</span>
					<span class="span2">
						<b class="b1">银卡会员</b>
						<b class="b2">￥??元/月</b>
					</span>
					<span class="span2 span3">
						<b class="b1">金卡会员</b>
						<b class="b2">￥??/月</b>
					</span>
				</li>
				<li class="li2 li-tip">
					<span class="span4">客户管理</span>
					<span class="span5">
						<b class="b-tip b-tip2">
							赠送协同账号数量<br />
							<i>注：额外每增加一个账号，单独付费</i>
						</b>
						<b>每月赠送客户数据更新次数</b>
					</span>
					<span class="span2">
						<b class="b-tip">5</b>
						<b>0</b>
					</span>
					<span class="span2">
						<b class="b-tip">10</b>
						<b>0</b>
					</span>
					<span class="span2 span3">
						<b class="b-tip">15</b>
						<b>100</b>
					</span>
				</li>
				<li class="li2 li3">
					<span class="span4">客户管理</span>
					<span class="span5">
						<b>客户录入</b>
						<b>客户查看</b>
					</span>
					<span class="span2">
						<b><svg-icon icon-class="duihao" /></b>
						<b><svg-icon icon-class="duihao" /></b>
					</span>
					<span class="span2">
						<b><svg-icon icon-class="duihao" /></b>
						<b><svg-icon icon-class="duihao" /></b>
					</span>
					<span class="span2 span3">
						<b><svg-icon icon-class="duihao" /></b>
						<b><svg-icon icon-class="duihao" /></b>
					</span>
				</li>
				<li class="li4">
					<span class="span4">借款管理</span>
					<span class="span5">
						<b>借款产品支持数量</b>
						<b>借款信息录入</b>
						<b>风控审核</b>
						<b class="b-tip b-tip2">
							放款管理<br  />
						    <i>注：线下放款，生成还款计划</i>
						</b>
						<b>还款管理</b>
					</span>
					<span class="span2">
						<b>1</b>
						<b></b>
						<b></b>
						<b class="b-tip"></b>
						<b></b>
					</span>
					<span class="span2">
						<b>3</b>
						<b><svg-icon icon-class="duihao" /></b>
						<b><svg-icon icon-class="duihao" /></b>
						<b class="b-tip"><svg-icon icon-class="duihao" /></b>
						<b></b>
					</span>
					<span class="span2 span3">
						<b>5</b>
						<b><svg-icon icon-class="duihao" /></b>
						<b><svg-icon icon-class="duihao" /></b>
						<b class="b-tip"><svg-icon icon-class="duihao" /></b>
						<b></b>
					</span>
				</li>
				<li class="li2 li5">
					<span class="span4">经营状况统计</span>
					<span class="span5">
						<b>基础统计</b>
						<b>高级统计</b>
					</span>
					<span class="span2">
						<b></b>
						<b></b>
					</span>
					<span class="span2">
						<b><svg-icon icon-class="duihao" /></b>
						<b></b>
					</span>
					<span class="span2 span3">
						<b><svg-icon icon-class="duihao" /></b>
						<b><svg-icon icon-class="duihao" /></b>
					</span>
				</li>
				<li class="li6">
					<span class="span4">系统安全</span>
					<span class="span5">
						<b>登录设备绑定</b>
					</span>
					<span class="span2">
						<b></b>
					</span>
					<span class="span2">
						<b><svg-icon icon-class="duihao" /></b>
					</span>
					<span class="span2 span3">
						<b><svg-icon icon-class="duihao" /></b>
					</span>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
</script>

<style scoped>
	.content{
		padding: 30px;
	}
	.svg-icon{
		color: #0BB1FF;
	}
	.content .p-head{
		font-size: 20px;
		margin-bottom: 20px;
	}
	.nav .p-title{
		text-align: center;
		font-size: 18px;
		margin-bottom: 20px;
	}
	.nav ul{
		border: 1px #E3E7F1 solid;
		border-bottom: none;
		border-right:none;
	}
	.nav ul li{
		height: 40px;
		line-height: 40px;
		text-align: center;
		display: flex;
		border-bottom: 1px #E3E7F1 solid;
	}
	.nav ul .li1{
		height: 120px;
	}
	.nav ul .li1 .span1{
		line-height: 120px;
	}
	.nav ul .li1 .span2{
	}
	.nav ul .li2{
		height: 80px;
	}
	.nav ul .li2 .span4{
		line-height: 80px;
	}
	.nav ul .li4{
		height: 240px;
	}
	.nav ul .li4 .span4{
		line-height: 240px;
	}
	.nav ul .li-tip{
		height: 120px;
	}
	.nav ul .li-tip .span4{
		line-height: 120px;
	}
	.nav ul li .b-tip{
		height: 80px;
		line-height: 80px;
	}
	.nav ul li .b-tip2{
		padding-top: 15px;
		line-height: 25px;
	}
	.nav ul li .b-tip2 i{
		font-style: normal;
		color: red;
		font-size: 14px;
	}
	.nav ul li b{
		height: 40px;
		display: block;
		border-bottom: 1px #E3E7F1 solid;
	}
	.nav ul .li1 .b1{
		font-size: 18px;
		font-weight: bold;
		padding-top: 20px;
		border-bottom: none;
		margin-bottom: 20px;
	}
	.nav ul .li1 .b2{
		font-size: 14px;
		color: #666;
		border-bottom: none;
	}
	.nav ul li span{
		flex: 1;
		border-right: 1px #E3E7F1 solid;
	}
	.nav ul li .span1{
		flex: 1.8;
	}
	.nav ul li .span4{
		flex: .7;
	}
	.nav ul li .span5{
		flex: 1.1;
	}
</style>