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
const layout = {
  state: {
    opened: false
  },
  mutations: {
    SET_SIDERBAR_OPENE: (state) => {
      state.opened = !state.opened;
      console.log("SET_SIDERBAR_OPENE");
    }
  }
};
const getters = {
  currentAccount: ({ user }) => user.currentAccount,
  siderBarOpened: ({ layout }) => layout.opened
};
const store = new Vuex.Store({
  modules: {
    user,
    layout
  },
  getters
});
export default store;
