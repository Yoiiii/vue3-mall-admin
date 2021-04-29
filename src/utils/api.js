 import axios from './axios'

 export function login(data){
  return axios.post('/adminUser/login',data)
 }

 export function logout(){
   return axios.delete('/logout')
 }

 export function getUserInfo(){
   return axios.get('/adminUser/profile')
 }