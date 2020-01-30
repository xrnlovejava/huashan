import request from '@/utils/request'

export function getNewsByParam(data) {
  return request({
    url: '/back/article/byParam',
    method: 'post',
    data: data
  })
}

export function getNewsById(id) {
  return request({
    url: '/back/article/byId',
    method: 'post',
    data: {
      id
    }
  })
}

export function addNews(data) {
  return request({
    url: '/back/article/add',
    method: 'post',
    data: data
  })
}

export function editNews(data) {
  console.log(data)
  return request({
    url: '/back/article/update',
    method: 'post',
    data: data
  })
}

export function updateArticleStatus(data) {
  return request({
    url: '/back/article/updateStatus',
    method: 'post',
    data: data
  })
}

export function delNews(ids) {
  return request({
    url: '/back/article/deleteById',
    method: 'post',
    data: {
      ids
    }
  })
}

export function deleteActivity(ids) {
  return request({
    url: '/back/article/deleteByActivityId',
    method: 'post',
    data: {
      ids
    }
  })
}

export function uploadImg(data) {
  return request({
    url: '/back/puc/uploadArticleContentPic',
    method: 'post',
    headers: { 'Content-Type': 'multipart/form-data' },
    data: data
  })
}

export function addOrDelActivityId(data) {
  return request({
    url: '/back/article/addOrDelActivityId',
    method: 'post',
    data: data
  })
}
