import { createRouter, createWebHashHistory } from "vue-router"
import { App } from "vue"
import routes from "./routesConfig"

const router = createRouter({
  // history 模式,hash模式:createWebHashHistory()
  history: createWebHashHistory(),
  routes
})

export function initRouter(app: App) {
  app.use(router)
}

export default router
