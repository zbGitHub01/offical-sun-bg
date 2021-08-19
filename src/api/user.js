import request from "@/utils/request";
import { postRequest } from "@/utils/formdata";
//登录
export function login(data) {
  return postRequest({
    url: "/other/unified/login/mobile",
    method: "post",
    data
  });
}

//钉钉登录
export function thirdLogin(data) {
  return request({
    url: "/other/user/thirdLogin",
    method: "get",
    params: data
  });
}
//用户信息
export function getInfo(data) {
  return request({
    url: "/other/user/center/getUserIndexInfo",
    method: "get",
    params:data
  });
}
//钉钉解绑
export function unbind(data) {
  return request({
    url: "/other/user/center/unbindDing",
    method: "post",
    data
  });
}
//修改密码
export function editPaw(data) {
  return request({
    url: "/other/user/center/save",
    method: "post",
    data
  });
}
//获取验证码
export function getSmsCode(data) {
  return postRequest({
    url: `/auth/sms/send/${data.userPhone}`,
    method: "post"
  });
}

//审批员工
export function getUserList(data) {
  return postRequest({
    url: `/other/user/dutyStaff`,
    method: "get",
    params:data
  });
}

//权限
export function getUserPermission(data) {
  return request({
    url: `/auth-api/user/getUserPermission`,
    method: "get",
    params:data
  });
}

//自动登录
export function automatic(data) {
  return request({
    url: `/other/org/admin/automatic`,
    method: "get",
    params:data
  });
}