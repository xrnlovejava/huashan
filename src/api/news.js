import request from '@/utils/request'

export function getNewsByParam(data) {
  if (data) {
    return request({
      url: '/news/select',
      method: 'post',
      data: data
    })
  } else {
    return request({
      url: '/news/select',
      method: 'post',
      data: {}
    })
  }
}

export function getNewsById(id) {
  return request({
    url: '/news/byId',
    method: 'post',
    data: {
      id
    }
  })
}

export function addNews(title, author, content, status) {
  return request({
    url: '/news/add',
    method: 'post',
    data: {
      title,
      author,
      content,
      status
    }
  })
}

export function editNews(id, title, author, content, status) {
  return request({
    url: '/news/update',
    method: 'post',
    data: {
      id,
      title,
      author,
      content,
      status
    }
  })
}

export function delNews(ids) {
  return request({
    url: '/news/delete',
    method: 'post',
    data: {
      ids
    }
  })
}

export function uploadImg(data) {
  return request({
    url: '/puc/uploadPicFile',
    method: 'post',
    headers: { 'Content-Type': 'multipart/form-data' },
    data: data
  })
}
