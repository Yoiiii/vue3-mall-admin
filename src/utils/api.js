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

 export function deleteCarousels(ids){
   return axios.delete('/carousels',{
     data:{
       ids
     }
   })
 }

 export function getIndexConfigs(pageNumber,pageSize,configType){
   return axios.get('/indexConfigs',{
     params:{
       pageNumber,
       pageSize,
       configType
     }
   })
 }

 export function getIndexConfigsDetail(id){
   return axios.get(`/indexConfigs/${id}`)
 }

 export function addIndexConfigs(configType,configName,redirectUrl,goodsId,configRank){
   return axios.post('/indexConfigs',{
    configType,
    configName,
    redirectUrl,
    goodsId,
    configRank
   })
 }

 export function editIndexConfigs(configId,configType,configName,redirectUrl,goodsId,configRank){
   return axios.put('/indexConfigs',{
    configId,
    configType,
    configName,
    redirectUrl,
    goodsId,
    configRank
   })
 }

 export function deleteIndexConfigs(ids){
   return axios.post('/indexConfigs/delete',{
     ids
   })
 }

 export function getCategories(pageNumber,pageSize,categoryLevel,parentId){
   return axios.get('/categories',{
     params:{
       pageNumber,
       pageSize,
       categoryLevel,
       parentId
     }
   })
 }

 export function getCategoriesDetail(id){
   return axios.get(`/categoryies/${id}`)
 }

 export function addCategories(categoryLevel,parentId,categoryName,categoryRank){
  return axios.post('/categories',{
    categoryLevel,
    parentId,
    categoryName,
    categoryRank
   })
 }

 export function editCategories(categoryId,categoryLevel,parentId,categoryName,categoryRank){
   return axios.put('/categories',{
    categoryId,
    categoryLevel,
    parentId,
    categoryName,
    categoryRank
   })
 }

 export function deleteCategories(ids){
   return axios.delete('/categories',{
     data:{
       ids
     }
   })
 }