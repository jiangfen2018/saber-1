import request from '@/router/axios';

export const getList = (current, size, params) => {
  return request({
    url: '/api/platform-device/projectjob/list',
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
    url: '/api/platform-device/projectjob/detail',
    method: 'get',
    params: {
      id
    }
  })
}

export const remove = (ids) => {
  return request({
    url: '/api/platform-device/projectjob/remove',
    method: 'post',
    params: {
      ids,
    }
  })
}

export const add = (row) => {
  return request({
    url: '/api/platform-device/projectjob/submit',
    method: 'post',
    data: row
  })
}

export const update = (row) => {
  return request({
    url: '/api/platform-device/projectjob/submit',
    method: 'post',
    data: row
  })
}

export const getPartDetail = (current, size, params) => {
  return request({
    url: '/api/platform-device/projectjob/device/part/list',
    method: 'get',
    params: {
      ...params,
      current,
      size,
    }
  })
}

export const getEngineerList = () => {
  return request({
    url: '/api/platform-device/projectjob/engineer/list',
    method: 'get'
  })
}


export const updateData = (row) => {
  return request({
    url: '/api/platform-device/projectjob/updateData',
    method: 'post',
    data: row
  })
}


export const updateData2 = (row) => {
  return request({
    url: '/api/platform-device/projectjob/updateData2',
    method: 'post',
    data: row
  })
}


export const getDeviceList = (current, size, params) => {
  return request({
    url: '/api/platform-device/projectjob/device/list',
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
    url: '/api/platform-device/projectjob/part/list',
    method: 'get',
    params: {
      ...params,
      current,
      size,
    }
  })
}

export const getProduceDeviceList = (current, size, params) => {
  return request({
    url: '/api/platform-device/projectjob/produce/device/list',
    method: 'get',
    params: {
      ...params,
      current,
      size,
    }
  })
}

export const updateProduceData = (row) => {
  return request({
    url: '/api/platform-device/projectjob/updateProduceData',
    method: 'post',
    data: row
  })
}

export const updateProduceData2 = (row) => {
  return request({
    url: '/api/platform-device/projectjob/updateProduceData2',
    method: 'post',
    data: row
  })
}

export const updateProduceData3 = (row) => {
  return request({
    url: '/api/platform-device/projectjob/updateProduceData3',
    method: 'post',
    data: row
  })
}

export const getProjectDeviceList = (current, size, params) => {
  return request({
    url: '/api/platform-device/projectjob/project/device/list',
    method: 'get',
    params: {
      ...params,
      current,
      size,
    }
  })
}


export const getSendDevicePartList = (current, size, params) => {
  return request({
    url: '/api/platform-device/projectjob/send/device/part/list',
    method: 'get',
    params: {
      ...params,
      current,
      size,
    }
  })
}





export const sendProgress = (jobId) => {
  return request({
    url: '/api/platform-device/projectjob/send/progress',
    method: 'get',
    params: {
      jobId
    }
  })
}

export const uploadPaper = (row) => {
  return request({
    url: '/api/platform-folder/uploadPaper',
    // url: '/api/platform-device/projectjob/uploadPaper',
    method: 'post',
    data: row
  })
}


export const updateJobequipmentlist = (row) => {
  return request({
    url: '/api/platform-device/jobequipmentlist/submit',
    method: 'post',
    data: row
  })
}



export const downloadPaper = (row) => {
  return request({
    url: '/api/platform-folder/downloadPaper',
    // url: '/api/platform-device/jobequipmentlist/downloadPaper',
    responseType: 'blob',
    // responseType:"arraybuffer",
    headers: {Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9'},
    method: 'post',
    data: row
  })
}



export const downloadPaperBatch = (row) => {
  return request({
    url: '/api/platform-folder/downloadPaperBatch',
    responseType: 'blob',
    // responseType:"arraybuffer",
    headers: {Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9'},
    method: 'post',
    data: row
  })
}


export const listFolder = (projectId,path) => {
  return request({
    // url: '/api/platform-device/projectjob/listFolder',
    url: '/api/platform-folder/listFolder',
    method: 'get',
    params: {
      projectId,path
    }
  })
}

// jobId,
export const updatePaperData = (paperDTO) => {
  return request({
    url: '/api/platform-device/projectjob/updatePaperData',
    method: 'post',
    data:   paperDTO
    
  })
}


export const updateJobEquipmentList = (row) => {
  return request({
    url: '/api/platform-device/jobequipmentlist/submit',
    method: 'post',
    data: row
  })
}
