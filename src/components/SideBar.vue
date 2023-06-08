<script setup lang="ts">
import { cn } from '~/utils/className'
import { DASHBOARD_NAVIGATION } from '~/config/navigation'
import PlusIcon from '~/components/icons/PlusIcon.vue'
import useAuthentication from '~/store/useAuthentication'

const router = useRouter()
const { elevatedMode, user } = useAuthentication()

const props = defineProps<{
  class?: string
  o?: 'closed' | 'opened'
  setO?: () => void
}>()

const tab = ref(Object.values(DASHBOARD_NAVIGATION)[0].path)

watch(
  router.currentRoute,
  () => {
    const path = router.currentRoute.value.path
    const rtab = path.split('/')[2] ? path.split('/')[2] : path.split('/')[1]

    if (rtab) {
      Object.values(DASHBOARD_NAVIGATION).forEach(({ path: href }) => {
        const hrefTab = href.split('/')[2] ? href.split('/')[2] : href.split('/')[1]
        if (hrefTab === rtab) {
          tab.value = href
          // close sidebar
          props.setO && props.setO()
        }
      })
    }
  },
  { immediate: true }
)
</script>

<template>
  <aside
    :class="
      cn(
        $props.class,
        'flex h-full flex-1 flex-col justify-between border-zinc-200 dark:border-zinc-600 dark:bg-zinc-950 lg:border-r-[0.25px]'
      )
    "
  >
    <div class="py-4">
      <!-- header -->
      <header class="flex items-center justify-between px-4 py-2 lg:hidden">
        <!-- header -->
        <h1 class="">
          <span class="sr-only">Bookie</span>
          <img class="h-8 w-auto" src="~/assets/images/task.png" alt="task icon" />
        </h1>
        <!-- menu button -->
        <button
          type="button"
          :tabindex="-1"
          :class="cn('inline-flex h-9 w-9 items-center justify-center')"
          @click="setO && setO()"
        >
          <PlusIcon class="h-6 w-auto rotate-45 text-zinc-900 dark:text-white" />
        </button>
      </header>
      <!-- links -->
      <ul class="flex flex-col max-lg:px-2">
        <NuxtLink
          v-for="([key, { path, icon }], i) in Object.entries(DASHBOARD_NAVIGATION)"
          :key="i"
          type="button"
          :class="
            cn(
              'text-left text-sm font-medium focus:outline-none focus:ring-0',
              path === tab && 'bg-blue-600 text-white'
            )
          "
          :href="path"
        >
          <div class="flex w-full items-center justify-start space-x-2 px-4 py-2 uppercase">
            <Component :is="icon" class="h-5 w-auto" />
            <span class="">{{ key }}</span>
          </div>
        </NuxtLink>
      </ul>
    </div>
    <!-- bottom -->
    <div class="">
      <div class="px-2 py-4">
        <button
          v-if="elevatedMode"
          type="button"
          class="w-full rounded-sm bg-blue-600 py-2 text-xs uppercase text-white"
          :tabindex="-1"
        >
          {{ user?.role }}
        </button>
      </div>
    </div>
  </aside>
</template>
