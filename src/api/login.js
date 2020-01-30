import request from '@/utils/request'

export function login(nickName, loginPass) {
  return request({
    url: '/back/auth/token',
    method: 'post',
    data: {
      nickName,
      loginPass
    }
  })
}

export function getInfo(id) {
  return request({
    url: '/back/user/byId',
    method: 'post',
    data: {
      id
    }
  })
}

export function logout() {
  return request({
    url: '/back/user/logout',
    method: 'post'
  })
}
