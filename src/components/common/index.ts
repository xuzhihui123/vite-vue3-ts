import { App, defineAsyncComponent } from "vue"

export function registryGlobalComponent(app: App) {
  app.component(
    "SvgIcon",
    defineAsyncComponent(() => import("./SvgIcon.vue"))
  )
  app.component(
    "TestCom",
    defineAsyncComponent(() => import("./TestCom.vue"))
  )
}
