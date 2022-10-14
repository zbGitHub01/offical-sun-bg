import request from '../index'
import { urls } from '../urls'

export function contactUsAdd(params) { // 添加联系我们
    return request({
        url: urls.contactUsAdd,
        method: 'post',
        data: {...params }
    })
}
export function contactUsList(params) { // 联系人列表
    return request({
        url: urls.contactUsList,
        method: 'post',
        data: {...params }
    })
}
export function contactUsDelete(params) { // 删除联系人
    return request({
        url: urls.contactUsDelete,
        method: 'get',
        params
    })
}
export function contactUsExportExcel(params) { // 导出联系人列表
    return request({
        url: urls.contactUsExportExcel,
        method: 'post',
        data: {...params }
    })
}