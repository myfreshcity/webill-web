const check = {
  state: {
  	contractNo:"",   //合同编号
  	contractId:"",   //合同ID
  	commitId:"",     //协商还款id
  	wasteId:"",      //上传流水id
  },
  mutations: {
    CONTRACT_NO:(state,data) => {
    	state.contractNo = data
    },
    CONTRACT_ID:(state,data) => {
    	state.contractId = data
    },
     COMMIT_ID:(state,data) => {
    	state.commitId = data
    },
     SERIAL_ID:(state,data) => {
    	state.serialId = data
    },
     WASTE_ID:(state,data) =>{
    	state.wasteId=data
    }
  },
  actions: {
    ContractNo: ({ commit },contractNo) => {
    	commit('CONTRACT_NO',contractNo)
    },
    ContractId: ({ commit },contractId) => {
    	commit('CONTRACT_ID',contractId)
    },
     CommitId: ({ commit },commitId) => {
    	commit('COMMIT_ID',commitId)
    },
     SerialId: ({ commit },serialId) => {
    	commit('SERIAL_ID',serialId)
    },
     WasteId: ({ commit },wasteId) => {
    	commit('WASTE_ID',wasteId)
    },
  }
}

export default check
