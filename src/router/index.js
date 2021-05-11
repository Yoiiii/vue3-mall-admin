import {createRouter,createWebHashHistory} from 'vue-router'
import Index from '@/views/Index.vue'
import AddGood from '@/views/AddGood.vue'
import Login from '@/views/Login.vue'
import Swiper  from '@/views/Swiper.vue'
import IndexConfig from '@/views/IndexConfig.vue'
import Category from '@/views/Category.vue'
import Good from '@/views/Good.vue'
import Order from '@/views/Order.vue'
import OrderDetail from '@/views/OrderDetail.vue'
import Guest from '@/views/Guest.vue'


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
      path:'/good',
      name:'good',
      meta:{
        title:'商品管理'
      },
      component:Good
    },
    {
      path:'/order',
      name:'order',
      meta:{
        title:'订单管理'
      },
      component:Order
    },
    {
      path:'/order_detail',
      name:'order_detail',
      meta:{
        title:'订单详情'
      },
      component:OrderDetail
    },
    {
      path:'/guest',
      name:'guest',
      meta:{
        title:'会员管理'
      },
      component:Guest
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
      path:'/category',
      name:'category',
      meta:{
        title:"分类管理"
      },
      component:Category,
      children:[
        {
          path:'/category/level2',
          name:'level2',
          component:Category,
          meta:{
            title:"分类二级管理"
          },
        },
        {
          path:'/category/level3',
          name:'level3',
          component:Category,
          meta:{
            title:"分类三级管理"
          },
        }
      ]
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