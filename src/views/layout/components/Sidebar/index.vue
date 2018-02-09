<template>
  <scroll-bar>
    <el-menu mode="vertical" unique-opened :default-active="$route.path" :collapse="isCollapse" background-color="#304156" text-color="#fff" active-text-color="#409EFF">
      <div class="title-head" text-color="#fff"></div>
      <sidebar-item :routes="routes"></sidebar-item>
    </el-menu>
  </scroll-bar>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'
import ScrollBar from '@/components/ScrollBar'

export default {
  components: { SidebarItem, ScrollBar },
  computed: {
    ...mapGetters([
      'sidebar'
    ]),
    routes() {
      return this.$router.options.routes
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  }
}
</script>
<style scoped>
	.title-head{
		text-align: center;
		color: #409EFF;
		height: 50px;
		font-size:20px ;
		line-height: 50px;
		border-bottom:.01rem #999 solid ;
		background: url(../../../../../static/images/logo/logo02.png) no-repeat center;
		background-size: 89px 50px;
	}
</style>