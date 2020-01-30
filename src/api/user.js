import request from '@/utils/request'

export function addUser(userNo, nickName, loginPass, fullName, phone, introduction, birthday, gender) {
  return request({
    url: '/back/user/add',
    method: 'post',
    data: {
      userNo,
      nickName,
      loginPass,
      fullName,
      phone,
      introduction,
      birthday,
      gender
    }
  })
}

export function editUser(id, userNo, nickName, fullName, phone, introduction, birthday, gender, avatar) {
  return request({
    url: '/back/user/update',
    method: 'post',
    data: {
      id,
      userNo,
      nickName,
      fullName,
      phone,
      introduction,
      birthday,
      gender,
      avatar
    }
  })
}

export function getByParam(data) {
  console.log(data)
  return request({
    url: '/back/user/byParam',
    method: 'post',
    data: data
  })
}

export function delUser(ids) {
  return request({
    url: '/back/user/delete',
    method: 'post',
    data: {
      ids
    }
  })
}

export function updateStatus(id, status) {
  return request({
    url: '/back/user/updateStatus',
    method: 'post',
    data: {
      id,
      status
    }
  })
}

export function updateUserType(id, userType) {
  return request({
    url: '/back/user/updateType',
    method: 'post',
    data: {
      id,
      userType
    }
  })
}

export function updatePwd(id, oldPwd, newPwd) {
  return request({
    url: '/back/user/updatePwd',
    method: 'post',
    data: {
      id,
      oldPwd,
      newPwd
    }
  })
}
