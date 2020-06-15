import request from '@/router/axios';

export const getList = (current, size, params) => {
  return request({
    url: '/api/platform-device/sequencepricehistory/list',
    method: 'get',
    params: {
      ...params,
      current,
      size,
    }
  })
}