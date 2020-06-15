import request from '@/router/axios';


export const areaList = (key) => {
  return request({
    url: '/api/platform-device/customer/area/list',
    method: 'get',
    params: {
      key
    }
  })
}

export const getList = (current, size, params) => {
  return request({
    url: '/api/platform-device/customer/list',
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
    url: '/api/platform-customer/customer/detail',
    method: 'get',
    params: {
      id
    }
  })
}

export const getResponse = () => {
  return request({
    url: '/api/platform-device/customer/response/list',
    method: 'get',
    params: {}
  })
}

export const selectCustomerList = (all,produce,design) => {
  return request({
    url: '/api/platform-device/customer/selectCustomerList',
    method: 'get',
    params: {all,produce,design}
  })
}

export const selectProjectList = (customerId) => {
  return request({
    url: '/api/platform-device/customer/selectProjectList',
    method: 'get',
    params: {
      customerId: customerId
    }
  })
}

export const selectOrderProjectList = (customerId,type) => {
  return request({
    url: '/api/platform-device/customer/selectOrderProjectList',
    method: 'get',
    params: {
      customerId,type
    }
  })
}


export const remove = (ids) => {
  return request({
    url: '/api/platform-customer/customer/remove',
    method: 'post',
    params: {
      ids,
    }
  })
}

export const add = (row) => {
  return request({
    url: '/api/platform-customer/customer/submit',
    method: 'post',
    data: row
  })
}

export const save = (row) => {
  return request({
    url: '/api/platform-device/customer/save',
    method: 'post',
    data: row
  })
}

export const update = (row) => {
  return request({
    url: '/api/platform-customer/customer/submit',
    method: 'post',
    data: row
  })
}



export const selectOrderCustomerList = () => {
  return request({
    url: '/api/platform-device/customer/selectOrderCustomerList',
    method: 'get',
    params: {
       
    }
  })
}


export const selectOrderCustomerList2 = (type) => {
  return request({
    url: '/api/platform-device/customer/selectOrderCustomerList2',
    method: 'get',
    params: {
       type
    }
  })
}

export const selectSaleList = (role) => {
  return request({
    url: '/api/platform-device/customer/selectSaleList',
    method: 'get',
    params: {
       role
    }
  })
}