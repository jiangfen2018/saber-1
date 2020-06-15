import request from '@/router/axios';

export const getList = (current, size, params) => {
  return request({
    url: '/api/platform-device/steelprice/list',
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
    url: '/api/platform-device/steelprice/detail',
    method: 'get',
    params: {
      id
    }
  })
}

export const newest = () => {
  return request({
    url: '/api/platform-device/steelprice/newest',
    method: 'get',
    params: {
    }
  })
}

export const chart  = () => {
  return request({
    url: '/api/platform-device/steelprice/chart',
    method: 'get',
    params: {
    }
  })
}

export const remove = (ids) => {
  return request({
    url: '/api/platform-device/steelprice/remove',
    method: 'post',
    params: {
      ids,
    }
  })
}

export const add = (row) => {
  return request({
    url: '/api/platform-device/steelprice/save',
    method: 'post',
    data: row
  })
}

export const update = (row) => {
  return request({
    url: '/api/platform-device/steelprice/submit',
    method: 'post',
    data: row
  })
}

