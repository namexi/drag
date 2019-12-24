const mainPage: Array<any> = [
  {
    path: "/main",
    name: "main",
    component: () =>
      import(/* webpackChunkName: "Main" */ "@/views/main/Main.vue"),
    children: [
      {
        path: "/review", // 审核
        name: "review",
        component: () =>
          import(
            /* webpackChunkName: "Review" */ "@/views/main/routes/Review/Review.vue"
          ),
        children: []
      },
      {
        path: "/configure", // 配置
        name: "configure",
        component: () =>
          import(
            /* webpackChunkName: "Configure" */ "@/views/main/routes/Configure/Configure.vue"
          ),
        children: [
          {
            path: "/templateCenter",
            name: "templateCenter", // 模板中心
            component: () =>
              import(
                /* webpackChunkName: "Index" */ "@/views/main/routes/Configure/templateCenter/index.vue"
              ),
            children: [
              {
                path: "/temp",
                name: "temp",
                component: () =>
                  import(
                    /* webpackChunkName: "Index" */ "@/views/main/routes/Configure/templateCenter/temp.vue"
                  )
              },
              {
                path: "/process",
                name: "process",
                component: () =>
                  import(
                    /* webpackChunkName: "Index" */ "@/views/main/routes/Configure/templateCenter/process.vue"
                  )
              }
            ]
          },
          {
            path: "/configuration",
            name: "configuration", // 元件模板
            component: () =>
              import(
                /* webpackChunkName: "Configuration" */ "@/views/main/routes/Configure/Configuration.vue"
              )
          },
          {
            path: "/configurations",
            name: "configurations",  //复合模板
            component: () =>
              import(
                /* webpackChunkName: "Configuration" */ "@/views/main/routes/Configure/Configurations.vue"
              )
          },
          {
            path: '/procconfiguration',  // 流程配置
            name: "procconfiguration",
            component: () => import(
                /* webpackChunkName: "Configuration" */ "@/views/main/routes/Configure/procConfig.vue"
                )
          }
        ]
      }
    ]
  }
];

const loginPage: Array<any> = [
  {
    path: "/login",
    name: "login",
    component: () =>
      import(/* webpackChunkName: "Login" */ "@/views/login/login.vue")
  }
];

const globalPage: Array<any> = [
  {
    path: "/workstation",
    name: "workstation",
    component: () =>
      import(/* webpackChunkName: "Global" */ "@/views/global/Global.vue"),
    children: [
      {
        path: "/outpatientDoctor",
        name: "outpatientDoctor",
        component: () =>
          import(
            /* webpackChunkName: "OutpatientDoctor" */ "@/views/global/routes/outpatientDoctor/index.vue"
          )
      },
      {
        path: "/dictionary",
        name: "dictionary",
        component: () =>
          import(
            /* webpackChunkName: "OutpatientDoctor" */ "@/views/global/routes/dictionary/index.vue"
          )
      }
    ]
  }
];

const errorPage: Array<any> = [];

export default [...mainPage, ...globalPage, ...loginPage, ...errorPage];
