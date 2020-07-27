import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/manage/employee/login',
    method: 'post',
    data
  })
}

export function getRole() {
  return request({
    url: '/manage/employee/userInfo',
    method: 'post'
  })
}

export function logout() {
  return request({
    url: '/manage/employee/logout',
    method: 'post'
  })
}
