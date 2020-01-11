import { getAecByParam, getAecById, addAec, editAec, delAec } from '@/api/aec'
import store from '@/store'

const aec = {
  actions: {
    // 获取报名信息 byParam
    getAecByParam({ commit }, searchInfo) {
      for (var x in searchInfo) {
        if (searchInfo[x] === '') {
          delete searchInfo[x]
        }
      }
      return new Promise((resolve, reject) => {
        getAecByParam(searchInfo).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 新增报名
    addAec({ commit }, Info) {
      return new Promise((resolve, reject) => {
        addAec(Info.title, store.getters.nickname, Info.content, Info.status).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 修改报名信息
    editAec({ commit }, Info) {
      return new Promise((resolve, reject) => {
        editAec(parseInt(Info.id), Info.title, store.getters.nickname, Info.content, Info.status).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 删除报名
    delAec({ commit }, id) {
      return new Promise((resolve, reject) => {
        delAec(id).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 通过id获取活动信息
    getAecById({ commit }, id) {
      return new Promise((resolve, reject) => {
        getAecById(id).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}
export default aec
