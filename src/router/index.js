import {createRouter,createWebHashHistory} from 'vue-router'
import Index from '@/views/Index.vue'
import AddGood from '@/views/AddGood.vue'
import Login from '@/views/Login.vue'
import Swiper  from '@/views/Swiper.vue'


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