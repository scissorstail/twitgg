<script setup>
import dayjs from 'dayjs'

const props = defineProps({
  info: {
    type: Object,
    required: true
  }
})
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
          가입 일시: {{ dayjs(props.info.created_dt).format('YYYY년 MM월 DD일') }}
        </div>
      </div>
    </div>
  </div>
</template>
