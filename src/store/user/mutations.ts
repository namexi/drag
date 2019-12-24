export default {
  SET_USER_TYPE: (state: any, type: any): void => {
    state.userType = type;
  },
  SET_USER_NAME: (state: any, name: string): void => {
    state.name = name;
  },
  SET_USER_ID: (state: any, id: any): void => {
    state.id = id;
  },
  SET_USER_APPID: (state: any, id: any): void => {
    state.appId = id;
  }
};
