import Cookies from 'js-cookie'

const app = {
  state: {
    sidebar: {
      opened: !+Cookies.get('sidebarStatus')
    },
    msgType:0,   //0=>基础版  1=>标准版
    msgdetail:{},    //报告详情
    userInfo:{},     //用户信息
    clientMsg:{},     //客户信息
    reportKey:"",     //报告的key
  },
  mutations: {
    TOGGLE_SIDEBAR: state => {
      if (state.sidebar.opened) {
        Cookies.set('sidebarStatus', 1)
      } else {
        Cookies.set('sidebarStatus', 0)
      }
      state.sidebar.opened = !state.sidebar.opened
    },
    MSG_TYPE:(state,data) => {
      state.msgType = data
    },
     MSG_DETAIL:(state,obj) => {
      state.msgdetail = obj
    },
     USER_INFO:(state,obj) => {
      state.userInfo = obj
    },
    CLIENT_MSG:(state,obj) => {
      state.clientMsg = obj
    },
    REPORT_KEY:(state,obj) => {
    	state.reportKey = obj
    }
  },
  actions: {
    ToggleSideBar: ({ commit }) => {
      commit('TOGGLE_SIDEBAR')
    },
    MsgType: ({ commit },msgType) => {
      commit('MSG_TYPE',msgType)
    },
     MsgDetail: ({ commit },msgDetail) => {
      commit('MSG_DETAIL',msgDetail)
    },
     UserInfo: ({ commit },userInfo) => {
      commit('USER_INFO',userInfo)
    },
     ClientMsg: ({ commit },clientMsg) => {
      commit('CLIENT_MSG',clientMsg)
    },
    ReportKey: ({ commit },reportKey) => {
    	commit('REPORT_KEY',reportKey)
    }
  }
}

export default app
