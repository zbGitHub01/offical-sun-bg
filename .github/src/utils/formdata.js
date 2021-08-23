import axios from 'axios'
import { Message } from 'element-ui'
import router from '../router/index'
import Vue from 'vue'
import store from "@/store";
import { getToken } from "@/utils/auth";
// 请求拦截
axios.interceptors.request.use(config => {
  if (store.getters.token) {
    // let each request carry token
    // ['X-Token'] is a custom headers key
    // please modify it according to the actual situation
    config.headers["Authorization"] = getToken();
  }
  return config;
}, err => {
  Message.error({ message: '请求超时!' });
  return Promise.resolve(err);
})
// 响应拦截
axios.interceptors.response.use(res => {
  if (res.data.code === undefined) {
    return res.data;
  } else {
    switch (res.data.code) {
      case 110:
        Message.error({ message: res.data.msg });
        return Promise.reject(res);
      case 200:
        return res.data;
      case 11001:
        store.dispatch("user/logout");
        //在绑定钉钉时跳转页面所加上的code必须去除，不然将导致登录时会直接获取code进行钉钉绑定登录
        window.location.search = "";
        next(`/login?redirect=${to.path}`)
        return Promise.reject(res);
      case 401:
        store.dispatch("user/logout");
        //在绑定钉钉时跳转页面所加上的code必须去除，不然将导致登录时会直接获取code进行钉钉绑定登录
        window.location.search = "";
        next(`/login?redirect=${to.path}`)
        return Promise.reject(res);
      case 201:
        Message.error({ message: res.data.msg });
        return Promise.reject(res);
      case 500:
        Message.error({ message: res.data.msg });
        return Promise.reject(res);
      default:
        Message.error({ message: res.data.msg });
        return Promise.reject(res);
    }
  }

}, err => {
  if (!err.response.status) {
    return false;
  }
  switch (err.response.status) {
    case 504:
      Message.error({ message: '服务器被吃了⊙﹏⊙∥' });
      break;
    case 404:
      Message.error({ message: '服务器被吃了⊙﹏⊙∥' });
      break;
    case 403:
      Message.error({ message: '权限不足,请联系管理员!' });
      break;
    default:
      return Promise.reject(err);
  }
})
axios.defaults.timeout = 300000;// 请求超时5fen
export const postRequest = (data) => {
  return axios({
    method: data.method,
    url: data.url,
    data: data.data,
    transformRequest: [function (data) {
      let ret = ''
      for (let it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }
      return ret
    }],
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });
}