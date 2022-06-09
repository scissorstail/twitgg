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
  modules: [
    '@nuxtjs/tailwindcss',
    'nuxt-progress'
  ],
  progress: {
    // Default: 2px
    height: '1px',
    // Default: #29D
    color: '#29D',
    // NProgress options: https://www.npmjs.com/package/nprogress#configuration
    options: {
      showSpinner: false,
      speed: 50,
      trickleRate: 0.1,
      trickleSpeed: 500
    }
  },
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
