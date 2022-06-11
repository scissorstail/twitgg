<script setup>
definePageMeta({
  middleware: ['auth']
})

const isRunning = ref(false)
const isAlert1Visible = ref(false)

const logout = () => {
  resetUser()
  navigateTo('/')
}

const leave = async () => {
  if (isRunning.value) {
    return
  }

  try {
    isRunning.value = true

    await useApi('/user/v1/auth/leave', {
      method: 'DELETE'
    })

    resetUser()
    navigateTo('/')
  } finally {
    setTimeout(() => {
      isRunning.value = false
    }, 250)
  }
}
</script>

<template>
  <div class="container max-w-2xl mx-auto p-5">
    <main-header />

    <div class="divider mb-4">
      설정
    </div>

    <div class="flex mb-4">
      <div class="w-full text-center">
        <button class="btn w-full" @click="logout">
          로그아웃
        </button>
      </div>
    </div>

    <div tabindex="0" class="collapse collapse-arrow bg-base-100">
      <input type="checkbox" class="peer">
      <div class="collapse-title text-md font-medium">
        이용약관
      </div>
      <div class="collapse-content">
        <h3>제 1조</h3>
        <p class="text-sm mb-2">
          이 '서비스'(이하 서비스)의 사용자를 '회원'(이하 회원)이라고 부릅니다
        </p>
        <h3>제 2조</h3>
        <p class="text-sm mb-2">
          서비스에서 회원은 서로 싸우면 안됩니다. 어길 시 개발자가 불편해합니다
        </p>
        <h3>제 3조</h3>
        <p class="text-sm mb-2">
          회원은 무슨무슨 권리를 보호받습니다
        </p>
      </div>
    </div>

    <div tabindex="0" class="collapse collapse-arrow bg-base-100">
      <input type="checkbox" class="peer">
      <div class="collapse-title text-md font-medium">
        개인정보처리방침
      </div>
      <div class="collapse-content">
        <h3>제 1조</h3>
        <p class="text-sm mb-2">
          이 '서비스'(이하 서비스)의 사용자를 '회원'(이하 회원)이라고 부릅니다
        </p>
        <h3>제 2조</h3>
        <p class="text-sm mb-2">
          회원이 '트위터로 로그인' 시 트위터 식별자, 트위터 아이디, 트위터 닉네임, 트위터 프로필 사진 링크, 트위터 액세스 토큰(read, write)을
          포함한 정보를 제공받아 서비스에서 저장하고 관리합니다. 위의 정보는 회원탈퇴 전까지만 저장되며 회원탈퇴 시 파기됩니다.
          백업을 포함한 모든 정보가 완전히 삭제될 때까지 시간이 걸릴 수 있습니다
        </p>
        <h3>제 3조</h3>
        <p class="text-sm mb-2">
          서비스는 회원정보에 대한 무슨무슨 책임을 집니다
        </p>
      </div>
    </div>

    <div tabindex="0" class="collapse collapse-arrow bg-base-100">
      <input type="checkbox" class="peer">
      <div class="collapse-title text-md font-medium">
        소스코드
      </div>
      <div class="collapse-content">
        <p class="mb-2">
          <a href="https://github.com/scissorstail/twitgg" class="link link-neutral" target="_blank">scissorstail/twitgg
          </a>
        </p>
        <h3 class="text-sm">
          이 서비스는 다음과 같은 오픈소스 라이브러리들이 사용되었습니다.
        </h3>
        <p>
          axios,
          bcrypt,
          compression,
          connect-redis,
          cookie-parser,
          cors,
          dotenv,
          express,
          express-session,
          joi,
          jsonwebtoken,
          lodash,
          log-timestamp,
          mime-types,
          module-alias,
          moment,
          moment-range,
          moment-timezone,
          ms,
          passport,
          passport-jwt,
          passport-local,
          passport-twitter,
          postgres,
          redis,
          @nuxtjs/eslint-config-typescript,
          @nuxtjs/tailwindcss,
          daisyui,
          dayjs,
          eslint,
          eslint-plugin-nuxt,
          eslint-plugin-vue,
          lodash,
          nuxt,
          typescript,
          vite-plugin-eslint,
          vue-gtag,
          nuxt-progress,
          그 외 다수...
        </p>
      </div>
    </div>

    <div class="flex mb-4">
      <div class="w-full text-center">
        <button class="btn btn-ghost mb-2" @click="isAlert1Visible = !isAlert1Visible">
          회원탈퇴
        </button>
        <div v-show="isAlert1Visible" class="alert alert-warning">
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
            <span class="text-sm font-extrabold">회원탈퇴 시 계정 정보, 받은 리뷰, 게시한 리뷰 등 모든 정보가 삭제되며 복구가 불가능하거나 어려울 수 있어요!</span>
          </div>
          <div class="flex-none">
            <button class="btn btn-sm btn-ghost" @click="isAlert1Visible = false">
              취소
            </button>
            <button class="btn btn-sm btn-primary" :class="{loading: isRunning}" :disabled="isRunning" @click="leave">
              네 탈퇴합니다
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="divider" />

    <div class="flex">
      <div class="w-full text-sm text-center">
        2022 <a href="https://twitter.com/nameEO" class="link link-neutral" target="_blank">@nameEO</a>
      </div>
    </div>
  </div>
</template>
