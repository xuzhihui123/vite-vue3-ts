import { App } from "vue"
import SvgIcon from "./SvgIcon.vue"
import TestCom from "./TestCom.vue"
export function registryGlobalComponent(app: App) {
  app.component("SvgIcon", SvgIcon)
  app.component("TestCom", TestCom)
}
