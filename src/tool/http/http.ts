import axios from "axios";
import Vue from "vue";
import { Message } from "element-ui";
import store from '@/store/index';
import {findReplacepos} from '@/tool/utils/function'

// axios.defaults.baseURL = 'http://config-service.ksaas.com';
const apiObj:any = {
 one: '/services/',
 oneTemplae :'appid',
 two:'/models/',
 twoTemplae:'appid/serviceId',
  getLen:(temp:string) => {
   return temp.length
  }
};
axios.interceptors.request.use(
  config => {
      const classFlag = {
          appidName:'appid',
          serviceIdName:'serviceid',
          // appid: 'e89ec3c05f4f4e3c88fd4eb87094a069',
          appid: 'e45d99d9cb2f4a28a27981945e0aeba4',
          serviceId: sessionStorage.getItem("servicesId"),
      };
   let url:any = config.url;
    if (url.indexOf("/one-config")) {
      let index:any = url.lastIndexOf(apiObj.two);
      let index1:any = url.lastIndexOf(apiObj.one);
      if (index !== -1 || index1 !== -1) {
          let urlPath:any = findReplacepos('./one-config',url,classFlag,apiObj.getLen);
          config = {
              ...config,
              url:urlPath.url
          };
          return config
      }
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  response => response,
  error => Promise.resolve(error.response)
);

function checkStatus(response: any) {
  if (response.status === 200 || response.status === 304) {
    return {
      data: {
        data: response.data.data,
        status: true,
        message: response.data.message
      }
    };
  }
  if (response.status >= 500) {
    return {
      data: {
        code: -500,
        status: false,
        message: response.statusText,
        data: response.statusText
      }
    };
  }
  return {
    data: {
      code: -404,
      status: false,
      message: response.statusText,
      data: response.statusText
    }
  };
}

function checkCode(res: any, errMsg: any) {
  if (!res.data.status) {
    switch (res.data.code) {
      case -404:
        Message.error(res.data.message || "未知异常");
        break;
      case -500:
        Message.error("服务器连接错误！");
        break;
      case 70005:
        Message.error("您需要重新登录！");
        break;
      default:
        errMsg
          ? Message.error(errMsg)
          : Message.error(res.data.message || "未知异常");
    }
  }
  return res.data;
}

export default {
  POST(url: string, data?: any, errMsg?: any) {
    const CancelToken = axios.CancelToken;
    return axios
      .post(url, data, {
        timeout: 30000,
        cancelToken: new CancelToken(function executor(c) {
          Vue.prototype.$httpRequestList.push(c);
        })
      })
      .then(checkStatus)
      .then(res => checkCode(res, errMsg));
  },
  GET(url: string, params?: any, errMsg?: any) {
    const CancelToken = axios.CancelToken;
    return axios
      .get(url, {
        params: {
          // _t: +new Date(),
          ...params
        },
        timeout: 30000,
        cancelToken: new CancelToken(function executor(c) {
          Vue.prototype.$httpRequestList.push(c);
        })
      })
      .then(checkStatus)
      .then(res => checkCode(res, errMsg));
  },
  DELETE(url: string, errMsg?: any) {
    const CancelToken = axios.CancelToken;
    return axios
      .delete(url, {
        timeout: 30000,
        cancelToken: new CancelToken(function executor(c) {
          Vue.prototype.$httpRequestList.push(c);
        })
      })
      .then(checkStatus)
      .then(res => checkCode(res, errMsg));
  },
  PUT(url: string, data?: any, errMsg?: any) {
    const CancelToken = axios.CancelToken;
    return axios
      .put(url, data, {
        timeout: 30000,
        cancelToken: new CancelToken(function executor(c) {
          Vue.prototype.$httpRequestList.push(c);
        })
      })
      .then(checkStatus)
      .then(res => checkCode(res, errMsg));
  }
};
