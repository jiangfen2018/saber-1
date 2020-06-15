import request from '@/router/axios';

export const getList = (current, size, params) => {
  return request({
    url: '/api/platform-device/sequenceprice/list',
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
    url: '/api/platform-device/sequenceprice/detail',
    method: 'get',
    params: {
      id
    }
  })
}

export const remove = (ids) => {
  return request({
    url: '/api/platform-device/sequenceprice/remove',
    method: 'post',
    params: {
      ids,
    }
  })
}

export const add = (row) => {
  return request({
    url: '/api/platform-device/sequenceprice/submit',
    method: 'post',
    data: row
  })
}

export const update = (row) => {
  return request({
    url: '/api/platform-device/sequenceprice/submit',
    method: 'post',
    data: row
  })
}

export const save = (row) => {
  return request({
    url: '/api/platform-device/sequenceprice/save',
    method: 'post',
    data: row
  })
}