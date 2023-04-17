/* 
所有路由配置的数组
*/
// import Home from '@/pages/Home'
// import Search from '@/pages/Search'
const Search = () => import('@/pages/Search')

import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'

import Trade from '@/pages/Trade'
import Pay from '@/pages/Pay'
import PaySuccess from '@/pages/PaySuccess'
import Center from '@/pages/Center'
import MyOrder from '@/pages/Center/myOrder'
import GroupBuy from '@/pages/Center/groupOrder'


import Register from '@/pages/Register'
import Login from '@/pages/Login'
import store from '@/store'
import router from '@/router'

/* 
component: () => import('@/pages/Search')
1. import(modulePath): 动态import引入模块, 被引入的模块会被单独打包
2. 组件配置的是一个函数, 函数中通过import动态加载模块并返回, 
    初始时函数不会执行, 第一次访问对应的路由才会执行, 也就是说只有一次请求对应的路由路径才会请求加载单独打包的js
作用: 用于提高首屏的加载速度
*/

export default [
  {
    path: '/',
    component: () => import('@/pages/Home')
  },
  {
    path:'/home',
    component: () => import('@/pages/Home')
  },
  {
    name: 'search',  // 是当前路由的标识名称
    path: '/search/:keyword?',
    component: Search,
    // 将params参数和query参数映射成属性传入路由组件
    props: route => ({keyword3: route.params.keyword, keyword4: route.query.keyword2})
  },
  {
    name: 'detail',  // 是当前路由的标识名称
    path: '/detail/:skuId',
    component: Detail,
  },
  {
    path: '/addcartsuccess',
    name:'addcartsuccess',
    component: AddCartSuccess,

    
    // beforeEnter (to, from, next) {
    //   // 得到当前路由信息对象
    //   // const route = router.currentRoute  // route就是from

    //   // 得到要跳转到目路由的query参数
    //   const skuNum = to.query.skuNum
    //   // 读取保存的数据
    //   const skuInfo = JSON.parse(window.sessionStorage.getItem('SKU_INFO_KEY'))
    //   console.log('---', skuNum, skuInfo)
    //   // 只有都存在, 才放行
    //   if (skuNum && skuInfo) {
    //     next()
    //   } else { // 在组件对象创建前强制跳转到首页
    //     next('/')
    //   }
    // }
  },
  {
    path: '/shopcart',
    component: ShopCart,
  },

  {
    path: '/trade',
    component: Trade,
    /* 只能从购物车界面, 才能跳转到交易界面 */
    beforeEnter (to, from, next) {
      if (from.path==='/shopcart') {
        next()
      } else {
        // next('/shopcart')
        // 从哪来回哪去
        next(false)
      }
    }
  },
  {
    path: '/pay',
    component: Pay,

    // 将query参数映射成props传递给路由组件
    props: route => ({orderId: route.query.orderId}),

    /* 只能从交易界面, 才能跳转到支付界面 */
    
    beforeEnter (to, from, next) {
      if (from.path==='/trade') {
        next()
      } else {
        next('/trade')
      }
    }
  },
  
  {
    path: '/paysuccess',
    component: PaySuccess,
    /* 只有从支付界面, 才能跳转到支付成功的界面 */
    beforeEnter (to, from, next) {
      if (from.path==='/pay') {
        next()
      } else {
        next('/pay')
      }
    }
  },
  {
    path: '/center',
    component: Center,
    children: [
      {
        // path: '/center/myorder',
        path: 'myorder',
        component: MyOrder,
      },
      {
        path: 'groupbuy',
        component: GroupBuy,
      },

      {
        path: '',
        redirect: 'myorder'
      }
    ]
  },

  {
    path: '/register',
    component: Register,
    meta: {
      isHideFooter: true
    }
  },
  {
    path: '/login',
    component: Login,
    meta: {
      isHideFooter: true
    },
/* 
    beforeEnter: (to, from, next) => { // 路由前置守卫
      // 如果还没有登陆, 放行
      if (!store.state.user.userInfo.token) {
        next()
      } else {
        // 如果已经登陆, 跳转到首页
        next('/')
      }
    } */
  },

  {
    path: '/communication',
    component: () => import('@/pages/Communication/Communication'),
    children: [
      {
        path: 'event',
        component: () => import('@/pages/Communication/EventTest/EventTest'),
        meta: {
          isHideFooter: true
        },
      },
      {
        path: 'model',
        component: () => import('@/pages/Communication/ModelTest/ModelTest'),
        meta: {
          isHideFooter: true
        },
      },
      {
        path: 'sync',
        component: () => import('@/pages/Communication/SyncTest/SyncTest'),
        meta: {
          isHideFooter: true
        },
      },
      {
        path: 'attrs-listeners',
        component: () => import('@/pages/Communication/AttrsListenersTest/AttrsListenersTest'),
        meta: {
          isHideFooter: true
        },
      },
      {
        path: 'children-parent',
        component: () => import('@/pages/Communication/ChildrenParentTest/ChildrenParentTest'),
        meta: {
          isHideFooter: true
        },
      },
      {
        path: 'scope-slot',
        component: () => import('@/pages/Communication/ScopeSlotTest/ScopeSlotTest'),
        meta: {
          isHideFooter: true
        },
      }
    ],
  },
]