import { createApp } from "vue"
import { initRouter } from "./router"
import { initStore } from "./store"
import "virtual:svg-icons-register"
import App from "@/App.vue"
import { registryGlobalComponent } from "./components/common"

const app = createApp(App)
initStore(app)
initRouter(app)
// 全局注册组件
registryGlobalComponent(app)
app.mount("#app")
