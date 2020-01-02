import { login, logout, getInfo } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { addUser, editUser, delUser, updateStatus, getByParam, updateUserType, updatePwd } from '@/api/user'

const user = {
  state: {
    token: getToken(),
    uid: '',
    nickname: '',
    fullname: '',
    loginpass: '',
    avatar: '',
    roles: []
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
      sessionStorage.setItem('token', token)
    },
    SET_UID: (state, uid) => {
      state.uid = uid
      sessionStorage.setItem('uid', uid)
    },
    SET_USERNO: (state, userno) => {
      state.userno = userno
    },
    SET_NICKNAME: (state, nickname) => {
      state.nickname = nickname
    },
    SET_FULLNAME: (state, fullname) => {
      state.fullname = fullname
    },
    SET_LOGINPASS: (state, loginpass) => {
      state.loginpass = loginpass
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_PHONE: (state, phone) => {
      state.phone = phone
    },
    SET_INTRO: (state, introduction) => {
      state.introduction = introduction
    },
    SET_BIRTHDAY: (state, birthday) => {
      state.birthday = birthday
    },
    SET_GENDER: (state, gender) => {
      state.gender = gender
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        login(userInfo.username, userInfo.password).then(response => {
          const data = response.result
          setToken(data.access_token)
          commit('SET_TOKEN', data.access_token)
          commit('SET_UID', data.secret_id)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo({ commit }, uid) {
      return new Promise((resolve, reject) => {
        getInfo(parseInt(uid)).then(response => {
          const data = response.result
          commit('SET_UID', data.id)
          commit('SET_NICKNAME', data.nickName)
          commit('SET_FULLNAME', data.fullName)
          commit('SET_ROLES', data.roleDTO.roleName)
          commit('SET_USERNO', data.userNo)
          commit('SET_AVATAR', data.avatar)
          commit('SET_PHONE', data.phone)
          commit('SET_INTRO', data.introduction)
          commit('SET_BIRTHDAY', data.birthday)
          commit('SET_GENDER', data.gender)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息 byParam
    getByParam({ commit }, searchInfo) {
      for (var x in searchInfo) {
        if (searchInfo[x] === '') {
          delete searchInfo[x]
        }
      }
      return new Promise((resolve, reject) => {
        getByParam(searchInfo).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 新增用户
    addUser({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        addUser(userInfo.userNo, userInfo.nickName, userInfo.loginPass, userInfo.fullName, userInfo.phone, userInfo.introduction, userInfo.birthday, parseInt(userInfo.gender)).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 修改用户信息
    editUser({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        editUser(userInfo.id, userInfo.userNo, userInfo.nickName, userInfo.fullName, userInfo.phone, userInfo.introduction, userInfo.birthday, parseInt(userInfo.gender)).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 删除用户id
    delUser({ commit }, id) {
      return new Promise((resolve, reject) => {
        delUser(id).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 根据用户ID修改账号状态
    updateStatus({ commit }, row) {
      return new Promise((resolve, reject) => {
        updateStatus(parseInt(row.id), parseInt(row.status) === 2 ? 0 : 1).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 根据用户ID修改用户类型
    updateUserType({ commit }, row) {
      return new Promise((resolve, reject) => {
        updateUserType(parseInt(row.id), parseInt(row.userType)).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 根据用户ID修改密码
    updatePwd({ commit }, row) {
      return new Promise((resolve, reject) => {
        updatePwd(parseInt(row.id), row.oldPwd, row.newPwd).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        sessionStorage.removeItem('token')
        removeToken()
        resolve()
      })
    }
  }
}

export default user
