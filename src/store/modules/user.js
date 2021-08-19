import { login, getInfo, thirdLogin, unbind , automatic } from "@/api/user";
import {
  getToken,
  setToken,
  removeToken,
  setAuth,
  removeAuth,
  setOrgId,
  setDepartmentId
} from "@/utils/auth";
import { resetRouter } from "@/router";

const getDefaultState = () => {
  return {
    token: getToken(),
    name: "",
    avatar: "",
    bindThirdStatus: "",
    totalReductionAmount: "",
    departmentName: "",
    openId: "",
    auth: "",
    userId:"",
    orgId:"",
    isExportCase:1,
    departmentId:""
  };
};

const state = getDefaultState();

const mutations = {
  RESET_STATE: state => {
    Object.assign(state, getDefaultState());
  },
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  SET_AUTH: (state, auth) => {
    state.auth = auth;
  },
  SET_USERID: (state, userId) => {
    state.userId = userId;
  },
  SET_NAME: (state, name) => {
    state.name = name;
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar;
  },
  SET_BINDTHIRDSTATUS: (state, bindThirdStatus) => {
    state.bindThirdStatus = bindThirdStatus;
  },
  SET_TOTALREDUCTIONAMOUNT: (state, totalReductionAmount) => {
    state.totalReductionAmount = totalReductionAmount;
  },
  SET_DEPARTMENTNAME: (state, departmentName) => {
    state.departmentName = departmentName;
  },
  SET_OPRNID: (state, openId) => {
    state.openId = openId;
  },
  SET_ORGID: (state, orgId) => {
    state.orgId = orgId;
  },
  SET_DEPARTMENTID: (state, departmentId) => {
    state.departmentId = departmentId;
  },
  SET_ISEXPORTCASE: (state, isExportCase) => {
    state.isExportCase = isExportCase;
  }
};

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { userPhone,captcha, openId } = userInfo;
    return new Promise((resolve, reject) => {
      login({
        client_id: "调解中心管理",
        client_secret: "调解中心管理",
        mobile: userPhone.trim(),
        code: captcha,
        openId:openId,
        type:3
        })
        .then(response => {
            let tokens = "Bearer " + response.data.token;
            commit("SET_TOKEN", tokens);
            setToken(tokens);
            setAuth(response.data.token);
            resolve();
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  thirdLogin({ commit }, params) {
    return new Promise((resolve, reject) => {
      thirdLogin(params)
        .then(response => {
          if(response.data.userId === 0){
            commit("SET_OPRNID", response.data.openId)
            commit("SET_USERID", response.data.userId);
            resolve();
          }else if(response.data.tokenInfo !== null){
            let tokens = "Bearer " + response.data.tokenInfo.token;
            commit("SET_TOKEN", tokens);
            commit("SET_AUTH", response.data.tokenInfo.token);
            setToken(tokens);
            setAuth(response.data.tokenInfo.token);
            resolve();
          }
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  automatic({ commit }, params) {
    return new Promise((resolve, reject) => {
      automatic(params)
        .then(response => {
          commit("SET_TOKEN", response.token);
          let tokens = "Bearer " + response.data.token;
          commit("SET_TOKEN", tokens);
          commit("SET_AUTH", response.data.token);
          setToken(tokens);
          setAuth(response.data.token);
          resolve();
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  //解除绑定
  unBind({ commit }) {
    return new Promise((resolve, reject) => {
      let params = {
        type:3  
      }
      unbind(params)
        .then(response => {
          resolve();
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      let params = {
        type:3
      }
      getInfo(params)
        .then(response => {
          const { data } = response;
          const {
            username,
            userAvatar,
            isBindDingTalk,
            totalReductionAmount,
            userId,
            departmentId,
            orgName,
            isExportCase,
            orgId
          } = data;
          setOrgId(orgId)
          setDepartmentId(departmentId)
          commit("SET_ISEXPORTCASE",isExportCase)
          commit("SET_USERID", userId);
          commit("SET_NAME", username);
          commit("SET_AVATAR", userAvatar);
          commit("SET_BINDTHIRDSTATUS", isBindDingTalk);
          commit("SET_TOTALREDUCTIONAMOUNT", totalReductionAmount);
          commit("SET_DEPARTMENTNAME", orgName);
          commit("SET_ORGID",orgId)
          commit("SET_DEPARTMENTID",departmentId)
          resolve(data);
          // websocket.Init();
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      removeToken(); // must remove  token  first
      removeAuth();
      resetRouter();
      commit("RESET_STATE");
      resolve();
    });
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken(); // must remove  token  first
      removeAuth();
      commit("RESET_STATE");
      resolve();
    });
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
