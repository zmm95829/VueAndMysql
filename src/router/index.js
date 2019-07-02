import Vue from "vue";
import Router from "vue-router";
// import HelloWorld from "@/components/HelloWorld";
import Layout from "@/components/Layout";
Vue.use(Router);

export default new Router({
  routes: [
    // {
    //   path: "/",
    //   name: "HelloWorld",
    //   component: HelloWorld
    // },
    {
      path: "/",
      component: Layout,
      redirect: "/home",
      children: [
        {
          path: "home",
          name: "Home",
          component: () => import("@/views/00home/home"),
          meta: {
            title: "首页"
          }
        }
      ]
    },
    {
      path: "/OU管理/用户查询",
      name: "用户查询",
      component: () => import("@/views/01vue_element/OU管理/用户管理/List")
    },
    {
      path: "/个人管理/个人经历",
      name: "GeRenJingLi",
      component: () => import("@/views/01vue_element/个人管理/个人经历/List")
    }
  ]
});
