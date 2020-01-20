import { getNewsByParam, addNews, editNews, delNews, getNewsById, uploadImg, updateStatus } from '@/api/news'
const news = {
  actions: {
    // 获取文章信息 byParam
    getNewsByParam({ commit }, searchInfo) {
      for (var x in searchInfo) {
        if (searchInfo[x] === '') {
          delete searchInfo[x]
        }
      }
      return new Promise((resolve, reject) => {
        getNewsByParam(searchInfo).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 新增文章
    addNews({ commit }, Info) {
      return new Promise((resolve, reject) => {
        addNews(Info).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 修改文章信息
    editNews({ commit }, Info) {
      return new Promise((resolve, reject) => {
        editNews(Info).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 根据主键ID修改文章状态
    updateStatus({ commit }, Info) {
      return new Promise((resolve, reject) => {
        updateStatus(Info).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 删除文章
    delNews({ commit }, id) {
      return new Promise((resolve, reject) => {
        delNews(id).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 通过id获取文章信息
    getNewsById({ commit }, id) {
      return new Promise((resolve, reject) => {
        getNewsById(id).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 上传图片
    uploadImg({ commit }, formdata) {
      return new Promise((resolve, reject) => {
        uploadImg(formdata).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}
export default news
