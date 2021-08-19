import request from '@/utils/request'
import { getOrgId} from "@/utils/auth"

export function getRoutes() {
  let paramst = {
    sysProductUuid:'0c933f65cf33310bb896e782c0861468454f8b17'
  }
  return request({
    url: '/auth-api/role/list/',
    method: 'get',
    params:paramst
  })
}

export function getRoles() {
  return request({
    url: '/vue-element-admin/roles',
    method: 'get'
  })
}

export function addRole(data) {
  return request({
    url: '/vue-element-admin/role',
    method: 'post',
    data
  })
}

export function updateRole(id, data) {
  return request({
    url: `/vue-element-admin/role/${id}`,
    method: 'put',
    data
  })
}

export function deleteRole(id) {
  return request({
    url: `/vue-element-admin/role/${id}`,
    method: 'delete'
  })
}
