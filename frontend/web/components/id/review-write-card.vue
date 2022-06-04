<script setup>
import dayjs from 'dayjs'

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

const emit = defineEmits(['change'])

const isRunning = ref(false)
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
  rvPositive.value = myReview.value ? myReview.value.rv_positive : null
  rvContent.value = myReview.value ? myReview.value.rv_content : null
}

const create = async () => {
  if (isRunning.value) {
    return
  }

  try {
    isRunning.value = true

    await useApi('/user/v1/review', {
      method: 'POST',
      params: {
        rv_content: rvContent.value,
        rv_positive: rvPositive.value,
        rv_user_no: props.info.user_no
      }
    })

    await loadMyReview()
    emit('change')
  } finally {
    setTimeout(() => {
      isRunning.value = false
    }, 250)
  }
}

const update = async () => {
  if (isRunning.value) {
    return
  }

  try {
    isRunning.value = true

    await useApi(`/user/v1/review/${myReview.value.rv_no}`, {
      method: 'PUT',
      params: {
        rv_content: rvContent.value,
        rv_positive: rvPositive.value
      }
    })

    await loadMyReview()
    emit('change')
  } finally {
    setTimeout(() => {
      isRunning.value = false
    }, 250)
  }
}

const remove = async () => {
  if (isRunning.value) {
    return
  }

  try {
    isRunning.value = true
    await useApi(`/user/v1/review/${myReview.value.rv_no}`, {
      method: 'PUT',
      params: {
        state: 0
      }
    })

    await loadMyReview()
    emit('change')
  } finally {
    setTimeout(() => {
      isRunning.value = false
    }, 250)
  }
}

await loadMyReview()
</script>

<template>
  <div class="card p-3 mb-4 bg-base-100">
    <div class="flex">
      <div class="flex items-center space-x-2">
        <label class="btn btn-ghost btn-circle avatar" style="pointer-events: none;">
          <div class="w-10 rounded-full">
            <img :src="props.user.user_profile_image_url">
          </div>
        </label>
        <div class="text-sm">
          <div>
            @{{ props.user.user_name }}
          </div>
          <div v-if="myReview" class="text-xs text-base-content/70">
            게시 일시: {{ dayjs(myReview.created_dt).format('YYYY년 MM월 DD일') }} {{ myReview.updated_dt ? '(수정됨)' : '' }}
          </div>
        </div>
      </div>

      <div v-if="myReview" class="flex ml-auto">
        <div class="dropdown dropdown-end">
          <label tabindex="0" class="btn btn-ghost btn-square">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="h-6 w-6 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" /></svg>
          </label>
          <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
            <li><a @click="remove">삭제하기</a></li>
          </ul>
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
      <button
        class="btn btn-sm w-32 btn-outline border-blue-500 hover:bg-blue-500 hover:text-white hover:border-blue-500"
        :class="rvPositive === 1 ? ['bg-blue-500', 'text-white', 'border-blue-500'] : ['text-blue-500']"
        @click="rvPositive = 1"
      >
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
      <button
        class="btn btn-sm w-32 btn-outline border-red-500 hover:bg-red-500 hover:text-white hover:border-red-500"
        :class="rvPositive === 0 ? ['bg-red-500', 'text-white', 'border-red-500'] : ['text-red-500']"
        @click="rvPositive = 0"
      >
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
    <div class="flex space-x-2">
      <div class="flex flex-1 items-center">
        <button v-if="!myReview" class="btn btn-md w-full btn-primary" :class="{loading: isRunning}" :disabled="!isReadyToSubmit" @click="create">
          {{ !isRunning ? '게시하기' : '잠시만 기다려주세요' }}
        </button>
        <button v-else class="btn btn-md w-full btn-primary" :class="{loading: isRunning}" :disabled="!isReadyToSubmit" @click="update">
          {{ !isRunning ? '수정하기' : '잠시만 기다려주세요' }}
        </button>
      </div>
    </div>
  </div>
</template>
