<script setup lang="ts">
import Toast from '~/components/Toast.vue'
import useToast from '~/store/useToast'

const { toasts } = useToast()
</script>
<template>
  <div>
    <slot />
    <!-- toast for notifications -->
    <!-- loop through toast -->
    <template v-for="toast in toasts" :key="toast.id">
      <Toast
        :id="toast.id"
        :variant="toast.variant"
        :title="toast.title"
        :description="toast.description"
        :action="toast.action"
      />
    </template>
  </div>
</template>
