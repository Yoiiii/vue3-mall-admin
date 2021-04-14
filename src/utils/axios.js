import axios from 'axios'
import router from '@/router/index'
import config from '~/config'
import {ElMessage} from 'element-plus'
import {localGet} from './index'

axios.defaults.baseURL=config[import.meta.env.MODE].baseURL
// 携带 cookie
axios.defaults.withCredentials= true
// 请求头，headers 信息
axios.defaults.headers["X-Requested-With"] = 'XMLHttpRequest'
axios.defaults.headers['token']=localGet('token')||''
// 默认 post 请求，使用 application/json 形式
axios.defaults.headers.post['Content-Type']='application/json'

//请求拦截器
axios.interceptors.response.use(res=>{
  if(typeof res.data!=='object'){
    ElMessage.error("服务端异常！");
    return Promise.reject(res)
  }
  if(res.data.resultCode != 200){
    if(res.data.message) ElMessage.error(res.data.message);
    if(res.data.resultCode==419){
      router.push({path:'/login'})
    }
    return Promise.reject(res.data)
  }
  return res.data.data
})

export default axios