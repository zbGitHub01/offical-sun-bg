import request from '@/utils/request'

export function findPage(data){
    return request({
        url: '/auth-api/sys/product/all/page',
        method: 'get',
        params:data
    })
}

export function save(data){
    return request({
        url: '/auth-api/sys/product/addOrUpdate',
        method: 'post',
        data
    })
}

//不分页的产品

export function findnoPage(data)  {
    return request({
        url: '/auth-api/sys/product/all',
        method: 'get',
        params:data
    })
}