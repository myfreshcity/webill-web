const check = {
  state: {
  	contractNo:"",   //合同编号
  	commitId:"",     //协商还款id
  	serialId:"",     //上传流水id
  },
  mutations: {
    CONTRACT_NO:(state,data) => {
    	state.contractNo = data
    },
     COMMIT_ID:(state,data) => {
    	state.commitId = data
    },
     SERIAL_ID:(state,data) => {
    	state.serialId = data
    }
  },
  actions: {
    ContractNo: ({ commit },contractNo) => {
    	commit('CONTRACT_NO',contractNo)
    },
     CommitId: ({ commit },commitId) => {
    	commit('COMMIT_ID',commitId)
    },
     SerialId: ({ commit },serialId) => {
    	commit('SERIAL_ID',serialId)
    }
  }
}

export default check
