import { getPowerByParam, addPower, editPower, delPower } from '@/api/power'
const power = {
  actions: {
    // 获取权限信息 byParam
    getPowerByParam({ commit }, searchInfo) {
      for (var x in searchInfo) {
        if (searchInfo[x] === '') {
          delete searchInfo[x]
        }
      }
      return new Promise((resolve, reject) => {
        getPowerByParam(searchInfo).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 新增权限
    addPower({ commit }, Info) {
      return new Promise((resolve, reject) => {
        addPower(Info.powerName, Info.elevel, Info.parentId, Info.operate, Info.url, Info.descript).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 修改权限信息
    editPower({ commit }, Info) {
      return new Promise((resolve, reject) => {
        editPower(parseInt(Info.powerId), Info.powerName, Info.elevel, Info.parentId, Info.operate, Info.url, Info.descript).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 删除权限id
    delPower({ commit }, id) {
      return new Promise((resolve, reject) => {
        delPower(id).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}
export default power
