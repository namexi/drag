import { _getUserInfo } from "@/api/user";

export default {
  async fetchUserInfo(context: any) {
    let res: any = await _getUserInfo();
    if (res.status) {
      context.commit("SET_USER_TYPE", res.data.userType);
      context.commit("SET_USER_NAME", res.data.name);
      context.commit("SET_USER_ID", res.data.id);
      context.commit("SET_USER_APPID", res.data.appId);
    }
    return res;
  }
};
