import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      webUrl: '',
      apiUrl: '',
      tokenName: ''
    }
  },
  modules: ['@nuxtjs/tailwindcss']
})
