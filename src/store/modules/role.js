import { getRoleByParam, addRole, editRole, delRole } from '@/api/role'
const role = {
  actions: {
    // 获取角色信息 byParam
    getRoleByParam({ commit }, searchInfo) {
      for (var x in searchInfo) {
        if (searchInfo[x] === '') {
          delete searchInfo[x]
        }
      }
      return new Promise((resolve, reject) => {
        getRoleByParam(searchInfo).then(response => {
          console.log('role')
          console.log(response)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 新增角色
    addRole({ commit }, roleInfo) {
      return new Promise((resolve, reject) => {
        addRole(roleInfo.roleName, roleInfo.descript).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 修改角色信息
    editRole({ commit }, roleInfo) {
      return new Promise((resolve, reject) => {
        editRole(parseInt(roleInfo.roleId), roleInfo.roleName, roleInfo.descript).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 删除角色id
    delRole({ commit }, id) {
      return new Promise((resolve, reject) => {
        delRole(id).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}
export default role
