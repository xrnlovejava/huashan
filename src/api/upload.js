import request from '@/utils/request'

export function uploadHeaderImage(data) {
  return request({
    url: '/back/puc/uploadHeaderImage',
    method: 'post',
    headers: { 'Content-Type': 'multipart/form-data' },
    data: data
  })
}

export function uploadBannerImage(data) {
  return request({
    url: '/back/puc/uploadBannerImage',
    method: 'post',
    headers: { 'Content-Type': 'multipart/form-data' },
    data: data
  })
}
