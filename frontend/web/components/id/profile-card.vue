<script setup>
const props = defineProps({
  info: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <div class="card p-3 mb-4 bg-base-200">
    <div class="flex flex-col items-center space-x-2">
      <div class="avatar">
        <div class="w-24 rounded-full">
          <img :src="props.info.user_profile_image_url?.replace('_normal', '')">
        </div>
      </div>
    </div>
    <div class="flex flex-col items-center space-x-2">
      <div class="w-full text-center">
        <div class="text-lg font-extrabold mb-1">
          @{{ props.info.user_name }}
        </div>
        <div class="text-base-content/70 mb-1">
          리뷰 3개
        </div>
        <div class="flex text-base-content/70 text-sm">
          <div class="flex flex-1 justify-end">
            <span class="mr-3">최근 리뷰:</span>
          </div>
          <div class="flex flex-1 justify-start">
            <span class="text-red-500">대체로 부정적</span>
            <span class="ml-1">(3)</span>
          </div>
        </div>
        <div class="flex text-base-content/70 text-sm">
          <div class="flex flex-1 justify-end">
            <span class="mr-3">모든 리뷰:</span>
          </div>
          <div class="flex flex-1 justify-start">
            <span class="text-blue-500">매우 긍정적</span>
            <span class="ml-1">(3)</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
