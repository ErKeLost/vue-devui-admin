import { createApp } from 'vue'
import 'uno.css'
import App from './App.vue'
import '@devui-design/icons/icomoon/devui-icon.css'
import { ThemeServiceInit, infinityTheme } from 'devui-theme'

ThemeServiceInit({ infinityTheme }, 'infinityTheme')

createApp(App).mount('#app')
