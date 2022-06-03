<script setup>
import ReviewCard from '~~/components/id/review-card.vue'
const config = useRuntimeConfig()
const route = useRoute()
const user = await useUser()

const { query: [info] } = await useApi('/user/v1/users', {
  params: {
    user_name: route.params.id
  }
})

const isSelf = computed(() => user.value.user_no === info?.user_no)

const login = () => {
  window.location.href = config.public.apiUrl + '/user/v1/auth/login/twitter'
}
</script>

<template>
  <div class="container max-w-2xl mx-auto p-5">
    <main-header />

    <div class="divider mb-5">
      프로필
    </div>

    <template v-if="info">
      <id-profile-card :info="info" />

      <template v-if="!isSelf">
        <div class="divider">
          리뷰 작성
        </div>

        <id-review-write-card v-if="user.isUser" :user="user" />

        <div v-else class="card p-3 mb-4 bg-base-100">
          <div class="flex mb-4 justify-center w-full">
            <div class="text-base-content/70">
              <div>
                로그인하고 리뷰를 작성해보세요
              </div>
            </div>
          </div>
          <div class="flex">
            <button class="btn btn-info text-white w-full" @click="login">
              트위터로 로그인
            </button>
          </div>
        </div>
      </template>

      <div class="divider mb-5">
        받은 리뷰
      </div>

      <id-review-card />
    </template>
    <template v-else>
      <div class="card p-3 mb-4 bg-base-200 text-center">
        앗! 아직 해당 서비스를 사용하지 않거나 없는 트친이에요
      </div>
    </template>
  </div>
</template>
