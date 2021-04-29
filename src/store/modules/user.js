import { login,logout,getUserInfo} from '@/utils/api.js'
import {localSet,localRemove} from '@/utils/index.js'

let state = {
  username: 'admin',
  total: 0,
  userInfo:{
      name:111,
      lasdf:222
  },
  accessToken: 'admin',
  avatar: '随意设置',
  rolename: '随意设置',
  userList: [{ name: 'admin', age: 29 }]
},
getters = {
 accessToken: state => state.accessToken,
 userInfo:state => state.userInfo,
  username: state => state.username,
  rolename: state => state.rolename,
  avatar: state => state.avatar,
  userList: state => state.userList,
  total: state => state.total
},
mutations = {
  setAccessToken (state, accessToken) {// 设置accessToken
       state.accessToken = accessToken
   },
   setUserInfo(state,userInfo){
       state.userInfo=userInfo
   },
   setUsername (state, username) {// 设置用户名
       state.username = username
   },
   setRolename (state, rolename) {// 设置权限名
       state.rolename = rolename
   },
   setAvatar (state, avatar) {// 设置头像
       state.avatar = avatar
   },
   setUserList (state, list) {// 设置用户列表
       state.userList = list
   },
   setTotal (state, total) {
       state.total = total
   }
},
actions = {
   async login({commit},userInfo){
     const res = await login(userInfo)
     localSet('token',res)
     commit('setAccessToken',res)
     return res
  },
  async getUserInfo({commit}){
    const res = await getUserInfo()
    commit('setUserInfo',res)
  },
  async logout({commit}){
    await logout()
    localRemove('token')
    commit('setAccessToken','')
  },
  testActions ({ commit }, num) {
      setTimeout(() => {
          commit('setTotal', num)
          console.log(num)
      }, 2000)
  }
};
export default { state, getters, mutations, actions }
