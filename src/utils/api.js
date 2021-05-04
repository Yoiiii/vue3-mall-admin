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

 export function getCarousels(currentPage,pageSize){
   return axios.get('/carousels',{
     params:{
       pageNumber:currentPage,
       pageSize:pageSize
     }
   })
 }

 export function getCarouselsDetail(id){
   return axios.get(`/carousels/${id}`)
 }

 export function addCarousels(carouselUrl,redirectUrl,carouselRank){
   return axios.post('/carousels',{
     carouselUrl,
     redirectUrl,
     carouselRank
   })
 }
 
 export function editCarousels(carouselId,carouselUrl,redirectUrl,carouselRank){
   return axios.put('/carousels',{
     carouselId,
     carouselUrl,
     redirectUrl,
     carouselRank
   })
 }