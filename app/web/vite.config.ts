import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
const getAliasPath = (filepath: string) =>
  fileURLToPath(new URL(`./src/${filepath}`, import.meta.url))
// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), vueDevTools()],
  resolve: {
    alias: {
      '@assets': getAliasPath('assets'),
      '@components': getAliasPath('components'),
      '@plugins': getAliasPath('plugins'),
      '@router': getAliasPath('router'),
      '@services': getAliasPath('services'),
      '@stores': getAliasPath('stores'),
      '@views': getAliasPath('views'),
    },
  },
})
