import type { } from '../types/global'

function logion(ctx: CtxType, next: NextType) {
  const test_username = "dudulu";
  const test_password = "dudulu233";

  const { username, password } = ctx.request.body as UserType;
  // 用户验证通过
  if (username === test_username && password == test_password) {
    next();
  } else {
    ctx.status = 401;
    ctx.body = {
      status: 401,
      message: "用户名或密码错误",
    };
  }
}

export default {
    logion
}