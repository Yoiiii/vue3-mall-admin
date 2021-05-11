import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router/index.js'
import {store} from '@/store/index.js'
import 
  { 
    ElButton,
    ElContainer,
    ElAside,
    ElMenu,
    ElSubmenu,
    ElMenuItemGroup,
    ElMenuItem,
    ElForm,
    ElFormItem,
    ElInput,
    ElCheckbox,
    ElPopover,
    ElTag,
    ElCard,
    ElTable,
    ElUpload,
    ElDialog,
    ElPagination,
    ElTableColumn,
    ElPopconfirm,
    ElCascader,
    ElRadioGroup,
    ElRadio,
    ElSelect,
    ElOption
  } from 'element-plus'

//主题引入
import '~/theme/index.css'
import { routeLocationKey } from 'vue-router'
import config from '~/config'
const app = createApp(App)

app.use(router)
app.use(store)

//element组件引入
app.use(ElButton)
app.use(ElContainer)
app.use(ElAside)
app.use(ElMenu)
app.use(ElSubmenu)
app.use(ElMenuItemGroup)
app.use(ElMenuItem)
app.use(ElForm)
app.use(ElFormItem)
app.use(ElInput)
app.use(ElCheckbox)
app.use(ElPopover)
app.use(ElTag)
app.use(ElCard)
app.use(ElTable)
app.use(ElUpload)
app.use(ElDialog)
app.use(ElPagination)
app.use(ElTableColumn)
app.use(ElPopconfirm)
app.use(ElCascader)
app.use(ElRadioGroup)
app.use(ElRadio)
app.use(ElSelect)
app.use(ElOption)


const orderStatus={
  0:'待支付',
  1:'已支付',
  2:'配货完成',
  3:'出库成功',
  4:'交易成功',
  '-1':'手动关闭',
  '-2':'超时关闭',
  '-3':'商家关闭'
}

app.config.globalProperties.$filters={
  prefix(url){
    if(url && url.startsWith('http')){
      return url
    }else{
      url=config[import.meta.env.MODE].baseUrl+url
      return url
    }
  },
  orderMap(status){
    return orderStatus[status] ||'未知状态'
  },
}

app.config.globalProperties.goTop =function(){
  const main = document.querySelector('.main')
  main.scrollTop=0
}





app.mount('#app')



