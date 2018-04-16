<template>
  <el-menu class="navbar" mode="horizontal">
    <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>
    <breadcrumb></breadcrumb>
    <el-dropdown class="avatar-container" trigger="click">
      <!--<div class="avatar-wrapper">-->
        <!--<img class="user-avatar" :src="avatar+'?imageView2/1/w/80/h/80'">
        <i class="el-icon-caret-bottom"></i>-->
      <!--</div>-->
      <!--<el-tooltip effect="dark" :content="$t('navbar.screenfull')" placement="bottom">
        <screenfull class="screenfull right-menu-item"></screenfull>
      </el-tooltip>-->
      
      <ul class="right-title">
      	<li class="li-active" @click="goAccount">{{userInfo.mobileNo}}</li>
      	<li class="line">|</li>
      	<li class="li-active" @click="goReport">报告模板</li>
      	<li class="line">|</li>
      	<li @click="logout" class="li-active">退出</li>
      </ul>
      <el-dropdown-menu  slot="dropdown">
      	
      
      </el-dropdown-menu>
    </el-dropdown>
  </el-menu>
</template>

<script>
import $ from 'jquery'
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import Screenfull from '@/components/Screenfull'
export default {
  components: {
    Breadcrumb,
    Hamburger,
    Screenfull,
  },
  mounted:function(){
  	
  },
  computed: {
    ...mapGetters([
    	'userInfo',
      'sidebar',
      'avatar'
    ])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('ToggleSideBar')
    },
    logout() {
    	this.$confirm('确认退出系统？', '系统提示', {
	          confirmButtonText: '退出',
	          cancelButtonText: '取消',
	          type: 'warning'
	        }).then(() => {
	        	 localStorage.clear()
//	           this.$store.dispatch('LogOut').then(() => {
//				        location.reload() // 为了重新实例化vue-router对象 避免bug
//				      })
             console.log(111)
             this.$router.push({path:'/login'})
	        }).catch(() => {
	                
	        });
      
    },
    goReport(){
    	this.$router.push({path:'/template/temPageBase'})
    },
    goAccount(){
    	this.$router.push({path:'/personal/account'})
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  height: 50px;
  line-height: 50px;
  border-radius: 0px !important;
  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }
  
  .avatar-container {
    height: 50px;
    display: inline-block;
    position: absolute;
    right: 35px;
    .avatar-wrapper {
      cursor: pointer;
      margin-top: 5px;
      position: relative;
      .user-avatar {
        width: 40px;
        height: 40px;
        border-radius: 10px;
      }
      .el-icon-caret-bottom {
        position: absolute;
        right: -20px;
        top: 25px;
        font-size: 12px;
      }
    }
  }
}
.right-title{
	outline: none;
}
.right-title li{
	float: left;
}
.right-title .line{
	padding: 0 20px;
}
.right-title .li-active:hover{
	color: #409EFF;
}

</style>

