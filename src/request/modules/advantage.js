import request from '../index'
import { urls } from '../urls'

export function addAdvantageCategory(params) { // 添加广告分类
    return request({
        url: urls.addAdvantageCategory,
        method: 'post',
        data: {
            ...params
        }
    })
}
export function deleteAdvantageCategory(params) { //删除广告分类
    return request({
        url: urls.deleteAdvantageCategory,
        method: 'delete',
        data: {
            ...params
        }
    })
}
export function updateByIdAdvantageCategory(params) { //广告id修改广告分类
    return request({
        url: urls.updateByIdAdvantageCategory,
        method: 'put',
        data: {
            ...params
        }
    })
}
export function findPageAdvantageCategory(data) { // 广告分类分页
    return request({
        url: urls.findPageAdvantageCategory,
        method: 'get',
        params: data
    })
}
export function findByAllAdvantageCategory(data) { // 全部广告分类
    return request({
        url: urls.findByAllAdvantageCategory,
        method: 'get',
        params: data
    })
}


export function findPageAdvantage(data) { // 广告分页
    return request({
        url: urls.findPageAdvantage,
        method: 'get',
        params: data
    })
}
export function addAdvantage(params) { // 添加广告
    return request({
        url: urls.addAdvantage,
        method: 'post',
        data: {...params }
    })
}
export function updateByIdAdvantage(params) { // 修改广告
    return request({
        url: urls.updateByIdAdvantage,
        method: 'put',
        data: {...params }
    })
}
export function deleteAdvantage(params) { // 删除广告
    return request({
        url: urls.deleteAdvantage,
        method: 'delete',
        data: {...params }
    })
}
export function deleteListAdvantage(params) { // 删除多条广告
    return request({
        url: urls.deleteListAdvantage,
        method: 'delete',
        data: {...params }
    })
}
export function findByIdAdvantage(params) { // 根据广告id查广告
    return request({
        url: urls.findByIdAdvantage,
        method: 'get',
        params,
    })
}