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
import legacy from "@vitejs/plugin-legacy" //  兼容浏览器插件
import viteCompression from "vite-plugin-compression" // 生产环境压缩
import { visualizer } from "rollup-plugin-visualizer" // 生产环境打包后分析

const resolve = path.resolve
const subPkgName: Array<string> = ["element-plus", "axios", "vue", "lodash"]
function checkPakName(name: string) {
  return subPkgName.find((n) => name.includes(n))
}

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
      viteCompression(), // 打包压缩，主要是本地gzip，如果服务器配置压缩也可以
      legacy({
        // 浏览器兼容 会改变下面分包静态文件的路径，所以配置 assetsDir
        targets: ["Android > 39", "Chrome >= 60", "Safari >= 10.1", "iOS >= 10.3", "Firefox >= 54", "Edge >= 15"]
      }),
      visualizer() // 分析插件 放到最后
    ],
    build: {
      assetsDir: "static/assets",
      terserOptions: {
        // 生产环境移除console
        compress: {
          // drop_console: true,
          drop_debugger: true
        },
        output: {
          // 去掉注释内容
          comments: true
        }
      },
      // 生产环境 构建配置
      rollupOptions: {
        output: {
          assetFileNames: (assetInfo) => {
            const info = assetInfo.name.split(".")
            let extType = info[info.length - 1]
            if (/\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/i.test(assetInfo.name)) {
              extType = "media"
            } else if (/\.(png|jpe?g|gif|svg)(\?.*)?$/.test(assetInfo.name)) {
              extType = "img"
            } else if (/\.(woff2?|eot|ttf|otf)(\?.*)?$/i.test(assetInfo.name)) {
              extType = "fonts"
            }
            return `static/${extType}/[name]-[hash][extname]`
          },
          chunkFileNames: "static/js/[name]-[hash].js",
          entryFileNames: "static/js/[name]-[hash].js"
        },
        manualChunks(id) {
          // 生产环境 分包
          let name
          if (id.includes("node_modules") && (name = checkPakName(id))) {
            return `lib/${name}`
          } else if (id.includes("node_modules")) {
            return "vendor"
          }
        }
      }
    },
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
