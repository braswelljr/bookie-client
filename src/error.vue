<script setup lang="ts">
const props = defineProps({
  error: {
    type: Object,
    required: true
  }
})

const message = String(props.error?.message || '')
const is404 = computed(() => props.error?.statusCode === 404 || message?.includes('404'))
const isDev = process.dev

const handleError = () => clearError({ redirect: '/' })
</script>

<template>
  <NuxtLayout>
    <div>
      <div class="text-3xl">
        {{ is404 ? 'This page could not be found' : 'An error occurred' }}
        <span class="text-5xl">404</span>
      </div>
      <div>
        Looks like you've followed a broken link or entered a URL that doesn't exist on this site.
      </div>
      <pre v-if="isDev">{{ error }}</pre>
      <button @click="handleError">Go Back</button>
    </div>
  </NuxtLayout>
</template>
