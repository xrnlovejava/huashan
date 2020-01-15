import { getActivityByParam, getActivityById, addActivity, editActivity, delActivity } from '@/api/activity'
const activity = {
  actions: {
    // 获取活动信息 byParam
    getActivityByParam({ commit }, searchInfo) {
      for (var x in searchInfo) {
        if (searchInfo[x] === '') {
          delete searchInfo[x]
        }
      }
      return new Promise((resolve, reject) => {
        getActivityByParam(searchInfo).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 新增活动
    addActivity({ commit }, Info) {
      return new Promise((resolve, reject) => {
        addActivity(parseInt(Info.articleId), Info.activityCount, Info.userLevel, Info.enrollStartDate, Info.enrollEndDate, Info.startDate, Info.endDate, Info.gender, Info.status, Info.articleMappingPo).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 修改活动信息
    editActivity({ commit }, Info) {
      return new Promise((resolve, reject) => {
        editActivity(Info.id, parseInt(Info.articleId), Info.activityCount, Info.userLevel, Info.enrollStartDate, Info.enrollEndDate, Info.startDate, Info.endDate, Info.gender, Info.status, Info.articleMappingPo).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 删除活动
    delActivity({ commit }, id) {
      return new Promise((resolve, reject) => {
        delActivity(id).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 通过id获取活动信息
    getActivityById({ commit }, id) {
      return new Promise((resolve, reject) => {
        getActivityById(id).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}
export default activity
