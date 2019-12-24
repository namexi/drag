/**
 * Created by Xd on 2019/12/13.
 */
import http from "../tool/http/http";

// 获取权限列表
export const _getAuthList = () => http.GET("./one-config/models/appId/serviceId/getAuthorityList");

// 查询元件模板详情
export const _getFormData = (id) => http.GET(`./one-config/models/appId/serviceId/${id}`);

// 获取应用详情
export const _getApplications = (id)  => http.GET(`./one-config/applications/${id}`);

