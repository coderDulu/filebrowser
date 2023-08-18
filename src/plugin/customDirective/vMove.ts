import type { App, Directive } from "vue";

/**
 * 给一个元素添加拖拽事件（基于transform）
 * @param document 元素
 */
export function addDragger(document: HTMLElement) {
  let startX: number
  let startY: number
  let lastX: number
  let lastY: number

  // mousemove 触发事件
  const move = function (e: MouseEvent) {
    const currentX = lastX ? lastX + e.clientX - startX : e.clientX - startX;
    const currentY = lastY ? lastY + e.clientY - startY : e.clientY - startY;
    document.style.transform = `translateX(${currentX}px) translateY(${currentY}px)`;
  }

  const moveStop = function () {
    document.removeEventListener('mousemove', move)
    const [X, Y] = document.style.transform.match(/-?\d+/g) ?? []
    lastX = Number(X)
    lastY = Number(Y)
  }

  document.addEventListener("mousedown", function (e) {
    // 如果不是鼠标左键，返回
    if (e.button !== 0) {
      return;
    }
    startX = e.clientX;
    startY = e.clientY;
    document.style.transition = "none";

    document.addEventListener("mousemove", move);
  });

  document.addEventListener('mouseleave', moveStop)
  
  document.addEventListener("mouseup", moveStop);
}

const vMove: Directive & { install: (app: App) => void } = {
  mounted: (el: HTMLElement) => {
    addDragger(el)
  },
  install: (app) => {
    app.directive('move', vMove)
  }
}

export default vMove