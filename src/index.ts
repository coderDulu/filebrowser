import Koa from "koa";
import Router = require("koa-router");
import bodyParser from "koa-bodyparser";
import logger from "koa-logger";

// import db from "./db";
// const { userDB } = db;

import filesController from "./controller/filesController";
import jwtUtils from "./utils/jwt";
import userController from "./controller/userController";

const app = new Koa();
const router = new Router();

const PORT = 5100;

app.use(logger());
app.use(bodyParser());

router.get("", (ctx) => {});

// 文件列表
router.get("/api/files:matchPath(.*)",jwtUtils.authenticateJWT, filesController);

// 登录
router.post("/api/login", userController.logion, jwtUtils.getToken);

app.use(router.routes()).use(router.allowedMethods());

app.listen(PORT, () => {
  console.log("服务器已启动，监听端口" + PORT);
});
