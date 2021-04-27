import { createStore } from 'vuex'

const files = import.meta.globEager("./modules/*.js")
// console.log(JSON.stringify(files));
 let modules = {};

for (const key in files) {
  console.log(files,key,files[key]);
  // files[key]().then((mod) => {
    modules[key.replace(/\.\/|\.js/g, '')] = files[key].default
  // })
}
// files.forEach((key) => {
//   console.log(key);
//     
// })
// // 导入所有 vuex 模块，自动加入namespaced:true，用于解决vuex命名冲突
Object.keys(modules).forEach(key => {
    modules[key]['namespaced'] = true
})
console.log(modules);


// const modules = import.meta.glob('./modules/*.js')

export const store =   createStore({
    modules
})