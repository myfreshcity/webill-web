const getters = {
  sidebar: state => state.app.sidebar,
  msgType:state =>state.app.msgType,
  msgDetail:state =>state.app.msgdetail,
  userInfo: state =>state.app.userInfo,
  clientMsg: state =>state.app.clientMsg,
  reportKey: state =>state.app.reportKey,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  roles: state => state.user.roles,
  contractNo: state => state.check.contractNo,
  commitId: state => state.check.commitId,
  serialId: state => state.check.serialId
}
export default getters
