import config from '~/config'
//获取本地储存
export function localGet(key){
  const value = window.localStorage.getItem(key)
  try {
    return JSON.parse(window.localStorage.getItem(key))
  }catch(error){
    return value
  }
}

//设置本地储存
export function localSet(key,value){
  console.log(key,value);
  window.localStorage.setItem(key,JSON.stringify(value))
}

//移除本地储存
export function localRemove(key){
  window.localStorage.removeItem(key)
}

// 单张图片上传
export const uploadImgServer = config[import.meta.env.MODE].uploadImgServer
export const uploadImgsServer = config[import.meta.env.MODE].uploadImgServer+'s'