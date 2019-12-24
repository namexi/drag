import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/index";
import '@/assets/styles/index.less';
import ElementUi from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import { Notification } from 'element-ui';
import { Message } from 'element-ui';

Vue.prototype.$notify = Notification;
Vue.prototype.$Message = Message;

import '@/components/index'
Vue.config.productionTip = false;
Vue.use(ElementUi);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
