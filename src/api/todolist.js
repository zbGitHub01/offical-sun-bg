
import request from '@/utils/request'
// 待办事项列表
export function getBacklogList(data) {
    
    return request({
      url: 'other/backlog/list',
      method: 'get',
      params:data
    })
  }
// 添加待办事项
export function addBacklog(data) {
    return request({
      url: 'other/backlog/save',
      method: 'post',
      data
    })
  }
// 更新待办事项
export function updateBacklog(data) {
    return request({
      url: 'other/backlog/update/status',
      method: 'post',
      data
    })
  }
// 显示待办事项数
export function BacklogNum(data) {
    return request({
      url: 'other/backlog/range/count',
      method: 'get',
      params:data
    })
  }