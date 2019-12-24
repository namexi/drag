const getters = {
  getRoleName: (state: any) => (userType: any) =>
    state.role.roleTypeMap[userType].roleName,
  getUserId: (state: any) => state.user.id,
  getUserName: (state: any) => state.user.name,
  getServersName: (state: any) => state.app.serversName,
  getFormName:(state:any) => state.app.formName,
  getAre:(state:any) => state.app.areaPosition === 'WorkArea'? '1':'2',
  getservicesid:(state:any) => state.app.servicesId
};

export default getters;
