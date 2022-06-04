<script setup>
const props = defineProps({
  user: {
    type: Object,
    required: true
  },
  info: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['create', 'update'])

const myReview = ref(null)

const rvContent = ref(null)
const rvPositive = ref(null)

const isReadyToSubmit = computed(() => rvContent.value && rvPositive.value !== null)

const loadMyReview = async () => {
  const { query: [data] } = await useApi('/user/v1/review', {
    params: {
      user_no: props.user.user_no,
      rv_user_no: props.info.user_no
    }
  })

  myReview.value = data
  if (myReview.value) {
    rvPositive.value = myReview.value.rv_positive
    rvContent.value = myReview.value.rv_content
  }
}

const create = async () => {
  await useApi('/user/v1/review', {
    method: 'POST',
    params: {
      rv_content: rvContent.value,
      rv_positive: rvPositive.value,
      rv_user_no: props.info.user_no
    }
  })

  loadMyReview()
  emit('create')
}

const update = async () => {
  await useApi(`/user/v1/review/${myReview.value.rv_no}`, {
    method: 'PUT',
    params: {
      rv_content: rvContent.value,
      rv_positive: rvPositive.value
    }
  })

  loadMyReview()
  emit('update')
}

await loadMyReview()
</script>

<template>
  <div class="card p-3 mb-4 bg-base-100">
    <div class="flex">
      <div class="flex items-center space-x-2">
        <label class="avatar">
          <div class="w-10 rounded-full">
            <img :src="props.user.user_profile_image_url">
          </div>
        </label>
        <div class="text-sm text-base-content/70">
          <div>
            @{{ props.user.user_name }}
          </div>
        </div>
      </div>
    </div>
    <div class="flex w-full">
      <div class="form-control w-full">
        <label class="label">
          <span class="label-text">리뷰 내용</span>
        </label>
        <textarea
          v-model="rvContent"
          class="textarea textarea-bordered h-32"
          placeholder="이 트친의 좋았던 점 또는 싫었던 점, 그리고 이 트친을 다른 사람들에게 추천하는지 여부에 대해 써주세요. 정중하게 써주셔야 하며 무슨무슨 규칙 및 기준을 지키셔야 합니다."
        />
        <label class="label">
          <span class="label-text-alt">이 트친을 추천 하시겠습니까?</span>
        </label>
      </div>
    </div>
    <div class="flex mb-4 space-x-2">
      <button class="btn btn-sm w-32 btn-outline border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white hover:border-blue-500" @click="rvPositive = 1">
        <svg
          v-if="rvPositive === 1"
          width="20"
          height="20"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          class="inline-block h-6 w-6 stroke-current mr-1"
        ><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        추천
      </button>
      <button class="btn btn-sm w-32 btn-outline border-red-500 text-red-500 hover:bg-red-500 hover:text-white hover:border-red-500" @click="rvPositive = 0">
        <svg
          v-if="rvPositive === 0"
          width="20"
          height="20"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          class="inline-block h-6 w-6 stroke-current mr-1"
        ><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        비추천
      </button>
    </div>
    <div class="flex">
      <div class="flex flex-1 items-center space-x-2">
        <button v-if="!myReview" class="btn btn-md w-full btn-primary" :disabled="!isReadyToSubmit" @click="create">
          게시하기
        </button>
        <button v-else class="btn btn-md w-full btn-primary" :disabled="!isReadyToSubmit" @click="update">
          수정하기
        </button>
      </div>
    </div>
  </div>
</template>
