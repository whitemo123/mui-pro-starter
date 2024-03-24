import { App } from "vue";
import store from "@/store";

export default (app: App) => {
  app.use(store)
}