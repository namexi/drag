import Vue from "vue";
import Vuex from "vuex";
import app from './app/index'
import user from './user/index'
import getters from './getters'
import role from './role/index'

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    user,
    role,
    app
  },
  getters
});
