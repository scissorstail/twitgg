<script setup>
const config = useRuntimeConfig()
const user = await useUser()

const login = () => {
  window.location.href = config.public.apiUrl + '/user/v1/auth/login/twitter'
}

const logout = () => {
  resetUser()
  navigateTo('/')
}
</script>

<template>
  <div>
    <h1>Index page</h1>

    <div v-if="user.isUser">
      <div>로그인 됨</div>
      <button @click="logout">
        로그아웃
      </button>
    </div>
    <div v-else>
      <button @click="login">
        트위터 로그인
      </button>
    </div>
    <div v-if="user.isUser">
      <NuxtLink to="/setting">
        세팅
      </NuxtLink>
    </div>
  </div>
</template>
