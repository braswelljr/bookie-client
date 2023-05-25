<script setup lang="ts">
import Toast from '~/components/Toast.vue'
</script>
<template>
  <div>
    <slot />
    <!-- toast for notifications -->
    <Toast />
  </div>
</template>
