<script setup>
const { query: recentlyReviewedList } = await useApi('/user/v1/users/recently-reviewed', {
  params: {
    offset: 0,
    limit: 10
  }
})

</script>

<template>
  <div class="container max-w-2xl mx-auto p-5">
    <main-header />

    <!-- <div class="divider mb-5">
        검색하기
      </div>

      <div class="flex mb-5">
        <div class="form-control w-full">
          <div class="input-group">
            <span class="bg-base-200">@</span>
            <input type="text" placeholder="유저 검색" class="input input-bordered w-full" maxlength="64">
            <button class="btn btn-square">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </button>
          </div>
        </div>
      </div> -->

    <div class="divider mb-5">
      최근에 리뷰 됨
    </div>

    <NuxtLink v-for="recentlyReviewed in recentlyReviewedList" :key="recentlyReviewed.rv_no" :to="`/${recentlyReviewed.user_name}`">
      <index-profile-card :info="recentlyReviewed" />
    </NuxtLink>
  </div>
</template>
