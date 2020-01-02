import request from '@/utils/request'

export function login(nickName, loginPass) {
  return request({
    url: '/auth/token',
    method: 'post',
    data: {
      nickName,
      loginPass
    }
  })
}

export function getInfo(id) {
  return request({
    url: '/user/byId',
    method: 'post',
    data: {
      id
    }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
