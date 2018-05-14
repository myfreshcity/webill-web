import Vue from 'vue'
import axios from 'axios'
Vue.prototype.$http = axios
import 'normalize.css/normalize.css'// A modern alternative to CSS resets
import AppConfig from './appconfig'
import Cookies from 'js-cookie'
Vue.use(new AppConfig())
import $ from 'jquery'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
//import locale from 'element-ui/lib/locale/lang/en'
import "../static/css/reset.css"
import '@/styles/index.scss' // global css
import rem from "./utils/rem"
import App from './App'
import router from './router'
import store from './store'
Vue.prototype.HOST = '/api'
import '@/icons' // icon
import '@/permission' // permission control
import {Message} from 'element-ui'
console.log(Vue.prototype.$backStage(''))
//import * as filters from './filters'
Vue.use(ElementUI)

//Object.keys(filters).forEach(key => {
//Vue.filter(key, filters[key])
//})
//const service = axios.create({
//baseURL: Vue.prototype.$backStage(''), // api的base_url
////baseURL: "http://webill.test.manmanh.com/webill",
////baseURL: "http://www.vebill.com/webill",
//timeout: 0 // 请求超时时间
//})
//export default service
axios.interceptors.request.use(
    config => {
    	  const token = localStorage.getItem('jwt_token')
        if (token) {  // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加了
            config.headers.Token = token;
        }
        return config;
    },
    err => {
    	alert("请求超时")
        return Promise.reject(err);
    });
    
axios.interceptors.response.use(
    response => {
//  	  console.log(response)
    	  if(response.data.obj){
    	  	if(response.data.obj.jwtToken){
    	  		let token= response.data.obj.jwtToken
    	  	  localStorage.setItem('jwt_token', token)
    	  	}
    	  }
        return response;
    },
    error => {
        if (error.response) {
            switch (error.response.status) {
            	case 400:
            	    router.replace({path:'404'}),
            	    Message.error('请求错误')
            	    break
                case 401:
                    // 这里写清除token的代码
                    router.replace({
                        path: 'login',
                        query: {redirect: router.currentRoute.fullPath}//登录成功后跳入浏览的当前页面
                    })
                    break
                case 500:
                    router.replace({path:'404'}),
            	    Message.error('服务器内部错误')
            	    break
                case 504:
                     Message.error('请求超时，请稍后重试')
                     break
            }
        }
        return Promise.reject(error.response.data) 
    });
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
