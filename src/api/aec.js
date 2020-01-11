import request from '@/utils/request'

export function getAecByParam(data) {
  return request({
    url: '/aec/select',
    method: 'post',
    data: data
  })
}

export function getAecById(id) {
  return request({
    url: '/aec/byId',
    method: 'post',
    data: {
      id
    }
  })
}

export function addAec(title, author, content, status) {
  return request({
    url: '/aec/add',
    method: 'post',
    data: {
      title,
      author,
      content,
      status
    }
  })
}

export function editAec(id, title, author, content, status) {
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

export function delAec(ids) {
  return request({
    url: '/activity/delete',
    method: 'post',
    data: {
      ids
    }
  })
}
