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

export function addActivity(articleId, activityCount, userLevel, enrollStartDate, enrollEndDate, startDate, endDate, gender, status, articleMappingPo) {
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
      status,
      articleMappingPo
    }
  })
}

export function editActivity(id, articleId, activityCount, userLevel, enrollStartDate, enrollEndDate, startDate, endDate, gender, status, articleMappingPo) {
  console.log(id, articleId, activityCount, userLevel, enrollStartDate, enrollEndDate, startDate, endDate, gender, status, articleMappingPo)
  return request({
    url: '/activity/update',
    method: 'post',
    data: {
      id,
      articleId,
      activityCount,
      userLevel,
      enrollStartDate,
      enrollEndDate,
      startDate,
      endDate,
      gender,
      status,
      articleMappingPo
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
