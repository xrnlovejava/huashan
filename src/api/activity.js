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

export function addActivity(articleId, activityCount, userLevel, enrollStartDate, enrollEndDate, startDate, endDate, gender, status) {
  return request({
    url: '/activity/add',
    method: 'post',
    data: {
      articleId,
      activityCount,
      userLevel,
      enrollStartDate,
      enrollEndDate,
      startDate,
      endDate,
      gender,
      status
    }
  })
}

export function editActivity(articleId, activityCount, userLevel, enrollStartDate, enrollEndDate, startDate, endDate, gender, status) {
  console.log(articleId, activityCount, userLevel, enrollStartDate, enrollEndDate, startDate, endDate, gender, status)
  return request({
    url: '/activity/update',
    method: 'post',
    data: {
      articleId,
      activityCount,
      userLevel,
      enrollStartDate,
      enrollEndDate,
      startDate,
      endDate,
      gender,
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
