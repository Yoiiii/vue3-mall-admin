 import axios from './axios'

 export function login(data){
  axios.post('/adminUser/login',data).then(res=>{
    console.log(res);
    return res
  })
 }