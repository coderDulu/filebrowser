import jwt from "jsonwebtoken";
import type { ParameterizedContext } from "koa";
// import {UserType} from '../types/global'

const secret = "c7b3b0ae-3b9f-4e6d-89ca-ae037301bfa0";

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

    //   不存在token则生成
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
 * @param {*} ctx
 * @param {*} next
 * @returns
 */
const authenticateJWT = (
  ctx: ParameterizedContext,
  next: () => Promise<any>
) => {
  const token = ctx.request.headers.authorization?.split(" ")[1];

  if (!token) {
    ctx.throw(401, "没有访问权限"); // 返回401未授权错误
  }

  try {
    const decoded = jwt.verify(token, secret);
    ctx.state.user = decoded; // 将用户信息存储在ctx.state.user中
    return next();
  } catch (err) {
    ctx.throw(403, "token 验证失败，请重新登录"); // 返回403禁止访问错误
  }
};

export default {
  authenticateJWT,
  getToken,
};
