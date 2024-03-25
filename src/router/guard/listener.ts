import { setRouteEmitter } from "@/utils/route-listener";
import type { Router } from "vue-router";

export default function listenerGuard(router: Router) {
  router.beforeEach((to) => {
    setRouteEmitter(to)
  })
}
