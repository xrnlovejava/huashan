import { uploadHeaderImage, uploadBannerImage } from '@/api/upload'
const upload = {
  actions: {
    // 上传头图
    uploadHeaderImage({ commit }, formdata) {
      return new Promise((resolve, reject) => {
        uploadHeaderImage(formdata).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 上传文章顶部大图
    uploadBannerImage({ commit }, formdata) {
      return new Promise((resolve, reject) => {
        uploadBannerImage(formdata).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}
export default upload
