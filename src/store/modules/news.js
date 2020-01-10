import { getNewsByParam, addNews, editNews, delNews, getNewsById, uploadImg } from '@/api/news'
import store from '@/store'
const power = {
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
        addNews(Info.title, store.getters.nickname, Info.content, Info.status).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 修改文章信息
    editNews({ commit }, Info) {
      return new Promise((resolve, reject) => {
        editNews(parseInt(Info.id), Info.title, store.getters.nickname, Info.content, Info.status).then(response => {
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
export default power
