/// <reference types="vite/client" />
import type * as Icons from '@element-plus/icons-vue'

declare global {
  type Icon = keyof typeof Icons
}
