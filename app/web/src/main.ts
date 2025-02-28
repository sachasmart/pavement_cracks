import './assets/main.css'

import { createApp } from 'vue'
import { VueQueryPlugin } from '@tanstack/vue-query'

import App from './App.vue'
import router from './router'
import { rootPiniaStore } from '@stores'
import VuetifyPlugin from '@plugins/vuetify'

const app = createApp(App)

app.use(VueQueryPlugin, {
  // Required for VueQueryPlugin to work with Vue 3
  enableDevtoolsV6Plugin: true,
  queryClientConfig: {
    defaultOptions: {
      queries: {
        staleTime: 1 * 60 * 1000,
      },
    },
  },
})
app.use(router).use(rootPiniaStore).use(VuetifyPlugin)
app.mount('#app')
