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

export function addAec(articleId, userId, status) {
  return request({
    url: '/aec/add',
    method: 'post',
    data: {
      articleId,
      userId,
      status
    }
  })
}

export function editAec(articleId, userId, status) {
  console.log(articleId, userId, status)
  return request({
    url: '/aec/update',
    method: 'post',
    data: {
      articleId,
      userId,
      status
    }
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
