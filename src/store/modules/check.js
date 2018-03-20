const check = {
  state: {
  	contractNo:"",   //合同编号
  },
  mutations: {
    CONTRACT_NO:(state,data) => {
    	state.contractNo = data
    }
  },
  actions: {
    ContractNo: ({ commit },contractNo) => {
    	commit('CONTRACT_NO',contractNo)
    }
  }
}

export default check
