import Vue from "vue";
import Router from "vue-router";
import HelloWorld from "@/components/HelloWorld";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "HelloWorld",
      component: HelloWorld
    },
    {
      path: "/OU管理/用户查询",
      name: "用户查询",
      component: () => import("@/views/01vue_element/OU管理/用户管理/List")
    }
  ]
});
