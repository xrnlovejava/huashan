import request from '@/utils/request'

export function getRoleByParam(data) {
  return request({
    url: '/back/role/byParam',
    method: 'post',
    data: data
  })
}

export function addRole(roleName, descript) {
  return request({
    url: '/back/role/add',
    method: 'post',
    data: {
      roleName,
      descript
    }
  })
}

export function editRole(roleId, roleName, descript) {
  return request({
    url: '/back/role/update',
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
    url: '/back/role/delete',
    method: 'post',
    data: {
      ids
    }
  })
}
