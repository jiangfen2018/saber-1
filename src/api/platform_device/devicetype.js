import request from '@/router/axios';

export const getList = (current, size, params) => {
  return request({
    url: '/api/platform-device/devicetype/list',
    method: 'get',
    params: {
      ...params,
      current,
      size,
    }
  })
}

export const selectTypeList = (project, type) => {
  return request({
    url: '/api/platform-device/devicetype/selectTypeList',
    method: 'get',
    params: {
      project, type
    }
  })
}

export const selectModelList = (parentId) => {
  return request({
    url: '/api/platform-device/devicetype/selectModelList',
    method: 'get',
    params: {
      parentId
    }
  })
}

export const getDetail = (id) => {
  return request({
    url: '/api/platform-device/devicetype/detail',
    method: 'get',
    params: {
      id
    }
  })
}

export const selectList = (parentId) => {
  return request({
    url: '/api/platform-device/devicetype/selectList',
    method: 'get',
    params: {
      parentId
    }
  })
}


export const selectList2 = (parentId, status) => {
  return request({
    url: '/api/platform-device/devicetype/selectList',
    method: 'get',
    params: {
      parentId,
      status
    }
  })
}
export const remove = (ids) => {
  return request({
    url: '/api/platform-device/devicetype/remove',
    method: 'post',
    params: {
      ids,
    }
  })
}

export const add = (row) => {
  return request({
    url: '/api/platform-device/devicetype/submit',
    method: 'post',
    data: row
  })
}

export const update = (row) => {
  return request({
    url: '/api/platform-device/devicetype/submit',
    method: 'post',
    data: row
  })
}

