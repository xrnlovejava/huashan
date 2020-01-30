import request from '@/utils/request'

export function getAecByParam(data) {
  return request({
    url: '/back/aec/byParam',
    method: 'post',
    data: data
  })
}

export function getAecById(articleId) {
  return request({
    url: '/back/aec/byId',
    method: 'post',
    data: {
      articleId
    }
  })
}

export function addAec(data) {
  return request({
    url: '/back/aec/add',
    method: 'post',
    data: data
  })
}

export function editAec(data) {
  return request({
    url: '/back/aec/update',
    method: 'post',
    data: data
  })
}

export function getActivityList(data) {
  return request({
    url: '/back/article/byParam',
    method: 'post',
    data: data
  })
}

export function delAec(ids) {
  console.log(ids)
  return request({
    url: '/back/aec/delete',
    method: 'post',
    data: {
      ids
    }
  })
}
