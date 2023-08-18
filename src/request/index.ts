import axios from 'axios';
import type { AxiosRequestConfig, AxiosInstance } from 'axios'
import WebSocketClient from '@/request/ws';

interface IResponseData<T = any> {
  result: string;
  value?: T;
  message: string;
}

export const baseURL = import.meta.env.MODE === "development" ? "/api" : `http://${location.host}/cgi-bin`
const wsUrl = import.meta.env.MODE === "development" ? `ws://${location.host}/ws` : `ws://${location.hostname}:6080`

class Request {
  private instance: AxiosInstance;
  constructor() {
    this.instance = axios.create({
      baseURL,
      // timeout: 10000,                           // 设置超时时间
    });
    // 添加请求拦截器
    this.instance.interceptors.request.use(
      (config) => {
        if (!config.headers['Content-Type']) {
          // config.headers['Content-Type'] = config.headers['Content-Type']
          config.headers['Content-Type'] = 'application/json'
        }

        return Promise.resolve(config)
      },
      (error: any) => {
        return Promise.reject(error);
      }
    );
    // 添加响应拦截器
    this.instance.interceptors.response.use(
      (response) => {
        // 业务逻辑处理
        const resData: IResponseData = response.data;

        if (resData.result === "00") {
          const data = resData.value ?? resData
          return Promise.resolve(data);
        } else {
          return Promise.reject(new Error(resData.message ?? 'error'));
        } 
      },
      (error) => {
        const { response: { status } } = error
        switch (status) {
          case 404:
            console.error(new Error('请求不存在'));
            break;
          case 500:
            console.error(new Error("服务器错误"));
            break;
          default:
            console.error(new Error("请求错误"))
        }
        // 处理响应错误，例如服务端错误等
        return Promise.reject(error);
      }
    );
  }
  public request<T>(config: AxiosRequestConfig): Promise<T> {
    return this.instance.request(config);
  }
  public get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.request<T>({ ...config, url, method: 'get' });
  }
  public post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    return this.request<T>({ ...config, url, method: 'post', data });
  }
}
export default Request;

export const request = new Request()

export const createWsClient = () => new WebSocketClient(wsUrl)