import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import user from './modules/user'
import role from './modules/role'
import power from './modules/power'
import news from './modules/news'
import activity from './modules/activity'
import aec from './modules/aec'
import upload from './modules/upload'
import permission from './modules/permission'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    user,
    permission,
    role,
    power,
    news,
    activity,
    aec,
    upload
  },
  getters
})

export default store
