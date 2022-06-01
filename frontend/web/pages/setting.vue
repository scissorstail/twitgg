<script setup>
definePageMeta({
  middleware: ['auth']
})

const user = await useUser()

const refresh = () => {
  refreshUser()
}
</script>

<template>
  <div>
    <h1>Setting page</h1>

    <div>
      <NuxtLink to="/">
        메인
      </NuxtLink>
    </div>
    <div>
      {{ user.user_name }}
    </div>
    <div>
      <button @click="refresh">
        사용자 정보 새로고침
      </button>
    </div>
  </div>
</template>
