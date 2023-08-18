import type { App } from 'vue'
import './style/css/vImage.css'

interface Option {
  error?: string
  loading?: string
}

// 创建 Intersection Observer 实例
const addLazy = (el: HTMLImageElement, src: string, options: Option = {}) => {
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // 目标元素进入视口
        const lazyImage = entry.target as HTMLImageElement

        if (src) {
          lazyImage.src = src // 加载真实图片
        } else {
          //   lazyImage.src = error // 加载失败图片
          lazyImage.alt = ''
          lazyImage.src = ''
          //   lazyImage.classList.add('lazy-error')
        }

        lazyImage.onerror = function () {
          lazyImage.classList.add('lazy-error')
        }

        lazyImage.onload = function () {
          // 图片加载完成后，移除观察器，并添加过渡效果
          lazyImage.classList.add('loaded')
          observer.unobserve(lazyImage)
        }

        lazyImage.loading = 'lazy'
      }
    })
  })
  observer.observe(el)
}

const vImage: { install: (app: App, options?: Option) => void } = {
  install(app, options) {
    // 设置指令
    app.directive('lazy-image', {
      mounted(el: HTMLImageElement, binding) {
        const { value } = binding
        // el.loading = 'lazy'
        // el.src = value
        addLazy(el, value, options)
      }
    })
  }
}

export default vImage
