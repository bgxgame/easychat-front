import { createApp } from 'vue'
import App from './App.vue'

// 引入 Element UI
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// 国际化
import zhCn from 'element-plus/es/locale/lang/zh-cn'
// Router
import router from '@/router'

const app = createApp(App)

app.use(router)

app.use(ElementPlus, {
  locale: zhCn
})
app.mount('#app')
