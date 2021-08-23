import request from '@/utils/request'

// 查询角色菜单集合
export function findpermission(data){
    return request({
        url: '/auth-api/permission/all/page',
        method: 'get',
        params:data
    })
}

// 添加初始化保存
export function save(data){
    return request({
        url: '/auth-api/permission/addOrUpdate',
        method: 'post',
        data
    })
}

//确认添加操作

export function addOrUpdateoperation(data) {
    return request({
        url: '/auth-api/permission/addOrUpdate/operation',
        method: 'post',
        data
    })
}


//获取系统服务

export function erver (data) {
    return request({
        url: '/auth-api/sys/server/all',
        method: 'get',
        params:data
    })
}