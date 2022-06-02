import { createPinia } from "pinia"
import { App } from "vue"

const store = createPinia()

export function initStore(app: App) {
  app.use(store)
}

export default store
