<script setup>
const emit = defineEmits(['trigger'])
const trigger = ref()
const options = {
  root: null,
  threshold: 1
}
let observer = null
const handleIntersect = (entry) => {
  if (entry.isIntersecting) {
    emit('trigger')
  }
}

onMounted(() => {
  try {
    observer = new IntersectionObserver((entries) => {
      handleIntersect(entries[0])
    }, options)
    observer.observe(trigger.value)
  } catch (err) {
    console.error(err)
  }
})

onUnmounted(() => {
  observer.disconnect()
})
</script>

<template>
  <div ref="trigger" />
</template>
