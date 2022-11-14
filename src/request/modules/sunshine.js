import request from '../index'

// 获取内容配置页列表数据
export function getContentList(data) {
  return request({
    url: '/activitiesConfig/list',
    method: 'post',
    data,
  })
}

// 添加或编辑列表数据
export function addAndEdit(data) {
  return request({
    url: '/activitiesConfig/addAndEdit',
    method: 'post',
    data,
  })
}

// 查询列表数据详情
export function findById(param) {
  return request({
    url: '/activitiesConfig/findById?id=' + param,
    method: 'get',
  })
}

// 删除数据
export function deleteById(param) {
  return request({
    url: '/activitiesConfig/delete?id=' + param,
    method: 'get',
  })
}

// 报名配置列表
export function getSignList(data) {
  return request({
    url: '/activitiesApplicant/list',
    method: 'post',
    data,
  })
}

// 导出报名配置列表
export function exportExcel(data) {
  return request({
    url: '/activitiesApplicant/exportExcel',
    method: 'post',
    data,
  })
}

// 获取活动标题筛选列表
export function getHomeActivitiesInfo(data) {
  return request({
    url: '/activitiesConfig/getHomeActivitiesInfo',
    method: 'post',
    data,
  })
}