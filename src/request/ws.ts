
interface WebSocketMessage {
  id: string
  [key: string]: any
}

type WebSocketCallback = (data: any) => void

class WebSocketClient {
  private socket: WebSocket | undefined
  private callbacks: { [id: string]: WebSocketCallback } = {}
  private isConnect: boolean = false
  private saveMsg: string[] = []

  constructor(private url: string) {}

  public connect(): void {
    if ('WebSocket' in window) {
      this.socket = new WebSocket(this.url, ['json'])
      // 连接成功
      this.socket.onopen = () => {
        console.log('WebSocket connected')
        this.isConnect = true
        this.saveMsg.forEach((message) => {
          console.log(
            '%c [ message ]-22',
            'font-size:13px; background:pink; color:#bf2c9f;',
            message
          )
          this.socket?.send(message)
        })
      }
      // 监听消息
      this.socket.onmessage = (event: MessageEvent) => this.handleMessage(event)
      // 连接失败
      this.socket.onerror = () => {
        console.error('服务器连接失败') 
      }
    } else {
      alert('当前浏览器不支持Websocket协议，请升级或更换浏览器！')
    }
  }

  public send(data: any, callback?: WebSocketCallback): void {
    // const id = Math.random().toString(36).substring(2, 12);
    // const id = `${data.name}`
    if (callback) {
      this.callbacks[data.name] = callback
    }
    const message: WebSocketMessage = { ...data }
    const sendMsg = JSON.stringify(message)
    if (this.isConnect) {
      this.socket?.send(sendMsg)
    } else {
      this.saveMsg.push(sendMsg)
    }
  }

  public close = () => {
    console.log('ws close')
    this.socket?.close()
  }

  private handleMessage(event: MessageEvent): void {
    const message: WebSocketMessage = JSON.parse(event.data)
    const id = `${message.name}`
    const callback = this.callbacks[id]
    if (callback) {
      callback(message)
      delete this.callbacks[message.id]
    }
  }
}

export default WebSocketClient
