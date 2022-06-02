<script setup>
const config = useRuntimeConfig()
const user = await useUser()

const reload = () => {
  window.location.reload()
}

const login = () => {
  window.location.href = config.public.apiUrl + '/user/v1/auth/login/twitter'
}

const logout = () => {
  resetUser()
}
</script>

<template>
  <div>
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

      <div class="card ring-1 ring-black/5 p-3 mb-4 bg-base-100 hover:bg-base-200">
        <NuxtLink to="/test">
          <div class="flex items-center space-x-2">
            <div class="avatar">
              <div class="w-24 rounded-full">
                <img src="https://pbs.twimg.com/profile_images/1481307075326394378/hLxEMdIw.png">
              </div>
            </div>
            <div>
              <div class="text-lg font-extrabold">
                @nameEO
              </div>
              <div class="text-base-content/70 text-sm">
                3개의 리뷰
              </div>
            </div>
          </div>
        </NuxtLink>
      </div>

      <div class="card ring-1 ring-black/5 p-3 mb-4 bg-base-100 hover:bg-base-200">
        <NuxtLink to="/test">
          <div class="flex items-center space-x-2">
            <div class="avatar">
              <div class="w-24 rounded-full">
                <img src="https://pbs.twimg.com/profile_images/1481307075326394378/hLxEMdIw.png">
              </div>
            </div>
            <div>
              <div class="text-lg font-extrabold">
                @nameEO
              </div>
              <div class="text-base-content/70 text-sm">
                3개의 리뷰
              </div>
            </div>
          </div>
        </NuxtLink>
      </div>

      <div class="card ring-1 ring-black/5 p-3 mb-4 bg-base-100 hover:bg-base-200">
        <NuxtLink to="/test">
          <div class="flex items-center space-x-2">
            <div class="avatar">
              <div class="w-24 rounded-full">
                <img src="https://pbs.twimg.com/profile_images/1481307075326394378/hLxEMdIw.png">
              </div>
            </div>
            <div>
              <div class="text-lg font-extrabold">
                @nameEO
              </div>
              <div class="text-base-content/70 text-sm">
                3개의 리뷰
              </div>
            </div>
          </div>
        </NuxtLink>
      </div>

      <div class="card ring-1 ring-black/5 p-3 mb-4 bg-base-100 hover:bg-base-200">
        <NuxtLink to="/test">
          <div class="flex items-center space-x-2">
            <div class="avatar">
              <div class="w-24 rounded-full">
                <img src="https://pbs.twimg.com/profile_images/1481307075326394378/hLxEMdIw.png">
              </div>
            </div>
            <div>
              <div class="text-lg font-extrabold">
                @nameEO
              </div>
              <div class="text-base-content/70 text-sm">
                3개의 리뷰
              </div>
            </div>
          </div>
        </NuxtLink>
      </div>

      <div class="card ring-1 ring-black/5 p-3 mb-4 bg-base-100 hover:bg-base-200">
        <NuxtLink to="/test">
          <div class="flex items-center space-x-2">
            <div class="avatar">
              <div class="w-24 rounded-full">
                <img src="https://pbs.twimg.com/profile_images/1481307075326394378/hLxEMdIw.png">
              </div>
            </div>
            <div>
              <div class="text-lg font-extrabold">
                @nameEO
              </div>
              <div class="text-base-content/70 text-sm">
                3개의 리뷰
              </div>
            </div>
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
