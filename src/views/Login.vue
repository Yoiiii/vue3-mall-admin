<template>
  <div class="login-body">
    <div class="login-container">
      <div class="head">
        <img class="logo" src="https://s.weituibao.com/1582958061265/mlogo.png" alt="">
        <div class="name">
          <div class="title">Yoi商城</div>
          <div class="tips">Vue3.0 后台管理系统</div>
        </div>
      </div>
      <el-form 
        label-position="top" 
        :rules="rules" 
        class="login-form"
        :model="ruleForm"
        ref="loginForm"
      >
        <el-form-item label="账号" prop="username">
          <el-input type="text" v-model.trim="ruleForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model.trim="ruleForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <div style="color:#333">登录表示您已同意<a>《服务条款》</a></div>
          <el-button style="width: 100%" type="primary" @click="submitForm">立即登录</el-button>
          <el-checkbox v-model="checked" @change="!checked">下次自动登录</el-checkbox>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import md5 from 'js-md5'
import {reactive,ref,toRefs,computed} from 'vue';
import {useStore} from 'vuex'
import {localSet} from '@/utils'
import {login} from '@/utils/api';
export default {
  name:'Login',
  setup(){
    const loginForm =ref(null)
    let store = useStore()
    const state = reactive({
      ruleForm:{
        username:store.getters['user/username'],
        password:'123456'
      },
      checked:true,
      rules:{
        username:[
          {required:'true',message:'账户不能为空',trigger:'blur'}
        ],
        password:[
          {required:'true',message:'密码不能为空',trigger:'blur'}
        ]
      },
    })
    //提交方法
    const submitForm = async()=>{
      loginForm.value.validate( valid=>{
        if(valid){
          store.dispatch('user/login',{
            userName:state.ruleForm.username || '',
            passwordMd5:md5(state.ruleForm.password),
          }).then(res=>{
            window.location.href = '/'
          })
        }else{
          return false
        }
      })
    }
    //重置方法
    const resetForm = ()=>{
      loginForm.value.resetFields()
    }
    return {
      ...toRefs(state),
      loginForm,
      submitForm,
      resetForm
    }
  }
}
</script>

<style scoped>
.login-body {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: #fff;
}
.login-container {
  width: 420px;
  height: 500px;
  background-color: #fff;
  box-shadow: 0px 21px 41px 0px rgba(0, 0, 0,0.2);
}
.head {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 0 0 0;
}
.head img {
  width: 100px;
  height: 100px;
  margin-right: 20px;
}
.head .title {
  font-size: 12px;
  color:#999;
}
.login-form {
  width: 70%;
  margin: 0 auto;
}
.login-form >>> .el-form--label-top .el-form-item__label {
  padding: 0px;
}
.login-form >>> .el-form-item {
  margin-bottom: 10px;
}
</style>