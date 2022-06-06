const initialUserState = { isUser: false }

export const useUser = async () => {
  const config = useRuntimeConfig()
  const user = useState('user', () => ({ ...initialUserState }))
  const token = useCookie(config.public.tokenName)

  if (token.value && !user.value.isUser) {
    await refreshUser()
  }

  return user
}

export const resetUser = () => {
  const config = useRuntimeConfig()
  const user = useState('user', () => ({ ...initialUserState }))
  const token = useCookie(config.public.tokenName)

  token.value = undefined
  user.value = { ...initialUserState }
}

export const refreshUser = async () => {
  const user = useState('user', () => ({ ...initialUserState }))
  const data = await useApi('/user/v1/auth/profile')

  const [userState] = data.query
  if (!userState && process.client) {
    return resetUser()
  }

  user.value = {
    ...userState,
    isUser: Boolean(userState)
  }
}
