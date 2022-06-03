<script setup>
const props = defineProps({
  user: {
    type: Object,
    required: true
  }
})
</script>
<template>
  <div v-if="props.user.isUser" class="card p-3 mb-4 bg-base-100">
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
          class="textarea textarea-bordered h-32"
          placeholder="이 트친의 좋았던 점 또는 싫었던 점, 그리고 이 트친을 다른 사람들에게 추천하는지 여부에 대해 써주세요. 정중하게 써주셔야 하며 무슨무슨 규칙 및 기준을 지키셔야 합니다."
        />
        <label class="label">
          <span class="label-text-alt">이 트친을 추천 하시겠습니까?</span>
        </label>
      </div>
    </div>
    <div class="flex">
      <div class="flex items-center space-x-2">
        <button class="btn btn-sm btn-outline w-20 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white hover:border-blue-500">
          추천
        </button>
        <button class="btn btn-sm btn-outline w-20 border-red-500 text-red-500 hover:bg-red-500 hover:text-white hover:border-red-500">
          비추천
        </button>
      </div>
      <div class="flex flex-1 items-center space-x-2">
        <div class="ml-auto text-lg text-base-content/70">
          <div>
            <button class="btn btn-sm btn-primary">
              게시하기
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
