import request from '@/router/axios';

export const getList = (current, size, params) => {
  return request({
    url: '/api/platform-device/contractpricerecord/list',
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
    url: '/api/platform-device/contractpricerecord/detail',
    method: 'get',
    params: {
      id
    }
  })
}

export const remove = (ids) => {
  return request({
    url: '/api/platform-device/contractpricerecord/remove',
    method: 'post',
    params: {
      ids,
    }
  })
}

export const save = (row) => {
  return request({
    url: '/api/platform-device/contractpricerecord/save',
    method: 'post',
    data: row
  })
}

export const add = (row) => {
  return request({
    url: '/api/platform-device/contractpricerecord/submit',
    method: 'post',
    data: row
  })
}

export const update = (row) => {
  return request({
    url: '/api/platform-device/contractpricerecord/submit',
    method: 'post',
    data: row
  })
}

