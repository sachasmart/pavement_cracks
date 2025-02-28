import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vuetify from 'vite-plugin-vuetify'

const getAliasPath = (filepath: string) =>
  fileURLToPath(new URL(`./src/${filepath}`, import.meta.url))
// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const envConfig = loadEnv(mode, process.cwd())

  return {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData(source: string, fp: string) {
            if (fp.includes('vuetify')) {
              return source
            }

            return `
              @use "@styles/_breakpoints.scss" as *;
              @use "@styles/_functions.scss" as *;
              ${source}
            `
          },
        },
      },
    },
    plugins: [vue(), vuetify({ autoImport: true })],
    resolve: {
      alias: {
        '@assets': getAliasPath('assets'),
        '@components': getAliasPath('components'),
        '@plugins': getAliasPath('plugins'),
        '@router': getAliasPath('router'),
        '@services': getAliasPath('services'),
        '@stores': getAliasPath('stores'),
        '@views': getAliasPath('views'),
        '@queries': getAliasPath('queries'),
        '@styles': getAliasPath('styles'),
        '@config': getAliasPath('config.ts'),
      },
    },
    server: {
      host: '0.0.0.0',
      // NOTE: Must match web port specified in Dockerfile to avoid Vite server connection issues!
      port: parseInt(envConfig.VITE_PORT, 10),
    },
    environment: 'happy-dom',
    deps: {
      inline: ['vuetify'],
    },
    globals: true,
  }
})
