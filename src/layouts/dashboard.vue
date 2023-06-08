<script setup lang="ts">
import { useMediaQuery } from '@vueuse/core'
import { bcookies } from '~/config/constants'
import Navbar from '~/components/Navbar.vue'
import SideBar from '~/components/SideBar.vue'
import { cn } from '~/utils/className'
import useAuthentication from '~/store/useAuthentication'
import { AuthenticationCookie } from '~~/types'

const router = useRouter()
const route = useRoute()
const { setUser, setToken, user, token } = useAuthentication()
const lg = useMediaQuery('(min-width: 1024px)')

const cookie = useCookie(bcookies.authentication.name, bcookies.authentication.options)
const ValidCookie = computed(() => cookie.value as unknown as AuthenticationCookie | undefined)

watch(
  ValidCookie,
  value => {
    if (value && value.user && value.token) {
      // set user and token
      setUser(value.user)
      setToken(value.token)

      // check if user and token are valid or set
      if (!user || !token) router.push('/login')

      // check for route and redirect to dashboard if route
      if (['/login', '/signup', '/'].includes(route.path)) router.push('/dashboard')
    } else router.push('/login')
  },
  { immediate: true, deep: true }
)

const o: Ref<'closed' | 'opened'> = ref('closed')
const setO = () => lg && (o.value = o.value === 'closed' ? 'opened' : 'closed')
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
            'fixed inset-0 h-full w-full overflow-y-auto overflow-x-hidden bg-zinc-50 transition-all dark:bg-zinc-950 lg:relative lg:inset-x-auto lg:inset-y-0 lg:left-0 lg:w-full lg:pt-16',
            o === 'opened' && '-translate-x-full lg:translate-x-0',
            o === 'closed' && 'max-lg:z-30 lg:translate-x-0'
          )
        "
      />
      <div class="overflow-y-auto pt-20 max-lg:px-4">
        <slot />
      </div>
    </main>
  </main>
</template>
