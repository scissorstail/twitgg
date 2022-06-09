<script setup>
const props = defineProps({
  isEnabled: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['trigger'])

const trigger = ref()

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
    }, {
      root: null,
      threshold: 1
    })
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
  <div v-if="props.isEnabled" ref="trigger" />
</template>
