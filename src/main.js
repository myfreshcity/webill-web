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

import '@/icons' // icon
import '@/permission' // permission control

//import * as filters from './filters'
Vue.use(ElementUI)

//Object.keys(filters).forEach(key => {
//Vue.filter(key, filters[key])
//})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
