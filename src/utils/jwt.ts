import jwt from "jsonwebtoken";
import type { ParameterizedContext } from "koa";

const secret = "c7b3b0ae-3b9f-4e6d-89ca-ae037301bfa0";

/**
 * 获取token
 * @param ctx
 */
const getToken = (ctx: ParameterizedContext) => {
  try {
    const { username, password } = ctx.request.body as any;
    const token = ctx.request.headers.authorization?.split(" ")[1];

    //   生成新token
    const createNewToken = () => {
      const user = {
        username,
        password,
      };
      const new_token = jwt.sign(user, secret, { expiresIn: "1h" });
      ctx.body = {
        status: 200,
        message: "success",
        data: {
          token: new_token,
        },
      };
    };

    //   不存在token则生成，否则返回未过期token
    if (!token) {
      createNewToken();
    } else {
      try {
        const decoded = jwt.verify(token, secret);
        ctx.state.user = decoded; // 将用户信息存储在ctx.state.user中
        //   token未过期，直接返回
        ctx.body = {
          status: 200,
          message: "success",
          token,
        };
      } catch (err) {
        // token过期
        createNewToken();
      }
    }
  } catch (error) {
    console.log(error);
  }
};

/**
 * jwt验证中间件
 * @param {CtxType} ctx
 * @param {NextType} next
 * @returns
 */
const authenticateJWT = (
  ctx: ParameterizedContext,
  next: NextType
) => {
  const token = ctx.request.headers.authorization?.split(" ")[1];

  if (!token) {
    ctx.status = 401;

    const result: ErrorRepType = {
      status: "error",
      code: 401,
      message: "验证失败，请重新登录",
      error: {
        type: "NotFoundError",
        details: "not found token",
      },
    };

    ctx.body = result;
  }

  try {
    const decoded = jwt.verify(token, secret);
    ctx.state.user = decoded; // 将用户信息存储在ctx.state.user中
    return next();
  } catch (err) {
    ctx.status = 401;
    // 响应
    const result: ErrorRepType = {
      status: "error",
      code: 401,
      message: "验证失败，请重新登录",
      error: {
        type: "Verification failure",
        details: "token 过期",
      },
    };

    ctx.body = result;
  }
};

export default {
  authenticateJWT,
  getToken,
};
