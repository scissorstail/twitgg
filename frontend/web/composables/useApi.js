export const useApi = (url, options) => {
  const config = useRuntimeConfig()
  const token = useCookie(config.public.tokenName)

  return $fetch(url, {
    baseURL: config.public.apiUrl,
    headers: {},
    onRequest: (ctx) => {
      if (token.value) {
        ctx.options.headers.Authorization = `Bearer ${token.value}`
      }
    },
    onResponse: (ctx) => {
      if (token.value) {
        if (ctx.response.status === 401) {
          token.value = undefined

          if (process.client) {
            window.location.reload()
          }
        }
      }
    },
    ...options
  })
}
