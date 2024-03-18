import { sha1 } from './fetch'

const USER_KEY = 'fd7d08f5-9aea-4e07-bd6a-9b6f4a92e7c3'

export const setToken = (token: string) => {
  sessionStorage.setItem('token', token)
}

export const setUserId = (username: string) => {
  sessionStorage.setItem(USER_KEY, sha1(username))
}
export const getToken = () => {
  // return sessionStorage.getItem('token')
  return true
}

export const getUserId = () => {
  return sessionStorage.getItem(USER_KEY)
}
export const removeToken = () => {
  sessionStorage.removeItem('token')
}
