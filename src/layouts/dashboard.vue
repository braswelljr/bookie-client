<script setup lang="ts">
import { bcookies } from '~/config/constants'
import Navbar from '~/components/Navbar.vue'
import SideBar from '~/components/SideBar.vue'
import { cn } from '~/utils/className'

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

const o: Ref<'closed' | 'opened'> = ref('closed')
const setO = () => (o.value = o.value === 'closed' ? 'opened' : 'closed')
</script>

<template>
  <main class="min-h-screen bg-zinc-50 text-zinc-950 dark:bg-zinc-950 dark:text-white">
    <!-- navigation bar -->
    <Navbar :o="o" :set-o="setO" :class="cn('fixed inset-x-0 top-0 z-20')" />
    <!-- main page -->
    <main :class="cn(`relative grid h-full min-h-screen gap-5 lg:grid-cols-[20vw,1fr]`)">
      <SideBar
        :o="o"
        :set-o="setO"
        :class="
          cn(
            'fixed inset-0 h-full w-full overflow-y-auto overflow-x-hidden transition-all lg:relative lg:inset-x-auto lg:inset-y-0 lg:left-0 lg:w-full lg:pt-16',
            o === 'closed' && '-translate-x-full lg:translate-x-0',
            o === 'opened' && 'max-lg:z-30 lg:translate-x-0'
          )
        "
      />
      <div class="overflow-y-auto pt-20 max-lg:px-4">
        <slot />
      </div>
    </main>
  </main>
</template>
