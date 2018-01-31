export default class AppConfig {
  install (Vue, options) {
    let basePath ='http://yadong.test.manmanh.com/webill-app'
    // 1. 添加全局方法或属性
    Vue.appConstant = () => {
      return {
        'appPath': '',
      }
    }
    Vue.myGlobalMethod = (url) => {
    }
    // 2. 添加全局资源
    Vue.directive('my-directive', {})
    // 3. 添加实例方法
    Vue.prototype.$backStage = (url) => {
      // return window.location.origin + '/readapi?uri=' + url
      return basePath + url
    }
    Vue.prototype.$imgStage = (url) => {
      // return window.location.origin + '/readapi?uri=' + url
      return imgPath + url
    }
//  Vue.prototype.$img = (url) => {
//    // return window.location.origin + '/readapi?uri=' + url
//    return imgPath + url + '.jpg'
//  }
  }
}
