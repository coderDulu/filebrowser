import path from "path";
import FileSystem from "../utils/fileSystem";
// import type { SuccessRepType } from '../../types/index'

import type { ParameterizedContext } from "koa";

const rootPath = "/";
const fileSystem = new FileSystem();

const filesController = async (ctx: ParameterizedContext) => {
  try {
    const { matchPath = "" } = ctx.params;

    const readPath = path.join(rootPath, matchPath);
    // 获取路径信息
    const data = await fileSystem.read(readPath);

    // 响应
    ctx.status = 200;

    const response: SuccessRepType = {
      status: "success",
      code: 200,
      message: "get info success",
      data,
    };

    ctx.body = response;
  } catch (error) {
    ctx.status = 404;

    (ctx.body as ErrorRepType) = {
      status: "error",
      code: 404,
      message: error.message || "路径读取失败",
      error,
    };
  }
};

export default filesController;
