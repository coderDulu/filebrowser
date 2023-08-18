/**
 * 添加监听resize
 */
class AddResize {
  fns = new Map()

  constructor() {
    window.addEventListener('resize', () => {
      this.fns.forEach(fn => fn());
    })
  }

  add(id: string, callback: Function) {
    if(!this.fns.get(id)) {
      this.fns.set(id, callback);
    }
  }

  clear() {
    this.fns.clear()
  }

  remove(id: string) {
    this.fns.delete(id);
  }
}

export default new AddResize()

/**
 * 给对应的HTML元素添加上resize监听，执行回调
 * @param item div元素
 * @param callback 回调函数
 */
export function addResizeObserver(item: HTMLElement, callback: Function) {
  const resizeObserver = new ResizeObserver(() => {
    callback();
  });

  resizeObserver.observe(item);
}
