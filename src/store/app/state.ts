export default {
  serversName: '病历服务',
  formName: '未命名表单',
  tempCenterNavList: [
    {
      title: "模版中心",
      path: "/temp"
    },
    {
      title: "流程中心",
      path: "/process"
    }
  ],
  appId: null,
  servicesId: "bingli",
  area: "1",
  areaPosition: sessionStorage.getItem("area")|| 'WorkArea'

};
