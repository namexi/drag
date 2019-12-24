import {State} from "vuex-class";

export default {
  SET_SERVERS_NAME: (state: any, name: string): void => {
    state.serversName = name;
  },
  SET_FORM_NAME: (state:any,name:string): void => {
    state.formName = name
  },
  SET_AREA_POSITION:(state:any,are:string):void => {
    state.areaPosition = are
  },
  SET_SERVICES_ID:(state:any,id:string):void => {
    state.servicesId = id
  }
};
