import Koa from 'koa'
import Router from 'koa-router'
import { koaBody } from 'koa-body';
import serve from "koa-static";
import WebSocket from 'ws';
import path from 'path'

import controllers from './controllers/index';
import { logInfo } from './apis/nodeDiagnosis'

import uploadControllers from './controllers/upload'
import { parseWs } from './controllers/ws';
// @ts-ignore
import history from 'koa-connect-history-api-fallback';

const app = new Koa()
const router = new Router()

app.use(history());

// 静态资源文件
app.use(serve(path.join(__dirname, '../dist'), {
  gzip: true,
  extensions: ['html']
}));

// 解析body
app.use(koaBody({
  multipart: true,
  formidable: {
    keepExtensions: true,
    // uploadDir: path.join(__dirname, "./upload"),
  },
}));

router.post(/(cgi-bin)?\/web.fcgi/, controllers)  // 接口处理

router.get(/\/nbmesh\.log/, (ctx) => {
  ctx.body = logInfo
})

router.post("/upload", uploadControllers) // 文件上传




// 注册路由
app.use(router.routes())
// 自动丰富 response 相应头，当未设置响应状态(status)的时候自动设置，在所有路由中间件最后设置(全局，推荐)，也可以设置具体某一个路由（局部），例如：router.get('/index', router.allowedMethods()); 这相当于当访问 /index 时才设置
app.use(router.allowedMethods())

const PORT = 3100
const server = app.listen(PORT, () => {
  console.log(`监听${PORT}端口`)
})


// 在HTTP服务器上绑定WebSocket服务器
const ws = new WebSocket.Server({ port: 6080 });
server.on('upgrade', (request, socket, head) => {
  ws.handleUpgrade(request, socket, head, (socket) => {
    ws.emit('connection', socket, request);
  });
});


ws.on('connection', (socket) => {
  console.log('WebSocket connection');
  parseWs(socket)
})