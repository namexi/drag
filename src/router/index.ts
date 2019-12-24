import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes";
import {clearHttpRequestingList} from "@/tool/http/httpRequestList";
import store from "../store/index"

Vue.prototype.$httpRequestList = [];
Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to,from,next) => {
  clearHttpRequestingList();
  if (!store.getters.getUserId) {
    store.dispatch('fetchUserInfo').then(res =>{
      // if (res.status) console.log('我是路由里面的api')
    })
  }
  next()
});
export default router;
