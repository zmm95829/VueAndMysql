import router from "./router";
import store from "./store";

router.beforeEach((to, from, next) => {
  console.log("permission");
  if (store.getters.currentAccount === null) {
    store.dispatch("GetUserInfo");
  }
  next();
});
