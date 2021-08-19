import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

/* Layout */
import Layout from "@/layout";

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: "/login",
    component: () => import("@/views/login/index"),
    hidden: true
  },
  {
    path: "/404",
    component: () => import("@/views/error-page/404"),
    hidden: true
  },
  {
    path: "/403",
    component: () => import("@/views/error-page/403"),
    hidden: true
  },
  {
    path: "/500",
    component: () => import("@/views/error-page/500"),
    hidden: true
  },
  {
    path: "/profile",
    component: Layout,
    redirect: "/profile/index",
    hidden: true,
    children: [
      {
        path: "index",
        component: () => import("@/views/profile/index"),
        name: "Profile",
        meta: { title: "个人中心", icon: "user", noCache: true }
      }
    ]
  },
  {
    path: "/bindDingding",
    component: Layout,
    redirect: "/bindDingding/index",
    hidden: true,
    children: [
      {
        path: "index",
        component: () => import("@/views/bindDingding/index"),
        name: "BindDingding",
        meta: { title: "绑定钉钉", icon: "user" }
      }
    ]
  },

];
export const asyncRoutes = [
  //首页
  {
    path: "/",
    component: Layout,
    redirect: "/dashboard",
    access: 'mediate_index',
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        component: () => import("@/views/dashboard/index"),
        meta: { title: "首页", icon: "el-icon-s-home" }
      }
    ]
  },
  //我的工作台
  {
    path: "/desk",
    component: Layout,
    redirect: "/desk",
    access: 'mediate_wb',
    name: "desk",
    meta: {
      title: "调解工作台",
      icon: "el-icon-edit-outline",
    },
    children: [
      {
        path: "mediatecese",
        access: 'mediate_all_case',
        component: () => import("@/views/desk/mediatecese/index"),
        name: "mediatecese",
        meta: { title: "调解中心案件" }
      },
      {
        path: "mymediate",
        access: 'mediate_my_case',
        component: () => import("@/views/desk/mymediate/index"),
        name: "mymediate",
        meta: { title: "我的调解案件" }
      },
      {
        path: "mediatedetail/:caseUserId(\\d+)/:id(\\d+)/:creditorsId(\\d+)/:mediateStatus(\\d+)",
        component: () => import("@/views/desk/mediatedetail/index"),
        hidden:true,
        name: "mediatedetail",
        meta: { title: "调解单详情" }
      }
    ]
  },

  // 系统设置
  {
    path: "/system",
    component: Layout,
    redirect: "/system/index",
    access: 'mediate_sys',
    name: "system",
    meta: {
      title: "系统设置",
      icon: "el-icon-setting",
    },
    children: [
      {
        path: "employee",
        access: 'mediate_user',
        component: () => import("@/views/system/employee/index"),
        name: "employee",
        meta: { title: "员工管理" }
      }
    ]
  },
  // 404 page must be placed at the end !!!
  { path: "*", redirect: "/404", hidden: true }
]
const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
  });

const router = createRouter();

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

export default router;
