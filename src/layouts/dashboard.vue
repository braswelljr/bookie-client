<script setup lang="ts">
import { bcookies } from '~/config/constants'

const router = useRouter()

const cookies = useCookie(bcookies.authentication.name, bcookies.authentication.options)

const isAuthenticated = computed(() => !!cookies.value)

watch(
  isAuthenticated,
  isAuthenticated => {
    if (!isAuthenticated) router.push('/login')
  },
  { immediate: true }
)
</script>

<template>
  <div class="">
    <div>main layout</div>
    <slot />
  </div>
</template>
