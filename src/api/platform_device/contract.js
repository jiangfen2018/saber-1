import request from '@/router/axios';

export const getList = (current, size, params) => {
  return request({
    url: '/api/platform-device/contract/list',
    method: 'get',
    params: {
      ...params,
      current,
      size,
    }
  })
}

export const getMarketList = (current, size, params) => {
  return request({
    url: '/api/platform-device/contract/market/list',
    method: 'get',
    params: {
      ...params,
      current,
      size,
    }
  })
}

export const getDetail = (id) => {
  return request({
    url: '/api/platform-device/contract/detail',
    method: 'get',
    params: {
      id
    }
  })
}

export const remove = (ids) => {
  return request({
    url: '/api/platform-device/contract/remove',
    method: 'post',
    params: {
      ids,
    }
  })
}

export const add = (row) => {
  return request({
    url: '/api/platform-device/contract/submit',
    method: 'post',
    data: row
  })
}

export const save = (row) => {
  return request({
    url: '/api/platform-device/contract/save',
    method: 'post',
    data: row
  })
}

export const update = (row) => {
  return request({
    url: '/api/platform-device/contract/submit',
    method: 'post',
    data: row
  })
}

