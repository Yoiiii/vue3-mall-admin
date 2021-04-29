import { createStore } from 'vuex'

const files = import.meta.globEager("./modules/*.js")
let modules = {};
for (const key in files) {
    modules[key.replace(/\.\/|\.js/g, '').split('/')[1]] = files[key].default
}
// 导入所有 vuex 模块，自动加入namespaced:true，用于解决vuex命名冲突
Object.keys(modules).forEach(key => {
    modules[key]['namespaced'] = true
})
export const store = createStore({
    modules
})