import { createI18n } from 'vue-i18n'
import cn from './lang/zh-TC'
import en from './lang/en-US'

const messages = {
  cn: cn,
  en: en
}

const i18n = createI18n({
  globalInjection: true,
  locale: 'cn',
  messages,
  legacy: false
})

export default i18n
