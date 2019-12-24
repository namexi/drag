/**
 * Created by Xd on 2019/11/27.
 */
import Vue from "vue";
import commonComponents from "./common";

const component: any = { ...commonComponents };

Object.keys(component).forEach(key =>
  Vue.component(component[key].name, component[key])
);
