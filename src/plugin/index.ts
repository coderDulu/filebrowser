import type { App } from 'vue'
import customDirective from './customDirective'

// export {
//   customDirective,
//   vEcharts
// }

export default {
  install: (app: App) => {
    app.use(customDirective)
  }
}