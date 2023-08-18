import type { WebSocket } from 'ws'

import { wsInterface } from '../apis/network'
import { RESULT_ERROR } from '../apis'

interface Result {
  sendData: any
  repeat?: boolean
}

let timer: any
// 监听ws接口请求
export function parseWs(socket: WebSocket) {
  socket.on('message', (message) => {
    try {
      const req = JSON.parse(message.toString())
      const result: Result | undefined = paresWsReq(req, [wsInterface]) as any // 获取处理接口后的返回数据

      if (result) {
        const { sendData, repeat } = result

        // 最终发送的数据
        const data = JSON.stringify({
          name: req.name,
          ...sendData
        })
        console.log(data)

        if (repeat) {
          // 开启循环发送
          timer = setInterval(() => {
            socket.send(data)
          }, 1000)
        } else {
          timer && clearInterval(timer)
          socket.send(data)
        }
      } else {
        // 错误
        socket.send(JSON.stringify({ ...RESULT_ERROR, name: req?.name }))
      }
    } catch (error) {
      console.error(error)
      socket.send(JSON.stringify({ ...RESULT_ERROR }))
    }
  })
}

// 处理接口请求数据
function paresWsReq(
  req: {
    name: string
    action: string
    value: any
  },
  controllers: any[]
) {
  try {
    const { name, action } = req
    console.log(req)

    let result
    // 从处理器中读取对应的处理数据
    controllers.forEach((c) => {
      if (name in c && action in c[name]) {
        result = c[name][action]()
      }
    })
    return result
  } catch (error) {
    console.log(error)
  }
}
