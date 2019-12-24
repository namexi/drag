const port = process.env.port || process.env.npm_config_port || 9527;
module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "./" : "/",
  outputDir: "dist",
  assetsDir: "static",
  lintOnSave: process.env.NODE_ENV === "development",
  productionSourceMap: false,
  devServer: {
    port: port,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
      // change xxx-api/login => mock/login
      // detail: https://cli.vuejs.org/config/#devserver-proxy
      // [process.env.VUE_APP_BASE_API]: {
      //     target: `http://127.0.0.1:${port}/mock`,
      //         changeOrigin: true,
      //         pathRewrite: {
      //         ['^' + process.env.VUE_APP_BASE_API]: ''
      //     }
      // },
      "/mock/api": {
        target: `http://127.0.0.1:3001`,
        changeOrigin: true,
        pathRewrite: {
          ["^/mock/api"]: "/mock/api"
        }
      },
      // "/one-config": {
      //   target: `http://config-service.ksaas.com`,
      //   changeOrigin: true,
      //   pathRewrite: {
      //     ["^/one-config"]: "/one-config"
      //   }
      // },
      "/one-config": {
        target: `http://192.168.31.43:8765`,
        changeOrigin: true,
        pathRewrite: {
          ["^/one-config"]: "/one-config"
        }
      },
    }
  }
};
