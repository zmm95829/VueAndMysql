import Vue from "vue";
import App from "./App";
import router from "./router";
import store from "./store";

import VueResource from "vue-resource";
import Element from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(Element);
Vue.use(VueResource);

Vue.config.productionTip = false;
router.beforeEach((to, from, next) => {
  console.log("permission");
  if (store.getters.currentAccount === null) {
    store.dispatch("GetUserInfo");
  }
  next();
});

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  store,
  render: h => h(App)
});
