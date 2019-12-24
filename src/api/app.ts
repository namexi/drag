import http from "@/tool/http/http";

// 获取服务列表
export const _getDataSource = ()  => http.GET('./one-config/models/appid/serviceId/datasource');
export const _getApplications = ()  => http.GET(`./one-config/services/appId?_page=1&_count=10&_sort=aa`);
export const _deleteApplications = (id:string)  => http.DELETE(`./one-config/services/appId/service/${id}`);
export const _saveApplications = (name:string)  => http.POST(`./one-config/services/appId`, name);

// 表单模型
export const _saveFrom = (data:any) => http.POST('./one-config/models/appid/serviceId', data);
export const _putFrom = (data:any,id:string) => http.PUT(`./one-config/models/appid/serviceId/${id}`, data);
export const _getFrom = (componentName: any = null, area:any ='area=1') => http.GET(`./one-config/models/appid/serviceId?${area}&${componentName}`);
export const _deleteFrom = (formId:string) => http.DELETE(`./one-config/models/appId/serviceId/${formId}`);
export const _getPreviewFrom = (formId:string) => http.GET(`./one-config/models/appId/serviceId/previewFrom/${formId}`);
export const _savePreviewFrom = (data:any) => http.POST(`./one-config/models/appId/serviceId/previewFrom`,data);
export const _putPreviewFrom = (data:any,id:string) => http.PUT(`./one-config/models/appId/serviceId/previewFrom/${id}`,data);

// 字典
export const _getDictionary = (type:string = '2',isAll:string ='true',dictionaryType:string ='select') => http.GET(`./one-config/services/appid/dictionary?type=${type}&isAll=${isAll}&sign=${dictionaryType}`);
export const _saveDictionary = (data: object) => http.POST('./one-config/services/appid/dictionary', data);

// 流程
export const _saveProcesses = (data:any) => http.POST('./one-config/models/appId/serviceId/processes', data);
export const _updateProcesses = (id:any) => http.PUT('./one-config/models/appId/serviceId/processes', id);
export const _getProcessesList = () => http.GET('./one-config/models/appId/serviceId/processes');
export const  _deleteProcesses = (id:string) => http.DELETE(`./one-config/models/appId/serviceId/processes/${id}`);
export const  _releaseProcesses = (id:string) => http.PUT(`./one-config/models/appId/serviceId/processesPublish/${id}`);

