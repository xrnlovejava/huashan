import request from '@/utils/request'

export function getActivityByParam(data) {
  return request({
    url: '/activity/byParam',
    method: 'post',
    data: data
  })
}

export function getActivityById(id) {
  return request({
    url: '/activity/byId',
    method: 'post',
    data: {
      id
    }
  })
}

export function addActivity(title, author, content, status) {
  return request({
    url: '/activity/add',
    method: 'post',
    data: {
      title,
      author,
      content,
      status
    }
  })
}

export function editActivity(id, title, author, content, status) {
  return request({
    url: '/activity/update',
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

export function delActivity(ids) {
  return request({
    url: '/activity/delete',
    method: 'post',
    data: {
      ids
    }
  })
}
