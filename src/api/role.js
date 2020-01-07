import request from '@/utils/request'

export function getRoleByParam(data) {
  return request({
    url: '/role/byParam',
    method: 'post',
    data: data
  })
}

export function addRole(roleName, descript) {
  return request({
    url: '/role/add',
    method: 'post',
    data: {
      roleName,
      descript
    }
  })
}

export function editRole(roleId, roleName, descript) {
  return request({
    url: '/role/update',
    method: 'post',
    data: {
      roleId,
      roleName,
      descript
    }
  })
}

export function delRole(ids) {
  return request({
    url: '/role/delete',
    method: 'post',
    data: {
      ids
    }
  })
}
