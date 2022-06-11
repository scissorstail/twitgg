<script setup>
const config = useRuntimeConfig()
const route = useRoute()
const user = await useUser()

const home = () => {
  if (route.path === '/') {
    window.location.reload()
  } else {
    navigateTo('/')
  }
}

const profile = () => {
  if (route.path === `/${user.value.user_name}`) {
    window.location.reload()
  } else {
    navigateTo(`/${user.value.user_name}`)
  }
}

const setting = () => {
  if (route.path === '/setting') {
    window.location.reload()
  } else {
    navigateTo('/setting')
  }
}

const login = () => {
  window.location.href = config.public.apiUrl + '/user/v1/auth/login/twitter'
}
</script>

<template>
  <div class="navbar bg-base-100 mb-2">
    <div class="navbar-start">
      <button class="btn btn-ghost normal-case text-xl" @click="home">
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
              <img :src="user.user_profile_image_url">
            </div>
          </label>
          <ul tabindex="0" class="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
            <li>
              <a @click="profile">
                프로필
              </a>
            </li>
            <li>
              <a @click="setting">
                설정
              </a>
            </li>
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
</template>
