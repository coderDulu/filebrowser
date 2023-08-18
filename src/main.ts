import { createApp } from 'vue'
import { createPinia } from 'pinia'
import myPlugin from './plugin'
import './assets/base.css'
import 'element-plus/dist/index.css'


import App from './App.vue'
import router from './router'



const app = createApp(App)


app.use(createPinia())
app.use(router)

// 添加自定义指令插件
app.use(myPlugin)


app.mount('#app')
