<template>
	<div class="welcome">
		<div class="box">
			<img class="banner" src="../../../static/images/welcome/banner1.jpg" />
			<span class="span1"><i>亲爱的用户，</i></span>
			<span class="span2"><i>{{timeShow}}</i></span>
			<span class="span3"><i>欢迎使用微账房</i></span>
			<img class="logo" src="../../../static/images/logo/logo.png" />
		</div>
		<vefoot></vefoot>
	</div>
</template>

<script>
	import Vefoot from '@/components/Vefoot'
    import { mapGetters } from 'vuex'
    import {dateJudge} from '@/utils/utils'
    export default{
    	components: { Vefoot },
    	data(){
    		return {
    			timeShow:"",
    		}
    	},
    	mounted:function(){
    		this.timeShow=dateJudge()
//    		if(this.userInfo.realName){
//			   this.$router.push({ path: '/client/clientList' })
//		    }
    	},
    	computed: {
		    ...mapGetters([
		      'userInfo'
		    ])
		}
    }
</script>

<style scoped>
	.box{
		width: 12rem;
		height: 8.5rem;
		position: absolute;
		left: 50%;
	    top: 50%;
		margin-left: -5.5rem;
		margin-top: -4.25rem;
		z-index: -1;
	}
	.welcome .banner{
		width: 100%;
		height:100%;
	}
	.logo{
		width: 2rem;
		position: absolute;
		right: 1rem;
		bottom: 1rem;
	}
	.box span{
		font-size: .4rem;
	}
	.span1{
		position: absolute;
		left: 2rem;
		top: 1.5rem;
	}
	.span2{
		position: absolute;
		left: 2rem;
		top: 2.5rem;
	}
	.span3{
		position: absolute;
		left: 2rem;
		top: 3.5rem;
	}
</style>