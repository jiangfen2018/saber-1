import request from '@/router/axios';

export const getList = (current, size, params) => {
  return request({
    url: '/api/platform-device/typeconfig/list',
    method: 'get',
    params: {
      ...params,
      current,
      size,
    }
  })
}

export const listAll = (current, size, params) => {
  return request({
    url: '/api/platform-device/typeconfig/listAll',
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
    url: '/api/platform-device/typeconfig/detail',
    method: 'get',
    params: {
      id
    }
  })
}


export const getDetailByName = (name) => {
  return request({
    url: '/api/platform-device/typeconfig/detail',
    method: 'get',
    params: {
      name_equal: name
    }
  })
}
export const remove = (ids) => {
  return request({
    url: '/api/platform-device/typeconfig/remove',
    method: 'post',
    params: {
      ids,
    }
  })
}

export const removetemp = (ids) => {
  return request({
    url: '/api/platform-device/typeconfig/temp/remove',
    method: 'post',
    params: {
      ids,
    }
  })
}

export const add = (row) => {
  return request({
    url: '/api/platform-device/typeconfig/submit',
    method: 'post',
    data: row
  })
}

export const save = (row) => {
  return request({
    url: '/api/platform-device/typeconfig/save',
    method: 'post',
    data: row
  })
}

export const selectedsave = (ids, typeId) => {
  return request({
    url: '/api/platform-device/typeconfig/part/selected/save',
    method: 'post',
    params: {
      ids, typeId
    }
  })
}


export const update = (row) => {
  return request({
    url: '/api/platform-device/typeconfig/submit',
    method: 'post',
    data: row
  })
}

export const selected = (params) => {
  return request({
    url: '/api/platform-device/typeconfig/part/selected/list',
    method: 'get',
    params: {
      ...params,
    }
  })
}

export const updateTempTypeId = (row) => {
  return request({
    url: '/api/platform-device/typeconfig/updateTempTypeId',
    method: 'post',
    data: row
  })
}
