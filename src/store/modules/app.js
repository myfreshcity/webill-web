import Cookies from 'js-cookie'

const app = {
  state: {
    sidebar: {
      opened: !+Cookies.get('sidebarStatus')
    },
    msgtype:0,   //0=>基础版  1=>标准版
    msgdetail:{},    //报告详情
    userInfo:{},     //用户信息
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
      state.msgtype = data
    },
     MSG_DETAIL:(state,obj) => {
      state.msgdetail = obj
    },
     USER_INFO:(state,obj) => {
      state.userInfo = obj
    },
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
    }
  }
}

export default app
