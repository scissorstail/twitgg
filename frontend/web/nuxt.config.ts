import { defineNuxtConfig } from 'nuxt'
import eslintPlugin from 'vite-plugin-eslint'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      webUrl: '',
      apiUrl: '',
      tokenName: ''
    }
  },
  vite: {
    plugins: [
      eslintPlugin()
    ]
  },
  buildModules: [['@pinia/nuxt', { disableVuex: true }]]
})
