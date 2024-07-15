import { createApp } from 'vue'
import App from './App.vue'

import FlashMessage from '@smartweb/vue-flash-message'

import './assets/main.css'
import './assets/flash.css'
import './assets/forms.css'
import './assets/tables.css'

const app = createApp(App)

import { axiosInstance, VueAxios } from './router/axios'

app.use(VueAxios, axiosInstance)

// Axios Plugin
app.provide('axios', app.config.globalProperties.axios)

import router from './router'

app.use(router)
app.use(FlashMessage)
app.mount('#app')