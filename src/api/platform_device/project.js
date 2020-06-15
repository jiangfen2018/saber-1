import request from '@/router/axios';

export const getList = (current, size, params) => {
  return request({
    url: '/api/platform-device/project/list',
    method: 'get',
    params: {
      ...params,
      current,
      size,
    }
  })
}

export const selectFlowList = () => {
  return request({
    url: '/api/platform-device/project/selectFlowList',
    method: 'get',
    params: {
    }
  })
}

export const getPartDetail = (current, size, params) => {
  return request({
    url: '/api/platform-device/project/device/part/list',
    method: 'get',
    params: {
      ...params,
      current,
      size,
    }
  })
}


export const getPartDetail2 = (current, size, params) => {
  return request({
    url: '/api/platform-device/project/device/part/list2',
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
    url: '/api/platform-device/project/detail',
    method: 'get',
    params: {
      id
    }
  })
}



export const remove = (ids) => {
  return request({
    url: '/api/platform-device/project/remove',
    method: 'post',
    params: {
      ids,
    }
  })
}

export const add = (row) => {
  return request({
    url: '/api/platform-device/project/submit',
    method: 'post',
    data: row
  })
}

export const update = (row) => {
  return request({
    url: '/api/platform-device/project/submit',
    method: 'post',
    data: row
  })
}

export const save = (row) => {
  return request({
    url: '/api/platform-device/project/save',
    method: 'post',
    data: row
  })
}

export const modelSelectedSave = (ids, nums, projectId) => {
  return request({
    url: '/api/platform-device/project/model/selected/save',
    method: 'post',
    params: {
      ids, nums, projectId
    }
  })
}

export const partSelectedSave = (typeIds, ids, nums, projectId) => {
  return request({
    url: '/api/platform-device/project/part/selected/save',
    method: 'post',
    params: {
      typeIds, ids, nums, projectId
    }
  })
}

export const createDesign = (projectId, payTime) => {
  return request({
    url: '/api/platform-device/project/create/design',
    method: 'post',
    params: {
      projectId, payTime
    }
  })
}



export const designedSelectList = (current, size, params) => {
  return request({
    url: '/api/platform-device/project/designed/select/list',
    method: 'get',
    params: {
      ...params,
      current,
      size,
    }
  })
}



export const designDeviceSelectedSave = (typeIds, ids, nums, parentIds, projectId) => {
  return request({
    url: '/api/platform-device/project/design/device/selected/save',
    method: 'post',
    params: {
      typeIds, ids, nums, parentIds, projectId
    }
  })
}



export const selectTypeList = (projectId,project,type,status) => {
  return request({
    url: '/api/platform-device/project/select/type/list',
    method: 'get',
    params: {
      projectId,project,type,status
    }
  })
}


export const selectModelList = (projectId,parentId,status) => {
  return request({
    url: '/api/platform-device/project/select/model/list',
    method: 'get',
    params: {
      projectId,parentId,status
    }
  })
}

