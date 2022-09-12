import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Unocss from 'unocss/vite'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { VueUseComponentsResolver } from 'unplugin-vue-components/resolvers'
import { DevUiResolver } from 'unplugin-vue-components/resolvers'
// https://vitejs.dev/config/
function pathResolve(dir: string) {
  return resolve(process.cwd(), '.', dir)
}
export default defineConfig({
  resolve: {
    alias: [
      {
        find: /\/#\//,
        replacement: `${pathResolve('types')}/`
      },
      {
        find: '@',
        replacement: `${pathResolve('src')}/`
      }
    ]
  },
  plugins: [
    vue({
      reactivityTransform: true
    }),
    Unocss({
      presets: [
        // presetTagify({
        //   // prefix: 'un-'
        // })
      ]
    }),
    Components({
      dts: './types/components.d.ts',
      extensions: ['vue', 'tsx'],
      deep: true,
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/, /\.tsx$/],
      // imports 指定组件所在位置，默认为 src/components
      dirs: ['src/components/', 'src/layout/', 'src/views', 'src/assets'],
      resolvers: [
        // IconsResolver({
        //   enabledCollections: ['a']
        // }),
        DevUiResolver(),
        VueUseComponentsResolver()
      ]
    }),
    AutoImport({
      dts: './types/auto-imports.d.ts',
      // imports: ['vue', '@vueuse/core'],
      // Generate corresponding .eslintrc-auto-import.json file.
      // eslint globals Docs - https://eslint.org/docs/user-guide/configuring/language-options#specifying-globals
      imports: ['vue', 'vue/macros', 'vue-router', 'pinia', '@vueuse/core'],
      dirs: ['src/composables', 'src/utils'],
      // Auto import for all module exports under directories
      // dirs: [
      //   // './hooks',
      //   // './composables'
      //   // ...
      // ],

      eslintrc: {
        // enabled: true, // Default `false`
        enabled: false, // Default `false`
        filepath: './.eslintrc-auto-import.json', // Default `./.eslintrc-auto-import.json`
        globalsPropValue: true // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
      },
      // resolvers: [ElementPlusResolver()]
      // Auto import functions from Element Plus, e.g. ElMessage, ElMessageBox... (with style)
      // 自动导入 Element Plus 相关函数，如：ElMessage, ElMessageBox... (带样式)
      resolvers: []
    })
  ]
})
