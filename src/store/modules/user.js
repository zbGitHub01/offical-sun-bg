import { api } from '@/request/api.js'
import {
    getToken,
    setToken,
    removeToken,
    setRole,
    removeRole,
    setUsername,
    setAvatar
} from "@/utils/auth";
import { resetRouter } from "@/router";
import { Message } from 'element-ui'

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
        userId: "",
        orgId: "",
        isExportCase: 1,
        departmentId: ""
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
    login({ dispatch, commit }, { params, callback1, callback2 }) {
        api.adminLogin(params).then(res => {
            callback2 && callback2()
            if (res.isError) return Message.error(res.msg)
            const tokens = res.data;
            commit("SET_TOKEN", tokens);
            setToken(tokens);
            dispatch('getInfo', callback1)
        })
    },
    // get user info
    getInfo({ commit }, callback1) {
        api.getUser().then(res => {
            if (res.isError) return Message.error(res.msg)
            const {
                username,
                avatarUrl,
                role
            } = res.data;
            commit("SET_NAME", username);
            commit("SET_AVATAR", avatarUrl);
            setRole(role);
            setUsername(username);
            setAvatar(avatarUrl);
            callback1 && callback1()
        })
    },

    // user logout
    logout({ commit, state }) {
        return new Promise((resolve, reject) => {
            removeToken(); // must remove  token  first
            removeRole();
            resetRouter();
            commit("RESET_STATE");
            resolve();
        });
    },

    // remove token
    resetToken({ commit }) {
        return new Promise(resolve => {
            removeToken(); // must remove  token  first
            removeRole();
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