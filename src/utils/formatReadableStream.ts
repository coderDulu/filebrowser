type EventNameType = 'data' | 'end'

class FormatReadableStream extends EventTarget {
  events = new Map()
  reader: ReadableStreamDefaultReader | null = null
  running = true

  constructor(readableStream: ReadableStream) {
    super()
    this.handle(readableStream)
  }

  async handle(readableStream: ReadableStream) {
    const textDecoder = new TextDecoderStream('utf-8')
    readableStream.pipeTo(textDecoder.writable)
    const reader = textDecoder.readable.getReader()
    this.reader = reader
    let result = ''

    try {
      while (readableStream.locked && this.running) {
        const { done, value } = await reader.read()

        if (done) {
          // 数据流读取完毕，触发结束事件
          this.triggerEvent('end', result)
          reader.releaseLock()
          this.running = false
          break
        }
        result += value

        this.triggerEvent('data', value)
      }
      console.log('close')
    } catch (error: any) {
      console.error(error)
    } finally {
      reader.releaseLock()
    }
  }

  on(key: EventNameType, fn: (data: string) => void) {
    this.events.set(key, fn)
  }

  // 触发事件
  triggerEvent(eventName: EventNameType, eventData?: any) {
    const event = this.events.get(eventName)
    if (event) {
      event(eventData)
    }
  }

  async close() {
    this.running = false
    await this.reader?.cancel()
    this.reader?.releaseLock()
  }

}

export default FormatReadableStream
