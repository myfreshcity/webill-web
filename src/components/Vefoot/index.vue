<template>
  <div>
        <p class="footer">All Rights Reserved 上海葆鼎网络科技有限公司  <a @click="goRecord">沪ICP备17026101号-2</a></p>
  </div>
</template>

<script>
export default {
  name: 'Vefoot',
  props: {
  },
  data() {
    return {
    }
  },
  mounted() {
  },
  methods: {
  	goRecord(){
  		window.open("http://www.miibeian.gov.cn")
  	}
  }
}
</script>
<style>
	
	.footer{
		height: .5rem;
		line-height: .5rem;
		color: #ccc;
		width: 100%;
		text-align: center;
		position: absolute;
		left: 0;
		bottom: 0;
		color: #ccc;
		font-size: 12px;
	}
</style>
