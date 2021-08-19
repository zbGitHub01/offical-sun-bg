import request from '@/utils/request'
import { getOrgId} from "@/utils/auth"

//部门管理
// 获取部门管理列表
export function getDepartList(data) {
  let paramst = Object.assign({},data)
  paramst['orgId'] = getOrgId()
  return request({
    url: '/other/org/orgChart/list',
    method: 'get',
    params:paramst
  })
}

// 获取上级部门列表
export function getParDepartList(data) {
    return request({
      url: '/other/org/orgChart/parentList',
      method: 'get',
      params:data
    })
  }
// 添加部门
export function updataDepart(data) {
  return request({
    url: '/other/org/orgChart/save',
    method: 'post',
    data
  })
}
// 删除部门
export function delDepart(data) {
    return request({
      url: '/other/org/orgChart/delete',
      method: 'delete',
      params:data
    })
  }

  // 获取员工列表
  export function getUserList(data) {
    let paramst = Object.assign({},data)
    paramst['orgId'] = getOrgId()
    return request({
      url: '/other/org/system/user/list',
      method: 'get',
      params:paramst
    })
  }
  // 获取员工列表不分页
  export function getUserall(data) {
    let paramst = Object.assign({},data)
    paramst['orgId'] = getOrgId()
    return request({
      url: '/other/org/system/user/all',
      method: 'get',
      params:paramst
    })
  }
  //部门调整

  export function adjustDepartment(data) {
    return request({
      url: '/other/org/system/user/adjustDepartment',
      method: 'post',
      data
    })
  }
  
  // 添加员工
  export function updataUser(data) {
    return request({
      url: '/other/user/save',
      method: 'post',
      data
    })
  }
  // 删除员工
  export function delUser(data) {
      return request({
        url: '/other/user/delete',
        method: 'delete',
        params:data
      })
    } 
    //员工状态
  export function userStatus(data) {
    return request({
      url: '/other/user/positionStatus',
      method: 'post',
      data
    })
  }
  //员工账号启用
  export function userEnable(data) {
    return request({
      url: '/other/user/status',
      method: 'post',
      data
    })
  }
   //员工详情
   export function userDetail(data) {
    return request({
      url: '/other/user/info',
      method: 'get',
      params:data
    })
  }
  //钉钉解绑
  export function unDingding(data){
    return request({
      url:'/other/user/center/unbindDing',
      method:'post',
      data
    })
  }
  //角色列表不分页

export function rolenopage(data) {
  return request({
    url: "/auth-api/role/list/",
    method: "get",
    params: data
  });
}