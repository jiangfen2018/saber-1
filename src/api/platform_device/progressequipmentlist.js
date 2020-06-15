import request from '@/router/axios';

export const getList = (current, size, params) => {
  return request({
    url: '/api/platform-device/progressequipmentlist/list',
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
    url: '/api/platform-device/progressequipmentlist/detail',
    method: 'get',
    params: {
      id
    }
  })
}

export const getDetailParent = (jobEquipmentListId) => {
  return request({
    url: '/api/platform-device/progressequipmentlist/detailParent',
    method: 'get',
    params: {
      jobEquipmentListId
    }
  })
}

export const remove = (ids) => {
  return request({
    url: '/api/platform-device/progressequipmentlist/remove',
    method: 'post',
    params: {
      ids,
    }
  })
}

export const add = (row) => {
  return request({
    url: '/api/platform-device/progressequipmentlist/submit',
    method: 'post',
    data: row
  })
}

export const update = (row) => {
  return request({
    url: '/api/platform-device/progressequipmentlist/submit',
    method: 'post',
    data: row
  })
}


export const getProduceProgressPartList = (projectId, jobEquipmentListId) => {
  return request({
    url: '/api/platform-device/projectjob/produce/progress/part/list',
    method: 'get',
    params: {
      projectId,
      jobEquipmentListId
    }
  })
}

export const updateBatch = (row) => {
  return request({
    url: '/api/platform-device/progressequipmentlist/updateBatch',
    method: 'post',
    data: row
  })
}

export const uploadFile = (row) => {
  return request({
    url: '/api/platform-device/progressequipmentlist/uploadFile',
    method: 'post',
    data: row
    // params: {
    //   jobEquipmentListId,
    //   fileName
    // }
  })
}
export const downLoadFile = (projectId, jobEquipmentListId) => {
  return request({
    url: '/api/platform-device/progressequipmentlist/downLoadFile',
    responseType: 'blob',
    method: 'post',
    params: {
      projectId,
      jobEquipmentListId
    }
  })
}
export const purchaselist = (current, size, params) => {
  return request({
    url: '/api/platform-device/progressequipmentlist/purchaselist',
    method: 'get',
    params: {
      current,
      size,
      ...params,
    }
  })
}
export const customerSelect = () => {
  return request({
    url: '/api/platform-device/progressequipmentlist/customerSelect',
    method: 'get',
  })
}
export const equipmentSelect = (params) => {
  return request({
    url: '/api/platform-device/progressequipmentlist/equipmentSelect',
    method: 'get',
    params: {
      ...params,
    }
  })
}
