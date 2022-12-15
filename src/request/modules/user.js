import request from '../index'
import { urls } from '../urls'
import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import { getToken, removeToken, removeRole } from "@/utils/auth";
import router from '@/router'

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
export function changePassword(params) { // 用户修改密码
    return request({
        url: urls.changePassword,
        method: 'post',
        data: {
            ...params
        }
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
export function getUsers(params) { // 根据id获取用户信息
    return request({
        url: urls.getUsers,
        method: 'get',
        params,
    })
}


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
            const resData = res.data
            if (res.status === 200) {
                if (resData.code === 103) {
                    MessageBox.confirm(
                        '您的登录已过期，请重新登录', {
                            confirmButtonText: '重新登录',
                            showClose: false,
                            center: true,
                            showCancelButton: false,
                            closeOnClickModal: false,
                            closeOnPressEscape: false,
                            type: 'warning'
                        }
                    ).then(() => {
                        removeToken()
                        removeRole()
                        router.push({ path: '/login' })
                    })
                    return
                }
                if (resData.code === 200) {
                    const filePaths = resData.data
                    resolve(filePaths)
                } else {
                    Message.error('资源上传失败，请稍后重新上传')
                }
            } else {
                Message.error('资源上传失败，请稍后重新上传')
            }
        })
    })
}


// ——————————————————  上传视频接口
export function uploadVideo(config) { // 上传视频
  const temConfig = {
    headers: {
        token: getToken()
    },
    onUploadProgress: progressEvent =>{
      if (progressEvent.lengthComputable) {   //是否存在进度
        var percentCompleted = Math.round( (progressEvent.loaded * 100) / progressEvent.total );
        progressBar = percentCompleted
        console.log((progressEvent.loaded * 100) / progressEvent.total)
        // item.fileUploadPercent=percentCompleted;
      }
    },
  }
  const formData = new FormData()
  formData.append('file', config.file)
  const url = '/api/upload/uploadFile'
  return new Promise((resolve, reject) => {
      axios.post(url, formData, temConfig).then(res => {
          const resData = res.data
          if (res.status === 200) {
              if (resData.code === 103) {
                  MessageBox.confirm(
                      '您的登录已过期，请重新登录', {
                          confirmButtonText: '重新登录',
                          showClose: false,
                          center: true,
                          showCancelButton: false,
                          closeOnClickModal: false,
                          closeOnPressEscape: false,
                          type: 'warning'
                      }
                  ).then(() => {
                      removeToken()
                      removeRole()
                      router.push({ path: '/login' })
                  })
                  return
              }
              if (resData.code === 200) {
                  const filePaths = resData.data
                  resolve(filePaths)
              } else {
                  Message.error('资源上传失败，请稍后重新上传')
              }
          } else {
              Message.error('资源上传失败，请稍后重新上传')
          }
      })
  })
}