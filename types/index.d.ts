import type { ParameterizedContext } from "koa";

// 现在声明进入全局命名空间的类型，或者增加全局命名空间中的现有声明。
declare global {
  /**
   * User
   * @param {string} username
   * @param {string} password
   */
  interface UserType {
    username: string;
    password: string;
  }

  // ctx类型
  type CtxType = ParameterizedContext & {
    body: ErrorRepType | SuccessRepType
  };
  // next函数类型
  type NextType<T = any> = () => Promise<T>;

  /**
   * 响应类型
   *
   * @param {string} status 状态
   * @param {number} code 响应码
   * @param {string} message 相应消息
   */
  type RepType = {
    status: string;
    code: number;
    message: string;
  };
  /**
   * 错误响应
   *
   * @param {object} err 错误详情
   */
  interface ErrorRepType extends RepType {
    error?: {
      type: string;
      details: string;
    };
  }

  /**
   * 成功响应
   *
   * @param {T = object} data 响应体
   */
  interface SuccessRepType<T = object> extends RepType {
    data?: T;
  }
}
