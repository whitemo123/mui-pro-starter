import { ElMessage } from 'element-plus';
import router from '@/router'
import { useNProgress } from '@/hooks/useNProgress';
import { useUserStore } from '@/store';
import { getToken } from '@/utils/auth';
import config from '@/config';
import type { IFetchRequestOptions, IFetchResponse } from "./types";

export default class FetchRequest {

  // 请求配置
  private requestOptions!: IFetchRequestOptions;

  /**
   * 构造函数
   * @param options 初始化配置
   */
  constructor(options: IFetchRequestOptions) {
    this.requestOptions = { ...options }

    if (!options.timeOut) {
      // 超时时间默认10分钟
      this.requestOptions.timeOut = config.apiTimeOut
    }
  }

  /**
   * request请求
   * @param url 请求地址
   * @param init 请求配置
   */
  request<T = any>(url: string, init: RequestInit): Promise<IFetchResponse<T>> {
    return new Promise(async (resolve, reject) => {
      const { start, done } = useNProgress()
      // 接口地址
      const apiUrl = this.requestOptions.base + url;
      let headers: Record<string, any> = {};

      const token = getToken()

      // 如果有token
      if (token) {
        headers[config.authorization] = `${token}`
      }

      // 请求头合并
      if (init.headers && this.requestOptions.headers) {
        headers = Object.assign(headers, this.requestOptions.headers, init.headers);
      } else {
        headers = Object.assign(headers, (init.headers || this.requestOptions.headers || {}))
      }

      start()
      try {
        // 发起请求
        const fetchResponse: Response = await fetch(apiUrl, {
          ...this.requestOptions,
          ...init,
          headers
        });
        if (fetchResponse.status !== 200) {
          ElMessage.error('网络连接失败，请稍后重试')
          return reject(fetchResponse)
        }
        // 响应数据状态
        const responseType = fetchResponse.headers.get('content-type')
        
        // 获取响应头
        const responseHeaders: Record<string, any> = {}
        if (fetchResponse.headers) {
          for (const header of fetchResponse.headers.entries()) {
            responseHeaders[header[0]] = header[1]
          }
        }

        if (responseType === 'application/json') {
          // json格式数据
          const responseJson = await fetchResponse.clone().json()
          if (!responseJson || !config.codeWhiteList.includes(responseJson.code)) {
            if (responseJson && responseJson.code == 401) {
              const userStore = useUserStore()
              userStore.logOut().then(() => {
                router.replace({path: '/login'})
              })
            }
            ElMessage.error(responseJson.message || '网络连接失败，请稍后重试')
            reject(responseJson)
            return;
          }
          
          return resolve({
            data: responseJson.data as T,
            headers: responseHeaders
          })
        }
        if (responseType === 'application/octet-stream') {
          // 二进制格式数据
          const responseBlob = await fetchResponse.clone().blob()
          return resolve({
            data: responseBlob as T,
            headers: responseHeaders
          })
        }
      } catch (e) {
        ElMessage.error('网络连接失败，请稍后重试')
        reject(e)
      } finally {
        done()
      }
    })
  }

  /**
   * http get请求
   * @param url 请求地址
   * @param data 请求数据
   * @returns Promise对象
   */
  get<T = any>(url: string, data?: Record<string, any>): Promise<IFetchResponse<T>> {
    const body = data ? '?' + new URLSearchParams(data).toString() : ''

    return this.request(url + body, {
      method: 'GET'
    })
  }

  /**
   * http post x-www-form-urlencoded请求
   * @param url 请求地址
   * @param data 请求数据
   * @returns Promise对象
   */
  postW<T = any>(url: string, data?: Record<string, any>): Promise<IFetchResponse<T>> {
    const body = data ? new URLSearchParams(data) : ''

    return this.request(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body
    })
  }

  /**
   * http post json请求
   * @param url 请求地址
   * @param data 请求数据
   * @returns Promise对象
   */
  postJ<T = any>(url: string, data?: any): Promise<IFetchResponse<T>> {
    let body

    if ((typeof data === 'object') && (data !== null) && (Array.isArray(data) || !(data instanceof Array))) {
      body = JSON.stringify(data)
    } else {
      body = data
    }

    return this.request(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body
    })
  }
}
