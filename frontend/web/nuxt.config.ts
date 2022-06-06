import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      webUrl: process.env.NUXT_PUBLIC_WEB_URL || '',
      apiUrl: process.env.NUXT_PUBLIC_API_URL || '',
      tokenName: process.env.NUXT_PUBLIC_TOKEN_NAME || ''
    }
  },
  modules: ['@nuxtjs/tailwindcss'],
  vite: {
    server: {
      port: 443,
      https: true,
      hmr: {
        protocol: 'wss'
      }
    }
  },
  ssr: false
})
