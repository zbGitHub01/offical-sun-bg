import request from '../index'
import { urls } from '../urls'
import axios from 'axios'
import { Message } from 'element-ui'
import { getToken } from "@/utils/auth";

export function adminLogin(params) { // 登录
    return request({
        url: urls.adminLogin,
        method: 'post',
        data: {
            ...params
        }
    })
}
export function getUser(data) { // 获取用户信息
    return request({
        url: urls.getUser,
        method: 'get',
        params: data
    })
}

export function findPageUser(data) { // 分页获取用户
    return request({
        url: urls.findPageUser,
        method: 'get',
        params: data
    })
}
export function addUser(params) { // 添加用户
    return request({
        url: urls.addUser,
        method: 'post',
        data: {...params }
    })
}
export function updateByIdUser(params) { // 修改用户
    return request({
        url: urls.updateByIdUser,
        method: 'put',
        data: {...params }
    })
}
export function deleteUser(params) { // 删除用户
    return request({
        url: urls.deleteUser,
        method: 'delete',
        data: {...params }
    })
}
// export function deleteListArticle(params) { // 删除多条新闻资讯
//     return request({
//         url: urls.deleteListArticle,
//         method: 'delete',
//         data: {...params }
//     })
// }
// export function findByIdArticle(params) { // 新闻资讯id查新闻资讯
//     return request({
//         url: urls.findByIdArticle,
//         method: 'get',
//         params,
//     })
// }


// ——————————————————  上传文件接口
export function uploadFile(config) { // 上传图片
    const temConfig = {
        headers: {
            token: getToken()
        }
    }

    const formData = new FormData()
    formData.append('file', config.file)
    const url = '/api/upload/upload'
    return new Promise((resolve, reject) => {
        axios.post(url, formData, temConfig).then(res => {
            if (res.status === 200) {
                const filePaths = res.data.data
                resolve(filePaths)
            } else {
                Message.error('资源上传失败，请稍后重新上传')
            }
        })
    })
}