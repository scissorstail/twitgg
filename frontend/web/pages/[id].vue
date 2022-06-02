<script setup>
const config = useRuntimeConfig()
const user = await useUser()

const home = () => {
  navigateTo('/')
}

const login = () => {
  window.location.href = config.public.apiUrl + '/user/v1/auth/login/twitter'
}
</script>

<template>
  <div>
    <div class="container max-w-2xl mx-auto p-5">
      <!-- <h1>{{ $route.params.id }} page</h1> -->

      <main-header />

      <div class="divider mb-5">
        프로필
      </div>

      <div class="card p-3 mb-4 bg-base-200">
        <div class="flex flex-col items-center space-x-2">
          <div class="avatar">
            <div class="w-24 rounded-full">
              <img src="https://pbs.twimg.com/profile_images/1481307075326394378/hLxEMdIw.png">
            </div>
          </div>
        </div>
        <div class="flex flex-col items-center space-x-2">
          <div class="w-full text-center">
            <div class="text-lg font-extrabold mb-1">
              @nameEO
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

      <div class="divider">
        리뷰 작성
      </div>

      <div v-if="user.isUser" class="card p-3 mb-4 bg-base-100">
        <div class="flex">
          <div class="flex items-center space-x-2">
            <label class="avatar">
              <div class="w-10 rounded-full">
                <img src="https://pbs.twimg.com/profile_images/1481307075326394378/hLxEMdIw.png">
              </div>
            </label>
            <div class="text-sm text-base-content/70">
              <div>
                @nameEO
              </div>
            </div>
          </div>
        </div>
        <div class="flex w-full">
          <div class="form-control w-full">
            <label class="label">
              <span class="label-text">리뷰 내용</span>
            </label>
            <textarea
              class="textarea textarea-bordered h-32"
              placeholder="이 트친의 좋았던 점 또는 싫었던 점, 그리고 이 트친을 다른 사람들에게 추천하는지 여부에 대해 써주세요. 정중하게 써주셔야 하며 무슨무슨 규칙 및 기준을 지키셔야 합니다."
            />
            <label class="label">
              <span class="label-text-alt">이 트친을 추천 하시겠습니까?</span>
            </label>
          </div>
        </div>
        <div class="flex">
          <div class="flex items-center space-x-2">
            <button class="btn btn-sm btn-outline w-20 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white hover:border-blue-500">
              추천
            </button>
            <button class="btn btn-sm btn-outline w-20 border-red-500 text-red-500 hover:bg-red-500 hover:text-white hover:border-red-500">
              비추천
            </button>
          </div>
          <div class="flex flex-1 items-center space-x-2">
            <div class="ml-auto text-lg text-base-content/70">
              <div>
                <button class="btn btn-sm btn-primary">
                  게시하기
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="card p-3 mb-4 bg-base-100">
        <div class="flex mb-4 justify-center w-full">
          <div class="text-base-content/70">
            <div>
              로그인하고 리뷰를 작성해보세요
            </div>
          </div>
        </div>
        <div class="flex">
          <button class="btn btn-info text-white w-full" @click="login">
            트위터로 로그인
          </button>
        </div>
      </div>

      <div class="divider mb-5">
        리뷰 목록
      </div>

      <div class="card ring-1 ring-black/5 p-5 mb-4 bg-base-100">
        <div class="flex mb-2">
          <div class="flex items-center space-x-2">
            <label class="btn btn-ghost btn-circle avatar">
              <div class="w-10 rounded-full">
                <img src="https://pbs.twimg.com/profile_images/1481307075326394378/hLxEMdIw.png">
              </div>
            </label>
            <div class="text-sm text-base-content/70">
              <div>
                @nameEO
              </div>
            </div>
          </div>
          <div class="flex flex-1 items-center space-x-2">
            <div class="ml-auto text-md text-base-content/70">
              <div>
                <span class="text-blue-500">추천</span>
              </div>
            </div>
          </div>
        </div>
        <div class="flex w-full">
          <div class="w-full">
            <p class="text-base-content text-md text-opacity-80">
              Use card component to easily show blog posts, products, features, items and more.
            </p>
          </div>
        </div>
      </div>

      <div class="card ring-1 ring-black/5 p-5 mb-4 bg-base-100">
        <div class="flex mb-2">
          <div class="flex items-center space-x-2">
            <label class="btn btn-ghost btn-circle avatar">
              <div class="w-10 rounded-full">
                <img src="https://pbs.twimg.com/profile_images/1481307075326394378/hLxEMdIw.png">
              </div>
            </label>
            <div class="text-sm text-base-content/70">
              <div>
                @nameEO
              </div>
            </div>
          </div>
          <div class="flex flex-1 items-center space-x-2">
            <div class="ml-auto text-md text-base-content/70">
              <div>
                <span class="text-red-500">비추천</span>
              </div>
            </div>
          </div>
        </div>
        <div class="flex w-full">
          <div class="w-full">
            <p class="text-base-content text-md text-opacity-80">
              Use card component to easily show blog posts, products, features, items and more.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
