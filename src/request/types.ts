/**
 * fetch request构造配置
 */
export interface IFetchRequestOptions {
  // baseUrl
  base: string;
  // 网络超时时间
  timeOut?: number;
  // 默认请求头
  headers?: Record<string, any>
}

/**
 * fetch response构造配置
 */
export interface IFetchResponse<T = any> {
  data: T;
  headers: any;
}
