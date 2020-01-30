import request from '@/utils/request'

export function getActivityByParam(data) {
  return request({
    url: '/back/activity/byParam',
    method: 'post',
    data: data
  })
}

export function getActivityById(id) {
  return request({
    url: '/back/activity/byId',
    method: 'post',
    data: {
      id
    }
  })
}

export function addActivity(articleId, activityCount, userLevel, enrollStartDate, enrollEndDate, startDate, endDate, gender, status, articleMappingPo) {
  return request({
    url: '/back/activity/add',
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
    url: '/back/activity/update',
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
    url: '/back/activity/delete',
    method: 'post',
    data: {
      ids
    }
  })
}
