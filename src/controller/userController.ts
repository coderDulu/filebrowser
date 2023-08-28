import db from "../db";
const { userDB } = db;


function login(ctx: CtxType, next: NextType) {
  const test_username = "dudulu";
  const test_password = "dudulu233";


  const { username, password } = ctx.request.body as UserType;
  // 用户验证通过
  if (username === test_username && password == test_password) {
    next();
  } else {
    ctx.status = 401;
    ctx.body = {
      code: 401,
      status: "success",
      message: "用户名或密码错误",
    };
  }
}

export default {
  login,
};
