import request from '../index'
import { urls } from '../urls'

export function findAdvantageByAll(data) { // 全部分类广告
    return request({
        url: urls.findAdvantageByAll,
        method: 'get',
        params: data
    })
}