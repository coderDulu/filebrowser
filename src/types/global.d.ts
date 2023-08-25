import type { ParameterizedContext } from "koa";

declare global {
  /**
   * 现在声明进入全局命名空间的类型，或者增加全局命名空间中的现有声明。
   */
  interface UserType {
    username: string;
    password: string;
  }

  type CtxType = ParameterizedContext;
  type NextType = () => Promise<any>;
}

