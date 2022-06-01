const initialUserState = { isUser: false }

export const useUser = async () => {
  const config = useRuntimeConfig()
  const user = useState('user', () => ({ ...initialUserState }))

  const token = useCookie(config.public.tokenName)
  if (token.value) {
    try {
      const data = await $fetch(config.public.apiUrl + '/user/v1/auth/profile', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token.value}`
        }
      })

      const [userState] = data.query
      user.value = userState
      user.value.isUser = true
    } catch (e) {
      console.log(e)

      if (e.response?.status === 401) {
        resetUser()
      }
    }
  }

  return user
}

export const resetUser = () => {
  const config = useRuntimeConfig()

  const token = useCookie(config.public.tokenName)
  token.value = undefined
  user.value = { ...initialUserState }
}