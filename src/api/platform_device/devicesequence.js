import request from '@/router/axios';

export const getList = (current, size, params) => {
  return request({
    url: '/api/platform-device/devicesequence/list',
    method: 'get',
    params: {
      ...params,
      current,
      size,
    }
  })
}

export const getPartList = (current, size, params) => {
  return request({
    url: '/api/platform-device/devicesequence/part/list',
    method: 'get',
    params: {
      ...params,
      current,
      size,
    }
  })
}

export const getModelList = (current, size, params) => {
  return request({
    url: '/api/platform-device/devicesequence/project/model/list',
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
    url: '/api/platform-device/devicesequence/detail',
    method: 'get',
    params: {
      id
    }
  })
}

export const remove = (ids) => {
  return request({
    url: '/api/platform-device/devicesequence/remove',
    method: 'post',
    params: {
      ids,
    }
  })
}

export const add = (row) => {
  return request({
    url: '/api/platform-device/devicesequence/submit',
    method: 'post',
    data: row
  })
}

export const save = (row) => {
  return request({
    url: '/api/platform-device/devicesequence/save',
    method: 'post',
    data: row
  })
}

export const update = (row) => {
  return request({
    url: '/api/platform-device/devicesequence/submit',
    method: 'post',
    data: row
  })
}



export const removetemp = (ids) => {
  return request({
    url: '/api/platform-device/devicesequence/temp/remove',
    method: 'post',
    params: {
      ids,
    }
  })
}

export const selectedsave = (ids, nums, parentId) => {
  return request({
    url: '/api/platform-device/devicesequence/part/selected/save',
    method: 'post',
    params: {
      ids, nums, parentId
    }
  })
}


export const selected = (params) => {
  return request({
    url: '/api/platform-device/devicesequence/part/selected/list',
    method: 'get',
    params: {
      ...params,
    }
  })
}

export const updateTempTypeId = (row) => {
  return request({
    url: '/api/platform-device/devicesequence/updateTempTypeId',
    method: 'post',
    data: row
  })
}


export const getPartUsedList = (current, size, params) => {
  return request({
    url: '/api/platform-device/devicesequence/part/used/list',
    method: 'get',
    params: {
      ...params,
      current,
      size,
    }
  })
}