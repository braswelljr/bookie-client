<template>
  <div class="min-h-screen bg-white text-black dark:bg-zinc-950 dark:text-white">
    <NuxtLayout>
      <NuxtLoadingIndicator />
      <NuxtPage />
      <!-- toast for notifications -->
      <Toast />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import Toast from '~/components/Toast.vue'
</script>
