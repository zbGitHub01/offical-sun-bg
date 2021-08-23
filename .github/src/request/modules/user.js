import request from '../index'
import { urls } from '../urls'

export function login(params) { // 登录
    return request({
        url: urls.login,
        method: 'post',
        data: {
            ...params
        }
    })
}
export function findArticleById(data) { // 新闻资讯id查新闻资讯
    return request({
        url: urls.findArticleById,
        method: 'get',
        params: data
    })
}