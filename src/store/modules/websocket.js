const state = {
  proData:[]
};

const mutations = {
  proData(state, proData) {
    state.proData = proData;
  }
};

const actions = {
  changeSetting({ commit }, data) {
    commit('proData', data)
  }
};

export default {
  state,
  mutations,
  actions
};
