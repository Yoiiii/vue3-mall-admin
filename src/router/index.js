import {createRouter,createWebHashHistory} from 'vue-router'
import Index from '@/views/Index.vue'
import AddGood from '@/views/AddGood.vue'
import Login from '@/views/Login.vue'
import Swiper  from '@/views/Swiper.vue'
import IndexConfig from '@/views/IndexConfig.vue'


const router =createRouter({
  history:createWebHashHistory(),
  routes:[
    {
      path:'/',
      name:'index',
      meta:{
        title:"首页"
      },
      component:Index
    },
    {
      path:'/add',
      name:'add',
      meta:{
        title:"添加商品"
      },
      component:AddGood
    },
    {
      path:'/swiper',
      name:'swiper',
      meta:{
        title:"首页轮播图"
      },
      component:Swiper
    },
    {
      path:'/hot',
      name:'hot',
      meta:{
        title:"热销商品"
      },
      component:IndexConfig
    },
    {
      path:'/new',
      name:'new',
      meta:{
        title:"新品上线"
      },
      component:IndexConfig
    },
    {
      path:'/recommend',
      name:'recommend',
      meta:{
        title:"为你推荐"
      },
      component:IndexConfig
    },
    {
      path:'/login',
      name:'login',
      meta:{
        title:"登录",
        showMenu:false
      },
      component:Login
    }
  ]
})

export default router