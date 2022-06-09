<script setup>
useHead({
  title: '트친리뷰',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
  charset: 'utf-8'
})

const route = useRoute()

// 인증 오류 처리
if (route.query.success === 'false') {
  switch (route.query.state) {
    case '-3':
      if (process.client) {
        alert('정지된 사용자입니다')
        navigateTo('/')
      }
      break
    case '-4':
      if (process.client) {
        alert('트위터 로그인 오류입니다. 잠시 후 다시 시도해주시기 바랍니다.')
        navigateTo('/')
      }
      break
  }
}

const nuxtApp = useNuxtApp()

nuxtApp.hook('page:finish', () => {
  setTimeout(() => window.scrollTo(0, 0), 0)
})
</script>

<template>
  <div id="app" class="whitespace-pre-line">
    <NuxtPage />
  </div>
</template>

<style>
#app {
  word-break: keep-all;
  word-wrap: break-word;
  min-width: 375px;
}
</style>
