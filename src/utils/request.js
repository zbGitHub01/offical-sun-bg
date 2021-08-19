import axios from "axios";
import { MessageBox, Message, Loading } from "element-ui";
import store from "@/store";
import { getToken } from "@/utils/auth";
let loading = null //定义loading变量
//开始 加载loading
let startLoading = () => {
  loading = Loading.service({
    lock: true,
    text: '加载中……',
    target:'.app-main',
    background: 'rgba(0, 0, 0, 0)'
  })
}
//结束 取消loading加载
let endLoading = () => {
  loading.close()
}

let needLoadingRequestCount = 0

let showFullScreenLoading = () => {
  if (needLoadingRequestCount === 0) { //当等于0时证明第一次请求 这时开启loading
    startLoading()
  }
  needLoadingRequestCount++ //全局变量值++ 
}

let tryHideFullScreenLoading = () => {
  if (needLoadingRequestCount <= 0) return //小于等于0 证明没有开启loading 此时return
  needLoadingRequestCount-- //正常响应后 全局变量 --
  if (needLoadingRequestCount === 0) {  //等于0 时证明全部加载完毕 此时结束loading 加载
    endLoading()
  }
}

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 180000  // request timeout
});
// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers["Authorization"] = getToken();
    }
    //开启loading加载
    showFullScreenLoading()
    return config;
  },
  error => {
    // do something with request error
    //console.log(error); // for debug
    return Promise.reject(error);
  }
);

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    tryHideFullScreenLoading()
    const res = response.data;
    // if the custom code is not 20000, it is judged as an error.
    if (res.code !== 200) {
      if(res.code === 11001){
        store.dispatch("user/logout");
        //在绑定钉钉时跳转页面所加上的code必须去除，不然将导致登录时会直接获取code进行钉钉绑定登录
        window.location.search = "";
        next(`/login?redirect=${to.path}`)
      }else{
        Message({
          message: res.msg || "Error",
          type: "error",
          duration: 10 * 1000
        });
        // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
        if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
          // to re-login
          MessageBox.confirm(
            "You have been logged out, you can cancel to stay on this page, or log in again",
            "Confirm logout",
            {
              confirmButtonText: "Re-Login",
              cancelButtonText: "Cancel",
              type: "warning"
            }
          ).then(() => {
            store.dispatch("user/resetToken").then(() => {
              location.reload();
            });
          });
        }
      }
      // Promise.reject(new Error(res.message || "Error"))
      return res;
    } else {
      tryHideFullScreenLoading()
      return res;
    }
  },
  error => {
    tryHideFullScreenLoading()
    //console.log("err" + error); // for debug
    Message({
      message: error.message,
      type: "error",
      duration: 10 * 1000
    });
    return Promise.reject(error);
  }
);

export default service;
