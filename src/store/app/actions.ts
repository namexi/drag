export default {
  setServersName(context: any, name: string) {
    if (name) {
      context.commit("SET_SERVERS_NAME", name);
    }
  },
  setFormName(context: any, name: string) {
    if (name) {
      context.commit("SET_FORM_NAME", name);
    }
  },
  setAreaPosition(context: any, name: string) {
    if (name) {
      sessionStorage.setItem("area", name)
      context.commit("SET_AREA_POSITION", name);
    }
  },
  setServicesId( context: any, id: string) {
    if (id) {
      sessionStorage.setItem("servicesId", id);
      context.commit("SET_SERVICES_ID", id)
    }
  }
};
