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
  }
}
</script>

<template>
  <div id="app" class="whitespace-pre-line">
    <NuxtPage />
  </div>
</template>

<style>
 #app {
   word-break: keep-all;
   min-width: 330px;
 }
</style>
