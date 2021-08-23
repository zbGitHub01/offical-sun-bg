import request from '../index'
import { urls } from '../urls'

export function adminLogin(params) { // 登录
    return request({
        url: urls.adminLogin,
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