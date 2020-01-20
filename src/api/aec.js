import request from '@/utils/request'

export function getAecByParam(data) {
  return request({
    url: '/aec/byParam',
    method: 'post',
    data: data
  })
}

export function getAecById(articleId) {
  return request({
    url: '/aec/byId',
    method: 'post',
    data: {
      articleId
    }
  })
}

export function addAec(data) {
  return request({
    url: '/aec/add',
    method: 'post',
    data: data
  })
}

export function editAec(data) {
  return request({
    url: '/aec/update',
    method: 'post',
    data: data
  })
}

export function getActivityList(data) {
  return request({
    url: '/article/byParam',
    method: 'post',
    data: data
  })
}

export function delAec(ids) {
  return request({
    url: '/aec/delete',
    method: 'post',
    data: {
      ids
    }
  })
}
