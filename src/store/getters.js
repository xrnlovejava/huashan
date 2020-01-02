const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  roles: state => state.user.roles,
  uid: state => state.user.uid,
  userno: state => state.user.userno,
  nickname: state => state.user.nickname,
  fullname: state => state.user.fullname,
  loginpass: state => state.user.loginpass,
  addRouters: state => state.permission.addRouters,
  phone: state => state.user.phone,
  introduction: state => state.user.introduction,
  birthday: state => state.user.birthday,
  gender: state => state.user.gender
}
export default getters
