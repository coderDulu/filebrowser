import type { App } from 'vue'
import move from './vMove'
import scroll from './vScroll'


const directive: any = {
  move,
  scroll,
}

export default {
  install: (app: App) => {
    Object.keys(directive).forEach((value) => {;
      app.directive(value, directive[value])
    })
  }
}
