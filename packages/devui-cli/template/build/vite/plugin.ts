import type { Plugin } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'

import { DevUiResolver } from 'unplugin-vue-components/resolvers'
export function createVitePlugins(viteEnv, isDev: boolean) {
  const vitePlugins: Plugin | Plugin[] = [
    vue({
      reactivityTransform: true
    }),
    Components({
      // allow auto load markdown components under `./src/components/`
      extensions: ['vue', 'md'],
      // allow auto import and register components used in markdown
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      dirs: ['src/components/', 'src/layout/', 'src/views', 'src/assets'],
      resolvers: [
        DevUiResolver()
      ],
      dts: 'src/types/components.d.ts'
    }),
    AutoImport({
      // dts: path.resolve(pathSrc, 'typings', 'auto-imports.d.ts'),
      dts: 'src/types/auto-imports.d.ts',
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
      }
    })
  ]
  return vitePlugins
}
