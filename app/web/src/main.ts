import './assets/main.css'

import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import { rootPiniaStore } from '@stores'
import VuetifyPlugin from '@plugins/vuetify'

const app = createApp(App)

app.use(router).use(rootPiniaStore).use(VuetifyPlugin)

app.mount('#app')
