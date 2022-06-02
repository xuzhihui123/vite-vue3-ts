import axios, { AxiosResponse, AxiosRequestConfig, CancelTokenStatic, AxiosInstance } from "axios"
import { baseURL, requestTimeout, statusName, messageName, CODE_MESSAGE } from "@/config/http.config"
import qs from "qs" // 参数序列化

// 返回数据类型
interface IResponse {
  code: number | string
  msg: string
  data: any
}

class MyRequest {
  // `baseURL` 将自动加在 `url` 前面，除非 `url` 是一个绝对 URL。
  protected service: AxiosInstance = axios
  protected pending: Array<{ url: string; cancel: (...args: any[]) => void }> = []
  protected CancelToken: CancelTokenStatic = axios.CancelToken
  protected axiosRequestConfig: AxiosRequestConfig = {}
  private static _instance: MyRequest

  constructor() {
    this.requestConfig()
    this.service = axios.create(this.axiosRequestConfig)
    this.interceptorsRequest() // 请求拦截器
    this.interceptorsResponse() // 响应拦截器
  }

  /**
   * 初始化配置
   * @protected
   */
  protected requestConfig(): void {
    this.axiosRequestConfig = {
      baseURL: baseURL,
      headers: {
        // timestamp: new Date().getTime(),
        // "Content-Type": contentType
      },
      // transformRequest: [obj => qs.stringify(obj)],
      transformResponse: [
        function (data: AxiosResponse) {
          return data
        }
      ],
      // paramsSerializer: function (params: any) {
      //   return qs.stringify(params, { arrayFormat: "brackets" })
      // },
      timeout: requestTimeout
      // withCredentials: false,
      // responseType: "json",
      // xsrfCookieName: "XSRF-TOKEN",
      // xsrfHeaderName: "X-XSRF-TOKEN",
      // maxRedirects: 5,
      // maxContentLength: 2000,
      // validateStatus: function (status: number) {
      //   return status >= 200 && status < 500
      // }
      // httpAgent: new http.Agent({keepAlive: true}),
      // httpsAgent: new https.Agent({keepAlive: true})
    }
  }

  /**
   * 请求拦截
   * @protected
   */
  protected interceptorsRequest(): void {
    this.service.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        const keyOfRequest = this.getKeyOfRequest(config)
        this.removePending(keyOfRequest, true)
        config.cancelToken = new this.CancelToken((c: (...args: any[]) => void) => {
          this.pending.push({
            url: keyOfRequest,
            cancel: c
          })
        })
        // this.requestLog(config)  打印请求日志
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )
  }

  /**
   * 响应拦截
   * @protected
   */
  protected interceptorsResponse(): void {
    this.service.interceptors.response.use(
      (response: AxiosResponse) => {
        // 是mock数据转一把
        this.isMockRequest(response.config.url!) && (response.data = JSON.parse(response.data))
        return this.handleResponse(response)
      },
      (error) => {
        const { response } = error
        if (response === undefined) {
          return Promise.reject(new Error(error))
        } else {
          return this.handleResponse(response)
        }
      }
    )
  }

  protected isMockRequest(url: string) {
    return url.indexOf("/mock") === 0
  }

  protected handleResponse(response: AxiosResponse): Promise<AxiosResponse<any>> {
    this.responseLog(response) // 打印响应数据日志 开发环境有效
    this.removePending(this.getKeyOfRequest(response.config))
    const { data, status, statusText } = response
    const code = data && data[statusName] ? data[statusName] : status
    switch (code) {
      case 200:
        return Promise.resolve(response) // 返回最终数据
      case 401:
        // TODO token失效,跳转登录页
        break
      case 403:
        // TODO 没有权限,跳转403页面
        break
    }
    // 异常处理 后期需要处理
    const errMsg = data && data[messageName] ? data[messageName] : CODE_MESSAGE[code] ? CODE_MESSAGE[code] : statusText
    return Promise.reject(errMsg)
  }

  /**
   * 取消重复请求
   * @protected
   * @param key
   * @param request
   */
  protected removePending(key: string, request = false): void {
    this.pending.some((item, index) => {
      if (item.url === key) {
        if (request) console.error("=====  取消重复请求  =====", item)
        item.cancel()
        this.pending.splice(index, 1)
        return true
      }
      return false
    })
  }

  /**
   * 获取请求配置拼装的key
   * @param config
   * @protected
   */
  protected getKeyOfRequest(config: AxiosRequestConfig): string {
    let key = config.url
    if (config.params) key += JSON.stringify(config.params)
    if (config.data) key += JSON.stringify(config.data)
    key += `&request_type=${config.method}`
    return key as string
  }

  /**
   * 请求日志
   * @param config
   * @protected
   */
  protected requestLog(config: any): void {
    console.log(config)
  }

  /**
   * 响应日志
   * @protected
   * @param response
   */
  protected responseLog(response: AxiosResponse) {
    if (import.meta.env.MODE === "development") {
      const randomColor = `rgba(${Math.round(Math.random() * 255)},${Math.round(Math.random() * 255)},${Math.round(
        Math.random() * 255
      )})`
      console.log("%c┍------------------------------------------------------------------┑", `color:${randomColor};`)
      console.log("| 请求地址：", response.config.url)
      console.log("| 请求参数：", qs.parse(response.config.data))
      console.log("| 返回数据：", response.data)
      console.log("%c┕------------------------------------------------------------------┙", `color:${randomColor};`)
    }
  }

  /**
   * post方法
   * @param url
   * @param data
   * @param config
   */
  public post(url: string, data: any = {}, config: object = {}): Promise<IResponse> {
    return new Promise((resolve, reject) => {
      this.service.post(url, data, config).then((result) => {
        resolve(result.data)
      }, reject)
    })
  }

  /**
   * post方法
   * @param url
   * @param params
   * @param config
   */
  public get(url: string, params: any = {}, config: object = {}): Promise<IResponse> {
    return new Promise((resolve, reject) => {
      this.service.get(`${url}?${qs.stringify(params)}`, config).then((result) => {
        resolve(result.data)
      }, reject)
    })
  }

  /**
   * 创建唯一实例（单例模式）
   */
  public static getInstance(): MyRequest {
    // 如果 instance 是一个实例 直接返回，  如果不是 实例化后返回
    this._instance || (this._instance = new MyRequest())
    return this._instance
  }
}

export default MyRequest.getInstance()
