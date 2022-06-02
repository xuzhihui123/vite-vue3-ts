import { App } from "vue"
import SvgIcon from "./SvgIcon.vue"
export function registryGlobalComponent(app: App) {
  app.component("SvgIcon", SvgIcon)
}
