import { request } from '..'

export default {
  getFiles: <T>(url: string) => request.get<T>(url)
}