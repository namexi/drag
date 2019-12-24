import Vue from "vue";
// todo: 按需加载功能组件

// todo: 动态获取组件路径
export const VueComponentsName = require
  .context("../fieldsConfig", true, /\.vue$/)
  .keys()
  .map(item => {
    const moduleName = item.replace(/^\.\/(.*)\.\w+$/, "$1");
    return {
      name: `fields${moduleName}`,
      path: moduleName
    };
  });

// todo: 注册异步组件
let VueComp = {};
VueComponentsName.forEach(item => {
  let key = item.name;
  let path = item.path;
  let comp = require("./" + path + ".vue").default;
  VueComp[key] = Vue.extend(comp);
});

export const VueComponents = VueComp;
