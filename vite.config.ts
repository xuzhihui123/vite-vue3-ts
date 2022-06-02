import { defineConfig, loadEnv, ConfigEnv } from "vite"
// 导入类型
// import type { UserConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import * as path from "path"
import vueJsx from "@vitejs/plugin-vue-jsx" // jsx
import { viteMockServe } from "vite-plugin-mock" // mock
import { createSvgIconsPlugin } from "vite-plugin-svg-icons" // svg
import AutoImport from "unplugin-auto-import/vite"
import Components from "unplugin-vue-components/vite"
import { ElementPlusResolver } from "unplugin-vue-components/resolvers"

import viteCompression from "vite-plugin-compression" // 生产环境压缩

const resolve = path.resolve

export default ({ mode }: ConfigEnv) => {
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
      }),
      viteMockServe({
        mockPath: "./src/mock",
        supportTs: true //如果使用 js发开，则需要配置 supportTs 为 false
      }),
      AutoImport({
        resolvers: [ElementPlusResolver()]
      }),
      Components({
        resolvers: [ElementPlusResolver()]
      }),
      createSvgIconsPlugin({
        // 指定要缓存的图标文件夹
        iconDirs: [resolve(process.cwd(), "src/assets/svg")],
        // 执行icon name的格式
        symbolId: "icon-[dir]-[name]"
      }),
      viteCompression() // 打包压缩，主要是本地gzip，如果服务器配置压缩也可以
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
