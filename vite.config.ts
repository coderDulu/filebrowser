import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { fileURLToPath, URL } from 'node:url'
import vueJsx from '@vitejs/plugin-vue-jsx'


import path from 'node:path'

const pathSrc = path.resolve(__dirname, 'src')

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    vue(),
    vueJsx(),
    AutoImport({
      resolvers: [
        ElementPlusResolver(), // 自动导入图标组件
      ],
      dts: path.resolve(pathSrc, 'auto-imports.d.ts')
    }),
    Components({
      resolvers: [ElementPlusResolver()]
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    proxy: {
      '/api': {
        target: "http://localhost:5100"
      }
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "@/assets/common.scss";'
      }
    }
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      cache: true,
      treeshake: true,
      output: {
        sourcemap: false,
        manualChunks: {
          'animate.css': ['animate.css'],
          'element-plus': ['element-plus']
        },
        chunkFileNames: 'assets/js/[name].[hash].js',
        assetFileNames: (chunkInfo) => {
          // 用后缀名称进行区别处理
          // 处理其他资源文件名 e.g. css png 等
          let subDir = 'images'

          const extName = path.extname(chunkInfo.name || '')
          if (extName.match(/\.(css)/)) {
            subDir = 'css'
          } else if (extName.match(/\.woff2?|\.ttf/)) {
            subDir = 'font'
          }

          return `assets/${subDir}/[name].[hash].[ext]`
        }
      }
    },
    emptyOutDir: true,
    target: 'es2019'
  }
})
