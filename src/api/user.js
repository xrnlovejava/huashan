import request from '@/utils/request'

export function addUser(userNo, nickName, loginPass, fullName, phone, introduction, birthday, gender) {
  return request({
    url: '/user/add',
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

export function editUser(id, userNo, nickName, fullName, phone, introduction, birthday, gender) {
  return request({
    url: '/user/update',
    method: 'post',
    data: {
      id,
      userNo,
      nickName,
      fullName,
      phone,
      introduction,
      birthday,
      gender
    }
  })
}

export function getByParam(nickName, operatorBut, pageNum, pageSize, id, fullName, phone, status, userType) {
  return request({
    url: '/user/byParam',
    method: 'post',
    data: {
      nickName,
      operatorBut,
      pageNum,
      pageSize,
      id,
      fullName,
      phone,
      status,
      userType
    }
  })
}

export function delUser(ids) {
  return request({
    url: '/user/delete',
    method: 'post',
    data: {
      ids
    }
  })
}

export function updateStatus(id, status) {
  return request({
    url: '/user/updateStatus',
    method: 'post',
    data: {
      id,
      status
    }
  })
}
