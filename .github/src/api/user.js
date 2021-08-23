import request from "@/utils/request";
import { postRequest } from "@/utils/formdata";
//登录
export function login(data) {
  return postRequest({
    url: "/auth/unified/login/mobile",
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

//获取用户分页列表
export function userList(data){
  return request({
      url: '/auth-api/user/list/page',
      method: 'get',
      params: data
  })
}

// 启用
export function enable(data){
  return request({
      url: '/auth-api/user/enable',
      method: 'post',
      data
  })
}
// 删除
export function batchDelete(data){
  return request({
      url: '/auth-api/user/delete',
      method: 'post',
      data
  })
}
// 添加
export function addAuthUserInfo(data){
  return request({
      url: '/auth-api/user/addAuthUserInfo',
      method: 'post',
      data
  })
}

