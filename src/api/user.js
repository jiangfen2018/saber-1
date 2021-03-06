import request from '@/router/axios';
import { baseUrl } from '@/config/env';

export const loginByUsername = (tenantCode, account, password, type) => request({
  url: '/api/platform-auth/token',
  method: 'post',
  params: {
    tenantCode,
    account,
    password,
    type
  }
})

export const getButtons = () => request({
  url: '/api/platform-system/menu/buttons',
  method: 'get'
});

export const getUserInfo = () => request({
  url: baseUrl + '/user/getUserInfo',
  method: 'get'
});

export const refeshToken = () => request({
  url: baseUrl + '/user/refesh',
  method: 'post'
})

export const getMenu = () => request({
  url: '/api/platform-system/menu/routes',
  method: 'get'
});

export const getTopMenu = () => request({
  url: baseUrl + '/user/getTopMenu',
  method: 'get'
});

export const sendLogs = (list) => request({
  url: baseUrl + '/user/logout',
  method: 'post',
  data: list
})

export const logout = () => request({
  url: baseUrl + '/user/logout',
  method: 'get'
})
