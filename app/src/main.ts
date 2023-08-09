// import './assets/main.css'

import { createApp } from 'vue'
import '@/assets/css/common.less'
import '@/assets/css/various.less'
import { createPinia } from 'pinia'
import i18n from '@/locale/index'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import App from './App.vue'
import router from './router'

const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(createPinia()).use(router).use(i18n).use(ElementPlus)

app.mount('#app')
