import { createApp } from "vue"
// 1.1 安装后 导入
import router from "./router"
import App from "@/App.vue"
import store from "./store"

const app = createApp(App)
// 1.2. use挂载
app.use(router).use(store)

app.mount("#app")
