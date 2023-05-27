<template>
  <div>
    <slot />
  </div>
</template>

<script setup lang="ts">
import { bcookies } from '~/config/constants'

const router = useRouter()

const cookies = useCookie(bcookies.authentication.name, bcookies.authentication.options)

const isAuthenticated = computed(() => !!cookies.value)

watch(
  isAuthenticated,
  isAuthenticated => {
    if (isAuthenticated) router.push('/dashboard')
  },
  { immediate: true }
)
</script>
