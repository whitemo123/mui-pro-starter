import FetchRequest from "./request"

/**
 * 业务http请求器
 */
const webRequest = new FetchRequest({
  base: '/api'
});

export default webRequest
