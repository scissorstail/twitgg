<script setup>
import { reviewCountToInfo, reviewInfoMapColor } from '@/utils/review-info'

const props = defineProps({
  info: {
    type: Object,
    required: true
  }
})

const reviewRecentInfo = reviewCountToInfo(props.info.count_positive_recent, props.info.count_total_recent)

</script>

<template>
  <div class="card ring-1 ring-black/5 p-3 mb-4 bg-base-100 hover:bg-base-200">
    <div class="flex items-center space-x-2">
      <div class="avatar">
        <div class="w-10 rounded-full">
          <img
            :src="props.info.user_profile_image_url?.replace('_normal', '')"
            @error="
              $event.target.src === props.info.user_profile_image_url?.replace('_normal', '')
                ? $event.target.src = 'https://abs.twimg.com/sticky/default_profile_images/default_profile.png'
                : ''
            "
          >
        </div>
      </div>
      <div>
        <div class="text-lg font-extrabold">
          @{{ props.info.user_name }}
        </div>
        <div class="text-base-content/70 text-sm">
          {{ props.info.count_total_recent }}개의 리뷰
          <template v-if="props.info.count_total_recent >= 10">
            - <span :class="reviewInfoMapColor[reviewRecentInfo.status]">{{ reviewRecentInfo.text }}</span>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>
