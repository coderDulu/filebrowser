import path from "path";
import FileSystem from "../utils/fileSystem";

import type { ParameterizedContext } from "koa";

const rootPath = "/";
const fileSystem = new FileSystem();

const filesController = async (ctx: ParameterizedContext) => {
  try {
    const { matchPath = "" } = ctx.params;

    const readPath = path.join(rootPath, matchPath);
    // 获取路径信息
    const result = await fileSystem.read(readPath);

    // 响应
    ctx.status = 200;
    // ctx.body = result
    ctx.body = {
      status: 200,
      message: "success",
      data: result,
    };
  } catch (error) {
    ctx.status = 404;
    ctx.body = {
      status: 404,
      message: error.message || "路径读取失败",
      error,
    };
  }
};

export default filesController;
