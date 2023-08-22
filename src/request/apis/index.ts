import { request } from '..'

interface ResponseType {
  status: number
  message: string
  error?: {
    [key: string]: string
  }
  data?: {
    [key: string]: string
  }
}

/**
 * 获取文件路径列表信息
 * @param path 路径
 * @returns
 */
export const getFiles = <T>(path: string) => request.get<T>(path)

/**
 * 登录
 * @param data 用户信息
 * @returns token
 */
export const login = (data: { username: string; password: string }) =>
  request.post<{token: string}>('/login', data)
