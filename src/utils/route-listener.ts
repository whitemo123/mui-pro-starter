import mitt from 'mitt'
import type { Handler } from 'mitt'
import type { RouteLocationNormalized } from 'vue-router'

const emitter = mitt();

// listener key
const key = Symbol('ROUTE_CHANGE');

let latestRoute: RouteLocationNormalized;

/**
 * @description 设置route订阅
 * @param to 待跳转的路由
 */
export function setRouteEmitter(to: RouteLocationNormalized) {
  emitter.emit(key, to);
  latestRoute = to;
}

/**
 * @description 监听的路由变化
 * @param handler 
 * @param immediate 
 */
export function listenerRouteChange(
  handler: (route: RouteLocationNormalized) => void,
  immediate = true
) {
  emitter.on(key, handler as Handler);
  if (immediate && latestRoute) {
    handler(latestRoute);
  }
}

/**
 * @description 移除route监听
 */
export function removeRouteListener() {
  emitter.off(key);
}
