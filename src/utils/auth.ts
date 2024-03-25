import { delStorage, getStorage, setStorage } from "./storage"

/**
 * 存储token
 * @param token token
 */
export const setToken = (token: string) => {
  setStorage('token', token, 'localStorage')
}

/**
 * 获取token
 * @returns token
 */
export const getToken = (): string => {
  return getStorage('token', 'localStorage')
}

/**
 * 移除token
 */
export const delToken = () => {
  delStorage('token', 'localStorage')
}
