import request from '@/router/axios';

export const getListItem = (code_equal) => {
  return request({
    url: '/api/platform-system/dict/list',
    method: 'get',
    params: {
      code_equal,
    }
  })
}

export const getListItem2 = (code_equal,parentId_equal) => {
  return request({
    url: '/api/platform-system/dict/list',
    method: 'get',
    params: {
      code_equal,parentId_equal
    }
  })
}

export const getList = (current, size, params) => {
  return request({
    url: '/api/platform-system/dict/list',
    method: 'get',
    params: {
      ...params,
      current,
      size,
    }
  })
}
export const remove = (ids) => {
  return request({
    url: '/api/platform-system/dict/remove',
    method: 'post',
    params: {
      ids,
    }
  })
}

export const add = (row) => {
  return request({
    url: '/api/platform-system/dict/submit',
    method: 'post',
    data: row
  })
}

export const update = (row) => {
  return request({
    url: '/api/platform-system/dict/submit',
    method: 'post',
    data: row
  })
}


export const getDict = (id) => {
  return request({
    url: '/api/platform-system/dict/detail',
    method: 'get',
    params: {
      id,
    }
  })
}
export const getDictTree = () => {
  return request({
    url: '/api/platform-system/dict/tree?code=DICT',
    method: 'get'
  })
}
