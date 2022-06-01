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
      <div class="navbar bg-base-100 mb-2">
        <div class="navbar-start">
          <button class="btn btn-ghost normal-case text-xl" @click="reload">
            트친리뷰
            <div class="badge badge-warning ml-1">
              beta
            </div>
          </button>
        </div>

        <div class="navbar-end">
          <template v-if="user.isUser">
            <div class="dropdown dropdown-end">
              <label tabindex="0" class="btn btn-ghost btn-circle avatar">
                <div class="w-10 rounded-full">
                  <img src="https://pbs.twimg.com/profile_images/1481307075326394378/hLxEMdIw.png">
                </div>
              </label>
              <ul tabindex="0" class="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
                <li>
                  <NuxtLink :to="`/${user.user_id}`">
                    프로필
                  </NuxtLink>
                </li>
                <li>
                  <NuxtLink to="/setting">
                    설정
                  </NuxtLink>
                </li>
                <li><a @click="logout">로그아웃</a></li>
              </ul>
            </div>
          </template>
          <template v-else>
            <button class="btn btn-info text-white" @click="login">
              로그인
            </button>
          </template>
        </div>
      </div>

      <div class="divider mb-5">
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
      </div>

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
                3개의 리뷰 - <span class="text-blue-500">매우 긍정적</span>
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
                3개의 리뷰 - <span class="text-red-500">대체로 부정적</span>
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
