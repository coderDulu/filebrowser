import type * as Icons from '@element-plus/icons-vue'
import { defineAsyncComponent } from 'vue'

type IconType = keyof typeof Icons

const useIcons = (name: IconType) =>
  defineAsyncComponent(async () => {
    const res = await import('@element-plus/icons-vue')
    return res[name]
  })

export default useIcons
