export default class AppConfig {
  install (Vue, options) {
    // let basePath ='http://localhost:7080/webill-app'
    // let checkPath ='http://localhost:5000'
 let basePath ='http://webill.test.manmanh.com/webill'
 let checkPath ='http://webill.test.manmanh.com'
//  let basePath ='http://www.vebill.com/webill'
//  let checkPath ='http://www.vebill.com/webill'
//  let basePath ='http://webill.manmanh.com/webill'
//  let imgPath ='http://yadong.test.manmanh.com'
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
    Vue.prototype.$checkStage = (url) => {
      // return window.location.origin + '/readapi?uri=' + url
      return checkPath + url
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
