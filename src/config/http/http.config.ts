// 成功类型
export const baseURL: string = import.meta.env.MODE === "development" ? "/" : `${import.meta.env.VITE_RES_URL}`
// 配后端数据的接收方式application/json;charset=UTF-8 或 application/x-www-form-urlencoded;charset=UTF-8
export const contentType = "application/json;charset=UTF-8"
// 最长请求时间
export const requestTimeout = 10000
// 超时尝试次数
export const timeoutNum = 3
// 超时重新请求间隔
export const intervalTime = 1000

// 数据状态的字段名称
export const statusName = "code"
// 状态信息的字段名称
export const messageName = "msg"

export const CODE_MESSAGE: Record<number, string> = {
  200: "服务器成功返回请求数据",
  201: "新建或修改数据成功",
  202: "一个请求已经进入后台排队(异步任务)",
  204: "删除数据成功",
  400: "发出信息有误",
  401: "用户没有权限(令牌失效、用户名、密码错误、登录过期)",
  402: "前端无痛刷新token",
  403: "用户得到授权，但是访问是被禁止的",
  404: "访问资源不存在",
  406: "请求格式不可得",
  410: "请求资源被永久删除，且不会被看到",
  500: "服务器发生错误",
  502: "网关错误",
  503: "服务不可用，服务器暂时过载或维护",
  504: "网关超时"
}
