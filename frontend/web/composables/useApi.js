export const useApi = (url, options) => {
  const config = useRuntimeConfig()

  const headers = {
    'X-Requested-With': 'XMLHttpRequest',
    Accept: 'application/json'
  }

  return useFetch(url, {
    baseURL: config.public.apiUrl,
    headers,
    onRequest,
    onResponse,
    ...options
  })
}

function onRequest (ctx) {
  const config = useRuntimeConfig()
  const token = useCookie(config.public.tokenName)

  if (token.value) {
    ctx.headers.Authorization = `Bearer ${token}`
  }
}

function onResponse (ctx) {
  const config = useRuntimeConfig()
  const { response } = ctx

  if (response.status === 401) {
    const token = useCookie(config.public.tokenName)
    token.value = undefined

    if (process.client) {
      window.location.reload()
    }
  }
}
