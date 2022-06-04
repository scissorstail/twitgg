<script setup>
const props = defineProps({
  review: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <div class="card ring-1 ring-black/5 p-5 mb-4 bg-base-100">
    <div class="flex mb-2">
      <div class="flex items-center space-x-2">
        <label class="btn btn-ghost btn-circle avatar">
          <div class="w-10 rounded-full">
            <img :src="props.review.user_profile_image_url">
          </div>
        </label>
        <div class="text-sm text-base-content/70">
          <div>
            @{{ props.review.user_name }}
          </div>
        </div>
      </div>
      <div class="flex flex-1 items-center space-x-2">
        <div class="ml-auto text-md font-extrabold">
          <span v-if="props.review.rv_positive === 1" class="text-blue-500">추천</span>
          <span v-else-if="props.review.rv_positive === 0" class="text-red-500">비추천</span>
        </div>
      </div>
    </div>
    <div class="flex w-full">
      <div class="w-full">
        <p class="text-base-content text-md text-opacity-80">
          {{ props.review.rv_content }}
        </p>
      </div>
    </div>
  </div>
</template>
