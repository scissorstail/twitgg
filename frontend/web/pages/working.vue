<script setup>
import { useUser } from '@/composables/useUser'
const user = await useUser()

if (!user.isUser) {
  navigateTo('/')
}
</script>

<template>
  <div>
    <!-- This page correctly has only one single root element -->
    Page content
  </div>
</template>
