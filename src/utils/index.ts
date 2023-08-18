/**
 * 防抖函数
 * @param func 需要运行的函数
 * @param wait 等待时间
 * @param immediate 是否立即执行
 * @returns
 */
export function debounce(func: Function, wait: number, immediate: boolean = false): Function {
  let timeout: any // 定时器
  return function (this: any, ...args: any[]) {
    const context = this // 获取执行上下文
    const later = function () {
      timeout = null
      if (!immediate) {
        func.apply(context, args)
      }
    }
    const callNow = immediate && !timeout
    clearTimeout(timeout)
    timeout = setTimeout(later, wait) // 延时执行
    if (callNow) {
      func.apply(context, args)
    }
  }
}

/**
 * 节流函数
 * @param func 延迟执行的函数
 * @param limit 延迟
 * @returns
 */
export function throttle(func: (...args: any[]) => any, limit: number): (...args: any[]) => void {
  let inThrottle = false
  return function (...args: any[]) {
    // @ts-ignore
    const context = this

    if (!inThrottle) {
      func.apply(context, args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

/**
 * 获取当前时间
 * @returns 当前时间
 */
export function getCurrentTime() {
  return new Date().toTimeString().replace(/\sGMT.*/, '')
}
/**
 * 将对象的值转为字符串
 * @param obj 需要处理的对象
 * @returns
 */
export function objValToStr(obj: any) {
  const newObj = JSON.parse(JSON.stringify(obj))

  if (!(newObj instanceof Object)) return

  for (const key in obj) {
    newObj[key] += ''
  }
  return newObj
}

/**
 * sleep
 * @param delay 等待时间
 * @returns
 */
export function sleep(delay: number = 1000) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('')
    }, delay)
  })
}

export function uniqueJsonArr(arr: object[]) {
  // 通过自定义的字符串化方法实现去重
  const stringify = (obj: object) => JSON.stringify(obj, Object.keys(obj).sort())
  const uniqueArr = Array.from(new Set(arr.map((item) => stringify(item)))).map((item) =>
    JSON.parse(item)
  )
  return uniqueArr
  // return [...new Set(arr.map(JSON.stringify))].map(JSON.parse)
}
