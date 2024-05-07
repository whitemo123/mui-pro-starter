import Cookie from 'js-cookie'
import config from "@/config"

// 存储类型
type StorageType = 'localStorage' | 'sessionStorage' | 'cookieStorage'

interface IStorageValue {
  // 类型
  dataType: string,
  // 值
  data: any,
  // 存储时间
  dateTime: number,
}

/**
 * @description 存储值
 * @param key 键
 * @param value 值
 * @param type 类型：(localStorage 本地存储，sessionStorage 会话存储，cookieStorage cookie存储)
 */
export const setStorage = (key: string, value: any, type: StorageType = 'localStorage') => {
  // 存储key
  const storageKey = config.code + '-' + key;
  const obj: IStorageValue = {
    // 数据类型
    dataType: typeof(value),
    // 数据内容
    data: value,
    // 存储时间
    dateTime: new Date().getTime()
  }
  if (type === 'localStorage') {
    // 本地存储
    window.localStorage.setItem(storageKey, JSON.stringify(obj))
  } else if (type === 'sessionStorage') {
    // 会话存储
    window.sessionStorage.setItem(storageKey, JSON.stringify(obj))
  } else if (type === 'cookieStorage') {
    // cookie存储
    Cookie.set(storageKey, JSON.stringify(obj))
  }
}

/**
 * @description 获取值
 * @param key 键
 * @param type 类型：(localStorage 本地存储，sessionStorage 会话存储，cookieStorage cookie存储)
 */
export const getStorage = <T = any>(key: string, type: StorageType = 'localStorage'): T => {
  // 存储key
  const storageKey = config.code + '-' + key;

  let obj: string;

  if (type === 'localStorage') {
    // 本地存储
    obj = window.localStorage.getItem(storageKey) as string
  } else if (type === 'sessionStorage') {
    // 会话存储
    obj = window.sessionStorage.getItem(storageKey) as string
  } else if (type === 'cookieStorage') {
    // cookie存储
    obj = Cookie.get(storageKey) as string
  }

  let jsonObj: IStorageValue;

  try {
    // @ts-ignore
    jsonObj = JSON.parse(obj)
    if (jsonObj === null) {
      // @ts-ignore
      return null;
    }
  } catch (err) {
    // @ts-ignore
    return obj
  }

  let content: T;

  if (jsonObj.dataType == 'string') {
    content = jsonObj.data;
  } else if (jsonObj.dataType == 'number') {
    // @ts-ignore
    content = Number(jsonObj.data)
  } else if (jsonObj.dataType == 'boolean') {
    // @ts-ignore
    content = Boolean(jsonObj.data)
  } else if (jsonObj.dataType == 'object') {
    content = jsonObj.data;
  }

  // @ts-ignore
  return content
}

/**
 * @description 删除存储值
 * @param key 键
 * @param type 类型：(localStorage 本地存储，sessionStorage 会话存储，cookieStorage cookie存储)
 */
export const delStorage = (key: string, type: StorageType = 'localStorage') => {
  // 存储key
  const storageKey = config.code + '-' + key;

  if (type === 'localStorage') {
    window.localStorage.removeItem(storageKey)
  } else if (type === 'sessionStorage') {
    window.sessionStorage.removeItem(storageKey)
  } else if (type === 'cookieStorage') {
    Cookie.remove(storageKey)
  }
}
