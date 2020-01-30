import request from '@/utils/request'

export function getPowerByParam(data) {
  return request({
    url: '/back/power/byParam',
    method: 'post',
    data: data
  })
}

export function addPower(powerName, elevel, parentId, operate, url, descript) {
  return request({
    url: '/back/power/add',
    method: 'post',
    data: {
      powerName,
      elevel,
      parentId,
      operate,
      url,
      descript
    }
  })
}

export function editPower(powerId, powerName, elevel, parentId, operate, url, descript) {
  return request({
    url: '/back/power/update',
    method: 'post',
    data: {
      powerId,
      powerName,
      elevel,
      parentId,
      operate,
      url,
      descript
    }
  })
}

export function delPower(ids) {
  return request({
    url: '/back/power/delete',
    method: 'post',
    data: {
      ids
    }
  })
}
