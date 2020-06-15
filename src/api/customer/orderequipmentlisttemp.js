import request from '@/router/axios';

// export const getList = (current, size, params) => {
//   return request({
//     url: '/api/platform-device/orderequipmentlisttemp/list',
//     method: 'get',
//     params: {
//       ...params,
//       current,
//       size,
//     }
//   })
// }

// export const getDetail = (id) => {
//   return request({
//     url: '/api/platform-device/orderequipmentlisttemp/detail',
//     method: 'get',
//     params: {
//       id
//     }
//   })
// }

// export const remove = (ids) => {
//   return request({
//     url: '/api/platform-device/orderequipmentlisttemp/remove',
//     method: 'post',
//     params: {
//       ids,
//     }
//   })
// }

// export const add = (row) => {
//   return request({
//     url: '/api/platform-device/orderequipmentlisttemp/submit',
//     method: 'post',
//     data: row
//   })
// }

// export const update = (row) => {
//   return request({
//     url: '/api/platform-device/orderequipmentlisttemp/submit',
//     method: 'post',
//     data: row
//   })
// }

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

export const removetemp = (ids) => {
    return request({
      url: '/api/platform-device/project/temp/remove',
      method: 'post',
      params: {
        ids,
      }
    })
  }
  
  export const selectedsave = (ids,nums, projectId) => {
    return request({
      url: '/api/platform-device/project/device/selected/save',
      method: 'post',
      params: {
        ids, nums, projectId
      }
    })
  }
  
  
  export const selected = (params) => {
    return request({
      url: '/api/platform-device/project/device/selected/list',
      method: 'get',
      params: {
        ...params,
      }
    })
  }
  
  export const tempsave = (row) => {
      console.log(row)
    return request({
      url: '/api/platform-device/project/temp/save',
      method: 'post',
      data: row
    })
  }