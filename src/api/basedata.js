import request from '@/utils/request'

// 导入案件
export function inputcase() {
  return request({
    url: '/vue-element-admin/roles',
    method: 'get'
  })
}
// 更新案件信息
export function updatacase(data) {
  return request({
    url: '/vue-element-admin/role',
    method: 'post',
    data
  })
}
// 导入案件评语
export function inputcommtent(data) {
  return request({
    url: '/vue-element-admin/role',
    method: 'post',
    data
  })
}
// 导入案件联系人
export function inputcaller(data) {
  return request({
    url: '/vue-element-admin/role',
    method: 'post',
    data
  })
}
// 导入案件地址
export function inputadress(data) {
  return request({
    url: '/vue-element-admin/role',
    method: 'post',
    data
  })
}
// 导入案件记录
export function inputrecord(data) {
  return request({
    url: '/vue-element-admin/role',
    method: 'post',
    data
  })
}
// 导入临时标签
export function inputtag(data) {
  return request({
    url: '/vue-element-admin/role',
    method: 'post',
    data
  })
}
// 获取产品目录接口
export function getProList(data) {
  return request({
    url: '/product/list',
    params:data,
    method: 'get'
  })
}
// 添加产品目录接口
export function updatatPro(data) {
  return request({
    url: '/product/save',
    method: 'post',
    data
  })
}
// 删除产品接口
export function delPro(data) {
  return request({
    url: '/product/delete',
    method: 'delete',
    params:data
  })
}
// 获取入库批次接口
export function getBatchList(data) {
  return request({
    url: '/batch/list',
    params:data,
    method: 'get'
  })
}
// 添加产品目录接口
export function updataBatch(data) {
  return request({
    url: '/batch/save',
    method: 'post',
    data
  })
}
// 删除批次接口
export function delBatch(data) {
  return request({
    url: '/batch/delete',
    method: 'delete',
    params:data
  })
}

//债权方列表

//获取债权方列表

export function getCreditorslist(data) {
  return request({
    url: '/creditor/list',
    params:data,
    method: 'get'
  })
}
// 添加债权方
export function updataCreditors(data) {
  return request({
    url: '/creditor/save',
    method: 'post',
    data
  })
}
// 删除债权方
export function delCreditors(data) {
  return request({
    url: '/creditor/delete',
    method: 'delete',
    params:data
  })
}



//资产包类型

//获取资产包类型列表

export function getPackagelist(data) {
  return request({
    url: '/packagetype/list',
    params:data,
    method: 'get'
  })
}
// 添加资产包类型
export function updataPackage(data) {
  return request({
    url: '/packagetype/save',
    method: 'post',
    data
  })
}
// 删除资产包类型
export function delPackage(data) {
  return request({
    url: '/packagetype/delete',
    method: 'delete',
    params:data
  })
}