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
export const constantRoutes = [{
        path: "/login",
        component: () =>
            import ("@/views/login/index"),
        hidden: true
    },
    {
        path: "/404",
        component: () =>
            import ("@/views/error-page/404"),
        hidden: true
    },
    {
        path: "/403",
        component: () =>
            import ("@/views/error-page/403"),
        hidden: true
    },
    {
        path: "/500",
        component: () =>
            import ("@/views/error-page/500"),
        hidden: true
    },
    // 404 page must be placed at the end !!!
    { path: "*", redirect: "/404", hidden: true },
    {
        path: "/profile",
        component: Layout,
        redirect: "/profile/index",
        hidden: true,
        children: [{
            path: "index",
            component: () =>
                import ("@/views/profile/index"),
            name: "Profile",
            meta: { title: "个人中心", icon: "user", noCache: true }
        }]
    },
    //首页
    {
        path: "/",
        component: Layout,
        redirect: "/dashboard",
        children: [{
            path: "dashboard",
            name: "Dashboard",
            component: () =>
                import ("@/views/dashboard/index"),
            meta: { title: "首页", icon: "el-icon-s-home" }
        }]
    },
    {
        path: "/advertising",
        component: Layout,
        redirect: "/advertising",
        name: "Advertising",
        meta: {
            title: "广告管理",
            icon: "el-icon-s-marketing",
        },
        children: [{
                path: "banner",
                // access: 'mediate_all_case',
                component: () =>
                    import ("@/views/advertising/banner/index"),
                name: "banner",
                meta: { title: "广告列表" }
            },
            {
                path: "type",
                // access: 'mediate_my_case',
                component: () =>
                    import ("@/views/advertising/type/index"),
                name: "Type",
                meta: { title: "广告类别" }
            }
        ]
    },
    {
        path: "/article",
        component: Layout,
        redirect: "/article",
        name: "Article",
        meta: {
            title: "文章管理",
            icon: "el-icon-tickets",
        },
        children: [{
            path: "list",
            component: () =>
                import ("@/views/article/index"),
            name: "List",
            meta: { title: "文章列表" }
        }, {
            path: "published",
            component: () =>
                import ("@/views/article/Published.vue"),
            name: "Published",
            meta: { title: "发表文章" }
        }]
    },
    {
        path: "/contact",
        component: Layout,
        redirect: "/contact",
        name: "Contact",
        meta: {
            title: "留言",
            icon: "el-icon-data-line",
        },
        children: [{
            path: "list",
            component: () =>
                import ("@/views/contact/index"),
            name: "List",
            meta: { title: "留言列表" }
        }]
    },

    // 系统设置
    {
        path: "/system",
        component: Layout,
        redirect: "/system/index",
        name: "system",
        meta: {
            title: "系统设置",
            icon: "el-icon-setting",
        },
        children: [{
            path: "user",
            component: () =>
                import ("@/views/system/user/index"),
            name: "User",
            meta: { title: "用户管理" }
        }]
    },
    {
      path: "/aSunshine",
      component: Layout,
      redirect: "/aSunshine",
      name: "ASunshine",
      meta: {
          title: "阳光行动",
          icon: "el-icon-sort",
      },
      children: [{
          path: "contentMana",
          component: () =>
              import ("@/views/actionSunshine/contentMana/index"),
          name: "ContentMana",
          meta: { title: "内容管理" }
      }, {
          path: "regInfoMana",
          component: () =>
              import ("@/views/actionSunshine/regInfoMana/index"),
          name: "RegInfoMana",
          meta: { title: "报名信息管理" }
      }]
  },

];
export const asyncRoutes = [];
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