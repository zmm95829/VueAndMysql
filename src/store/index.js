import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const user = {
  state: {
    currentAccount: null
  },
  mutations: {
    SET_CURRENT_ACCOUNT: (state, account) => {
      state.currentAccount = account;
    }
  },
  actions: {
    GetUserInfo(context) {
      // 可以执行异步操作
      console.log("GetUserInfo");
      context.commit("SET_CURRENT_ACCOUNT", {id: 1, userName: "zmm"});
    }
  }
};
const getters = {
  currentAccount: ({ user }) => user.currentAccount
};
const store = new Vuex.Store({
  modules: {
    user
  },
  getters
});
export default store;
