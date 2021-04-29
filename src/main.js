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
    ElPagination
  } from 'element-plus'

//主题引入
import '~/theme/index.css'

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


app.mount('#app')



