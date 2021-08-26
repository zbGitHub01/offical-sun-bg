import request from '../index'
import { urls } from '../urls'

export function findPageArticle(data) { // 新闻资讯分页
    return request({
        url: urls.findPageArticle,
        method: 'get',
        params: data
    })
}
export function addArticle(params) { // 添加新闻资讯
    return request({
        url: urls.addArticle,
        method: 'post',
        data: {...params }
    })
}
export function updateByIdArticle(params) { // 修改新闻资讯
    return request({
        url: urls.updateByIdArticle,
        method: 'put',
        data: {...params }
    })
}
export function deleteArticle(params) { // 删除新闻资讯
    return request({
        url: urls.deleteArticle,
        method: 'delete',
        data: {...params }
    })
}
export function deleteListArticle(params) { // 删除多条新闻资讯
    return request({
        url: urls.deleteListArticle,
        method: 'delete',
        data: {...params }
    })
}
export function findByIdArticle(params) { // 新闻资讯id查新闻资讯
    return request({
        url: urls.findByIdArticle,
        method: 'get',
        params,
    })
}
export function updateSortArticle(params) { // 修改新闻资讯位置
    return request({
        url: urls.updateSortArticle,
        method: 'post',
        data: {...params }
    })
}