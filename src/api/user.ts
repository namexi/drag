import http from '@/tool/http/http'

export const _getUserInfo = () => http.GET('/mock/api/userInfo')
