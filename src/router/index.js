import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in subMenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if false, the item will hidden in breadcrumb(default is true)
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '控制台', icon: 'example' }
    }]
  }

  // {
  //   path: '/example',
  //   component: Layout,
  //   redirect: '/example/table',
  //   name: 'Example',
  //   meta: { title: 'Example', icon: 'example' },
  //   children: [
  //     {
  //       path: 'table',
  //       name: 'Table',
  //       component: () => import('@/views/table/index'),
  //       meta: { title: 'Table', icon: 'table' }
  //     },
  //     {
  //       path: 'tree',
  //       name: 'Tree',
  //       component: () => import('@/views/tree/index'),
  //       meta: { title: 'Tree', icon: 'tree' }
  //     }
  //   ]
  // },

  // {
  //   path: '/form',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'Form',
  //       component: () => import('@/views/form/index'),
  //       meta: { title: 'Form', icon: 'form' }
  //     }
  //   ]
  // },

  // {
  //   path: '/nested',
  //   component: Layout,
  //   redirect: '/nested/menu1',
  //   name: 'Nested',
  //   meta: {
  //     title: 'Nested',
  //     icon: 'nested'
  //   },
  //   children: [
  //     {
  //       path: 'menu1',
  //       component: () => import('@/views/nested/menu1/index'), // Parent router-view
  //       name: 'Menu1',
  //       meta: { title: 'Menu1' },
  //       children: [
  //         {
  //           path: 'menu1-1',
  //           component: () => import('@/views/nested/menu1/menu1-1'),
  //           name: 'Menu1-1',
  //           meta: { title: 'Menu1-1' }
  //         },
  //         {
  //           path: 'menu1-2',
  //           component: () => import('@/views/nested/menu1/menu1-2'),
  //           name: 'Menu1-2',
  //           meta: { title: 'Menu1-2' },
  //           children: [
  //             {
  //               path: 'menu1-2-1',
  //               component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
  //               name: 'Menu1-2-1',
  //               meta: { title: 'Menu1-2-1' }
  //             },
  //             {
  //               path: 'menu1-2-2',
  //               component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
  //               name: 'Menu1-2-2',
  //               meta: { title: 'Menu1-2-2' }
  //             }
  //           ]
  //         },
  //         {
  //           path: 'menu1-3',
  //           component: () => import('@/views/nested/menu1/menu1-3'),
  //           name: 'Menu1-3',
  //           meta: { title: 'Menu1-3' }
  //         }
  //       ]
  //     },
  //     {
  //       path: 'menu2',
  //       component: () => import('@/views/nested/menu2/index'),
  //       meta: { title: 'menu2' }
  //     }
  //   ]
  // },

  // {
  //   path: 'external-link',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
  //       meta: { title: 'External Link', icon: 'link' }
  //     }
  //   ]
  // }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  {
    path: '/users',
    component: Layout,
    meta: {
      title: '用户管理',
      icon: 'user'
    },
    children: [
      {
        path: 'userlist',
        name: '用户列表',
        component: () => import('@/views/users/userlist'),
        meta: { title: '用户列表', icon: 'user' }
      },
      {
        path: 'adduser',
        name: '新增用户',
        hidden: true,
        component: () => import('@/views/users/adduser'),
        meta: { title: '新增用户', icon: 'user', role: ['超级管理员', '管理员'] }
      },
      {
        path: 'edituser',
        name: '修改信息',
        component: () => import('@/views/users/edituser'),
        meta: { title: '修改个人信息', icon: 'user' }
      },
      {
        path: 'editpass',
        name: '修改密码',
        component: () => import('@/views/users/editpass'),
        meta: { title: '修改密码', icon: 'user' }
      }
    ]
  },
  {
    path: '/roles',
    component: Layout,
    meta: {
      title: '角色管理',
      icon: 'user'
    },
    children: [
      {
        path: 'rolelist',
        name: '角色管理',
        component: () => import('@/views/roles/roleslist'),
        meta: { title: '角色管理', icon: 'user' }
      }
    ]
  },
  {
    path: '/power',
    component: Layout,
    meta: {
      title: '权限管理',
      icon: 'user'
    },
    children: [
      {
        path: 'powerlist',
        name: '权限管理',
        component: () => import('@/views/power/powerlist'),
        meta: { title: '权限管理', icon: 'user' }
      }
    ]
  },
  {
    path: '/news',
    component: Layout,
    meta: {
      title: '文章管理',
      icon: 'form'
    },
    children: [
      {
        path: 'newslist',
        name: '文章列表',
        component: () => import('@/views/news/newslist'),
        meta: { title: '文章列表', icon: 'form' }
      },
      {
        path: 'addnews',
        name: '新增文章',
        component: () => import('@/views/news/addnews'),
        meta: { title: '新增文章', icon: 'form' }
      },
      {
        path: 'editnews/:newsId',
        name: '编辑文章',
        hidden: true,
        component: () => import('@/views/news/editnews'),
        meta: { title: '编辑文章', icon: 'form' }
      }
    ]
  },
  {
    path: '/activity',
    component: Layout,
    meta: {
      title: '活动管理',
      icon: 'form'
    },
    children: [
      {
        path: 'list',
        name: '活动管理',
        component: () => import('@/views/activity/list'),
        meta: { title: '活动管理', icon: 'form' }
      }
    ]
  },
  {
    path: '/aec',
    component: Layout,
    meta: {
      title: '报名管理',
      icon: 'form'
    },
    children: [
      {
        path: 'list',
        name: '报名管理',
        component: () => import('@/views/aec/list'),
        meta: { title: '报名管理', icon: 'form' }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]
