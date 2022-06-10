<script setup>
import { reviewCountToInfo, reviewInfoMapColor } from '@/utils/review-info'

const props = defineProps({
  info: {
    type: Object,
    required: true
  }
})

const reviewRecentInfo = reviewCountToInfo(props.info.count_positive_recent, props.info.count_total_recent)
const reviewInfo = reviewCountToInfo(props.info.count_positive, props.info.count_total)

</script>

<template>
  <div class="card p-3 mb-4 bg-base-200 py-8">
    <div class="flex flex-col items-center space-x-2 mb-1">
      <div class="avatar">
        <div class="w-24 rounded-full">
          <img
            :src="props.info.user_profile_image_url?.replace('_normal', '')"
            @error="
              $event.target.src !== props.info.user_profile_image_url
                ? $event.target.src = 'https://abs.twimg.com/sticky/default_profile_images/default_profile.png'
                : ''
            "
          >
        </div>
      </div>
    </div>
    <div class="flex flex-col items-center space-x-2">
      <div class="w-full text-center">
        <div class="mb-1">
          <div class="max-w-full text-lg font-extrabold whitespace-nowrap text-ellipsis overflow-hidden">
            {{ props.info.user_nick }}
          </div>
          <div class="text-md text-base-content/70">
            <NuxtLink :to="`https://twitter.com/${props.info.user_name}`" target="_blank">
              @{{ props.info.user_name }}
            </NuxtLink>
          </div>
        </div>
        <div class="flex text-base-content/70 text-sm">
          <div class="flex flex-1 justify-end">
            <span class="mr-3">최근 리뷰:</span>
          </div>
          <div class="flex flex-1 justify-start">
            <span :class="reviewInfoMapColor[reviewRecentInfo.status]">{{ reviewRecentInfo.text }}</span>
            <span class="ml-1" :class="reviewInfoMapColor[reviewRecentInfo.status]">({{ props.info.count_total_recent }})</span>
          </div>
        </div>
        <div class="flex text-base-content/70 text-sm">
          <div class="flex flex-1 justify-end">
            <span class="mr-3">모든 리뷰:</span>
          </div>
          <div class="flex flex-1 justify-start">
            <span :class="reviewInfoMapColor[reviewInfo.status]">{{ reviewInfo.text }}</span>
            <span class="ml-1" :class="reviewInfoMapColor[reviewInfo.status]">({{ props.info.count_total }})</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
