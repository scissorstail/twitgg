<script setup>
import uniqBy from 'lodash/uniqBy.js'

definePageMeta({
  middleware: ['auth']
})

const isLoadMyReviewListComplete = ref(false)
const myReviewList = ref([])
const myReviewListOffset = ref(0)
const myReviewListLimit = ref(10)
const loadMyReviewList = async (reset = false) => {
  if (reset) {
    isLoadMyReviewListComplete.value = false
    myReviewListOffset.value = 0
  }

  const { query: data } = await useApi('/user/v1/review/my-review', {
    params: {
      offset: myReviewListOffset.value,
      limit: myReviewListLimit.value
    }
  })

  if (data.length < myReviewListLimit.value) {
    isLoadMyReviewListComplete.value = true
  }

  myReviewList.value = reset ? data : uniqBy(myReviewList.value.concat(data), x => x.rv_no)
  myReviewListOffset.value = myReviewList.value.length
}

await loadMyReviewList()
</script>

<template>
  <div class="container max-w-2xl mx-auto p-5">
    <main-header />

    <div class="divider mb-4">
      나의 리뷰
    </div>

    <template v-if="myReviewList.length > 0">
      <my-review-reviewed-card v-for="review in myReviewList" :key="review.rv_no" :review="review" />
      <section-observer :is-enabled="!isLoadMyReviewListComplete" @trigger="loadMyReviewList" />
    </template>
    <div v-else class="card p-3 mb-4 bg-base-100 text-center text-base-content/70">
      아직 게시한 리뷰가 없어요
    </div>
  </div>
</template>
