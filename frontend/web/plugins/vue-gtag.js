import vueGtag from 'vue-gtag'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(vueGtag, {
    config: {
      id: 'G-7H7JSWZ2XB'
    },
    appName: 'twitgg'
  }, nuxtApp.$router)
})
