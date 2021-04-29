<template>
  <div class="header">
    <div class="left">
      <span style="font-size: 20px">{{name}}</span>
    </div>
    <div class="right">
      <el-popover
        placement="bottom"
        :width="320"
        trigger="click"
        popper-class="popper-user-box"
      >
        <template #reference>
          <div class="author">
            <i class="icon el-icon-s-custom" />
            {{userInfo && userInfo.nickNmae || ''}}
            <i class="el-icon-caret-bottom" />
          </div>
        </template>
        <div class="nickname">
          <p>登录名:{{userInfo && userInfo.loginUserName || ''}}</p>
          <p>昵称:{{userInfo && userInfo.nickName || ''}}</p>
          <el-tag class="logout" size="small" effect="dark" @click="logout">登出</el-tag>
        </div>
      </el-popover>
    </div>
  </div>
</template>

<script>
import {onMounted,reactive,toRefs,computed} from 'vue'
import {useStore} from 'vuex'
import {useRouter} from 'vue-router'
import { toRaw } from '@vue/reactivity'
export default {
  name:"Header",
  setup(){
    //获取路由实例
    const router = useRouter()
    computed(()=>{

    })
    const store = useStore()
    const state =reactive({
      name:'dashboard',
      userInfo:null
    })
    
    onMounted(()=>{
      const pathname = window.location.hash.split('/')[1]||''
      if(!['login'].includes(pathname)){
        store.dispatch('user/getUserInfo').then(()=>{
          state.userInfo=toRaw(store.getters['user/userInfo'])
        })
      }

    })
    //登出
    const logout = ()=>{
      store.dispatch('user/logout')
      router.push({path:'/login'})
    }
    router.afterEach((to)=>{
      state.name = to.meta.title
    })
    return {
      ...toRefs(state),
      logout
    }
  }
}
</script>

<style scoped>
.header {
  height: 50px;
  line-height: 50px;
  border-bottom: 1px solid #e9e9e9;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
}
.right > div > .icon{
  font-size:18px;
  margin-right:6px;
}
.author {
  margin-left:10px;
  cursor: pointer;
}
</style>

<style>
  .popper-user-box {
    background: url('https://s.yezgea02.com/lingling-h5/static/account-banner-bg.png') 50% 50% no-repeat!important;
    background-size: cover!important;
    border-radius: 0!important;
  }
   .popper-user-box .nickname {
    position: relative;
    color: #ffffff;
  }
  .popper-user-box .nickname .logout {
    position: absolute;
    right: 0;
    top: 0;
    cursor: pointer;
  }
</style>