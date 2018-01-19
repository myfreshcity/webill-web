import request from '@/utils/request'

export function getClientList(start, length) {
  return request({
    url: 'http://192.168.99.156/mmh-app/product/list',
    method: 'post',
//  data: {
//    start,
//    length
//  }
  })
}


