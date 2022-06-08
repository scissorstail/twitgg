<script setup>
const { query: recentlyReviewedList } = await useApi('/user/v1/users/recently-reviewed', {
  params: {
    offset: 0,
    limit: 10
  }
})

const { query: newlyJoinedList } = await useApi('/user/v1/users/newly-joined', {
  params: {
    offset: 0,
    limit: 10
  }
})
</script>

<template>
  <div class="container max-w-2xl mx-auto p-5">
    <main-header />

    <div class="divider mb-5">
      최근에 리뷰 됨
    </div>

    <template v-if="recentlyReviewedList.length > 0">
      <NuxtLink v-for="recentlyReviewed in recentlyReviewedList" :key="recentlyReviewed.user_no" :to="`/${recentlyReviewed.user_name}`">
        <index-reviewed-card :info="recentlyReviewed" />
      </NuxtLink>
    </template>
    <div v-else class="card p-3 mb-4 bg-base-100 text-center text-base-content/70">
      아직 리뷰된 트친이 없어요
    </div>

    <div class="divider mb-5">
      새로 가입 함
    </div>

    <template v-if="newlyJoinedList.length > 0">
      <NuxtLink v-for="newlyJoined in newlyJoinedList" :key="newlyJoined.user_no" :to="`/${newlyJoined.user_name}`">
        <index-joined-card :info="newlyJoined" />
      </NuxtLink>
    </template>
    <div v-else class="card p-3 mb-4 bg-base-100 text-center text-base-content/70">
      아직 사용자가 없어요
    </div>
  </div>
</template>
