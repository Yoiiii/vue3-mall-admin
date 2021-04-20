 import axios from './axios'

 export function login(data){
  axios.post('api/adminUser/login',data).then(res=>{
    return res.data
  })
 }