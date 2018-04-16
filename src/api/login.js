import request from '@/utils/request'

export function getInfo(mobileNo, password,checkFlag) {
  return request({
    url: '/api/user/login',
    method: 'post',
    data: {
      mobileNo,
      password,
      checkFlag
    }
  })
}

export function login(token) {
return request({
    url: '/user/info',
    method: 'get',
    params: { token }
})
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
