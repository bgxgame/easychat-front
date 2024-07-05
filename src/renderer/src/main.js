import { createApp } from 'vue'
import App from './App.vue'

// 引入 Element UI
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

// 引入全局主题颜色
import '@/assets/cust-elementplus.scss'
import '@/assets/base.scss'

// icons
import '@/assets/icon/iconfont.css'

// 国际化
import zhCn from 'element-plus/es/locale/lang/zh-cn'
// Router
import router from '@/router'

// 引入自定义Utils Verfiy
import Utils from '@/utils/Utils.js'
import Verify from '@/utils/Verify.js'

const app = createApp(App)

app.use(router)

app.use(ElementPlus, {
  locale: zhCn
})

// 将Utils Verfiy 作为全局变量
app.config.globalProperties.Utils = Utils;
app.config.globalProperties.Verify = Verify;
app.mount('#app')
