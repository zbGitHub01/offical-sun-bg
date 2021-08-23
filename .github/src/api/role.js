import request from '@/utils/request'

export function getRoutes() {
  let paramst= {
    sysProductUuid:'0c933f65cf33310bb896e782c0861468454f8b17'
  }
  return request({
    url: '/auth-api/role/list/',
    method: 'get',
    params:paramst
  })
}

//角色列表

export function roleList  (data)  {
    return request({
        url: '/auth-api/role/list/page',
        method: 'get',
        params: data

    })
}

//角色列表不分页
export function rolenopageList  (data)  {
  return request({
      url: '/auth-api/role/list/',
      method: 'get',
      params: data

  })
}

//所有权限配置节点
export function rolepermissionAssig(data) {
    return request({
      url: "/auth-api/permission/all",
      method: "get",
      params: data
    });
  }
  
//新增/编辑角色权限
export function rolesave(data) {
    return request({
      url: "/auth-api/role/addOrUpdate",
      method: "post",
      data
    });
  }