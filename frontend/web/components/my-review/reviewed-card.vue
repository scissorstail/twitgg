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
    <div class="flex">
      <div class="flex items-center space-x-2 w-full">
        <NuxtLink :to="`/${props.review.rv_user_name}`">
          <label class="btn btn-ghost btn-circle avatar">
            <div class="w-10 rounded-full">
              <img
                :src="props.review.rv_user_profile_image_url?.replace('_normal', '')"
                @error="
                  $event.target.src === props.review.rv_user_profile_image_url?.replace('_normal', '')
                    ? $event.target.src = 'https://abs.twimg.com/sticky/default_profile_images/default_profile.png'
                    : ''
                "
              >
            </div>
          </label>
        </NuxtLink>
        <div class="w-full text-sm overflow-hidden">
          <div class="flex w-full items-baseline mb-0.5">
            <div class="max-w-full text-xs font-extrabold whitespace-nowrap text-ellipsis overflow-hidden mr-1">
              {{ props.review.rv_user_nick }}
            </div>
            <div class="text-md text-base-content/70 mr-3">
              @{{ props.review.rv_user_name }}
            </div>
          </div>
          <div class="text-xs text-base-content/70">
            게시 일시: {{ dayjs(props.review.created_dt).format('YYYY년 MM월 DD일') }} {{ props.review.updated_dt ? '(수정됨)' : '' }}
          </div>
        </div>
      </div>
    </div>

    <div class="divider my-1" />

    <div class="flex items-center mb-1 ">
      <div class="pl-2 py-1 w-32 text-lg font-extrabold" style="pointer-events: none;">
        <span v-if="props.review.rv_positive === 1" class="text-blue-500">추천</span>
        <span v-else-if="props.review.rv_positive === 0" class="text-red-500">비추천</span>
        <span class="ml-1 text-sm text-base-content/70">하셨어요</span>
      </div>
    </div>

    <p class="text-base-content text-md text-opacity-80 px-3 py-1 mb-1">
      <!-- '\r' causes SSR hydration Warning -->
      {{ props.review.rv_content.replace(/[\r]/g, '') }}
    </p>
  </div>
</template>
