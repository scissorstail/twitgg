export default defineNuxtRouteMiddleware(async (to, from) => {
  const user = await useUser()

  if (!user.value.isUser && to.path !== '/') {
    return navigateTo('/')
  }
})
