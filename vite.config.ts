import { defineConfig, loadEnv } from "vite"
// 导入类型
// import type { UserConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import * as path from "path"
import vueJsx from "@vitejs/plugin-vue-jsx" // jsx

const resolve = path.resolve

export default ({ mode }) => {
  // loadEnv方法拿到.env.production或者开发环境设置的环境变量
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) }

  return defineConfig({
    define: {
      // 客户端没有process.env这个概念，这样定义可以在客户端中拿到process.env.TEST_VARIABLE -> 也就是在package.json中cross-env定义的变量 ，
      "process.env": {
        ...process.env
      }
    },
    plugins: [
      vue(),
      vueJsx({
        // options are passed on to @vue/babel-plugin-jsx
      })
    ],
    resolve: {
      // 别名
      // 配置别名
      alias: {
        "@": resolve(__dirname, "src")
      },
      extensions: [".js", ".json", ".ts", ".vue"] // 使用路径别名时想要省略的后缀名
    },
    server: {
      port: 3000
    }
  })
}
