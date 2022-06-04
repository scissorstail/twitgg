<script setup>
import dayjs from 'dayjs'

const props = defineProps({
  review: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <div class="card ring-1 ring-black/5 p-3 mb-4 bg-base-100">
    <div class="flex items-center mb-1 ">
      <div class="pl-2 py-1 w-32 text-lg font-extrabold" style="pointer-events: none;">
        <span v-if="props.review.rv_positive === 1" class="text-blue-500">추천</span>
        <span v-else-if="props.review.rv_positive === 0" class="text-red-500">비추천</span>
      </div>
      <!-- 추후 메뉴배치 -->
      <!-- <div class="ml-auto">
        <div class="dropdown dropdown-end">
          <label tabindex="0" class="btn btn-ghost btn-square">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="h-6 w-6 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" /></svg>
          </label>
          <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
            <li><a>메뉴명</a></li>
          </ul>
        </div>
      </div> -->
    </div>

    <p class="text-base-content text-md text-opacity-80 px-3 py-1 mb-1">
      {{ props.review.rv_content }}
    </p>

    <div class="divider mb-1" />

    <div class="flex">
      <div class="flex items-center space-x-2">
        <NuxtLink :to="`/${props.review.user_name}`">
          <label class="btn btn-ghost btn-circle avatar">
            <div class="w-10 rounded-full">
              <img :src="props.review.user_profile_image_url">
            </div>
          </label>
        </NuxtLink>
        <div class="text-sm">
          <div>
            @{{ props.review.user_name }}
          </div>
          <div class="text-xs text-base-content/70">
            게시 일시: {{ dayjs(props.review.created_dt).format('YYYY년 MM월 DD일') }} {{ props.review.updated_dt ? '(수정됨)' : '' }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
