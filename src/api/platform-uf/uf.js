import request from '@/router/axios';

export const getList = (current, size, params) => {
    return request({
        url: '/api/platform-uf/uf/currentStockForVouch/list',
        method: 'get',
        params: {
            ...params,
            current,
            size,
        }
    })
}

export const requestOrderList = (current, size, params) => {
    return request({
        url: '/api/platform-uf/uf/requestOrder/list',
        method: 'get',
        params: {
            ...params,
            current,
            size,
        }
    })
}