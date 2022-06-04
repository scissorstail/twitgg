<script setup>
const config = useRuntimeConfig()
const route = useRoute()
const user = await useUser()

const { query: [info] } = await useApi('/user/v1/users', {
  params: {
    user_name: route.params.id
  }
})

const isSelf = computed(() => user.value.user_no === info?.user_no)

const reviewList = ref([])
const reviewListOffset = ref(0)
const loadReviewList = async (reset = false) => {
  if (reset) {
    reviewListOffset.value = 0
  }

  const { query: data } = await useApi('/user/v1/review', {
    params: {
      rv_user_no: info?.user_no,
      offset: reviewListOffset.value,
      limit: 10
    }
  })

  reviewList.value = reset ? data : reviewList.value.concat(data)
  reviewListOffset.value = reviewList.value.length
}

const login = () => {
  window.location.href = config.public.apiUrl + '/user/v1/auth/login/twitter'
}

if (info) {
  await loadReviewList()
}
</script>

<template>
  <div class="container max-w-2xl mx-auto p-5">
    <main-header />

    <div class="divider mb-4">
      프로필
    </div>

    <template v-if="info">
      <id-profile-card :info="info" />

      <template v-if="!isSelf">
        <div class="divider">
          리뷰 작성
        </div>

        <id-review-write-card
          v-if="user.isUser"
          :user="user"
          :info="info"
          @change="loadReviewList(true)"
        />

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

      <div class="divider mb-4">
        받은 리뷰
      </div>

      <template v-if="reviewList.length > 0">
        <id-review-card v-for="review in reviewList" :key="review.rv_no" :review="review" />
      </template>
      <div v-else class="card p-3 mb-4 bg-base-100 text-center text-base-content/70">
        아직 받은 리뷰가 없어요
      </div>
    </template>
    <template v-else>
      <div class="card p-3 mb-4 bg-base-100 text-center text-base-content/70">
        앗! 아직 해당 서비스를 사용하지 않거나 없는 트친이에요
      </div>
    </template>
  </div>
</template>
