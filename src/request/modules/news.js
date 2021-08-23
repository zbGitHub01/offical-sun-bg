import request from '../index'
import {urls} from '../urls'

export function findArticlePage (data) { // 新闻资讯分页
  return request({
    url: urls.findArticlePage,
    method: 'get',
    params:data
  })
}
export function findArticleById (data) { // 新闻资讯id查新闻资讯
  return request({
    url: urls.findArticleById,
    method: 'get',
    params:data
  })
}
