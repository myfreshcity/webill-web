import Vue from 'vue'
import Router from 'vue-router'
const _import = require('./_import_' + process.env.NODE_ENV)
// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
//{ path: '/login', component: _import('login/index'), hidden: true },
  { path: '/login', component: _import('login/login'), hidden: true },
  { path: '/register', component: _import('login/register'), hidden: true },
  { path: '/reset', component: _import('login/reset'), hidden: true },
  { path: '/agreement', component: _import('login/agreement'), hidden: true },
  { path: '/404', component: _import('404'), hidden: true },
  { path: '/backPage', component: _import('backPage'), hidden: true },
  
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    hidden: true,
    children: [{
      path: 'dashboard',
      component: _import('dashboard/index')
    }]
  },
  {
    path: '/client',
    component: Layout,
    redirect: '/client/clientList',
    name: 'Client',
    meta: { title: '客户资料', icon: 'client' },
    children: [
      {
        path: 'newClient',
        name: 'NewClient',
        component: _import('client/newClient'),
        meta: { title: '创建客户', icon: '' }
      },
      {
        path: 'clientList',
        name: 'ClientList',
        component: _import('client/clientList'),
        meta: { title: '客户列表', icon: '' }
      },
      {
        path: 'reportPageBase',
        hidden: true,
        name: 'ReportPageBase',
        component: _import('client/reportPageBase'),
        meta: { title: '基础版报告', icon: '' }
      },
       {
        path: 'reportPageNorm',
        hidden: true,
        name: 'ReportPageNorm',
        component: _import('client/reportPageNorm'),
        meta: { title: '标准版报告', icon: '' }
      },
      {
        path: 'wait',
        hidden: true,
        name: 'Wait',
        component: _import('client/wait'),
        meta: { title: '等待页', icon: '' }
      }
    ]
  },
 
   {
  	path: '/template',
    component: Layout,
    redirect: '/template/temPageBase',
    name: 'Template',
    hidden: true,
    meta: { title: '其他', icon: 'other' },
    children: [
      {
        path: 'temPageBase',
        name: 'TemPageBase',
        component: _import('template/temPageBase'),
        meta: { title: '报告页基础版模板', icon: '' }
      },
       {
        path: 'temPageNorm',
        name: 'TemPageNorm',
        component: _import('template/temPageNorm'),
        meta: { title: '报告页标准版模板', icon: '' }
      },
      {
        path: 'information',
        name: 'Information',
        component: _import('template/information'),
        meta: { title: '基础版&标准版', icon: '' }
      }
    ]
  },
{
	path: '/reconcil',
    component: Layout,
    redirect: '/reconcil/repaymentDetail',
    name: 'Reconcil',
    hidden: false,
    meta: { title: '对账管理', icon: 'qian' },
    children: [
     
	      {
	        path: 'checkSelf',
	        name: 'CheckSelf',
	        hidden: true,
	        component: _import('reconcil/checkManage/checkSelf'),
	        meta: { title: '导入还款流水', icon: '' }
	      },
	       {
	        path: 'contractSelf',
	        name: 'ContractSelf',
	        hidden: true,
	        component: _import('reconcil/checkManage/contractSelf'),
	        meta: { title: '导入合同', icon: '' }
	      },
	       {
	        path: 'repayList',
	        name: 'RepayList',
	        component: _import('reconcil/checkManage/repayList'),
	        meta: { title: '还款流水', icon: '' }
	      },
//	       {
//	        path: 'checkOrder',
//	        name: 'CheckOrder',
//	        component: _import('reconcil/checkManage/checkOrder'),
//	        meta: { title: '对账派单', icon: '' }
//	      },
	      {
	        path: 'checkList',
	        name: 'CheckList',
	        component: _import('reconcil/checkManage/checkList'),
	        meta: { title: '对账处理', icon: '' }
	      },
	      {
	        path: 'checkDetail',
	        name: 'CheckDetail',
	        hidden: true,
	        component: _import('reconcil/checkManage/checkDetail'),
	        meta: { title: '对账详情', icon: '' }
	      },
	       {
	        path: 'repaymentDetail',
	        name: 'RepaymentDetail',
	        component: _import('reconcil/loansManage/repaymentDetail'),
	        meta: { title: '合同列表', icon: '' }
	      },
	      {
	        path: 'repaymentPlan',
	        name: 'RepaymentPlan',
	        hidden: true,
	        component: _import('reconcil/loansManage/repaymentPlan'),
	        meta: { title: '还款计划', icon: '' }
	      },
	      {
	        path: 'creditDetail',
	        name: 'CreditDetail',
	        hidden: true,
	        component: _import('reconcil/creditApproval/creditDetail'),
	        meta: { title: '减免详情', icon: '' }
	      },
	      {
	        path: 'creditList',
	        name: 'CreditList',
	        component: _import('reconcil/creditApproval/creditList'),
	        meta: { title: '对账审核', icon: '' }
	      }
    ]
},
   {
    path: '/personal',
    component: Layout,
    redirect: '/personal/account',
    name: 'Personal',
    meta: { title: '用户中心', icon: 'personal' },
    children: [
      {
        path: 'account',
        name: 'Account',
        component: _import('personal/account'),
        meta: { title: '我的账户', icon: '' }
      },
      {
        path: 'autonym',
        name: 'Autonym',
        component: _import('personal/autonym'),
        meta: { title: '实名认证', icon: '' }
      },
      {
        path: 'privilege',
        name: 'Privilege',
        component: _import('personal/privilege'),
        meta: { title: '会员特权', icon: '' }
      },
       {
        path: 'buyRecord',
        name: 'BuyRecord',
        component: _import('personal/buyRecord'),
        meta: { title: '购买记录', icon: '' }
      },
       {
        path: 'buyData',
        name: 'BuyData',
        component: _import('personal/buyData'),
        meta: { title: '购买数据', icon: '' }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

